import crypto from "crypto";
import { dbQuery } from "./db";

/**
 * Ensures a user has today's 3 daily missions assigned in the database.
 * Auto-allocates them deterministically if they haven't been assigned yet.
 */
export async function ensureDailyMissionsAssigned(userId: string) {
  // Check if missions are already assigned for today
  const todayMissionsCheck = await dbQuery(
    "SELECT id FROM user_daily_mission_progress WHERE user_id = $1 AND assigned_date = CURRENT_DATE",
    [userId]
  );

  if (todayMissionsCheck.rows.length === 0) {
    // Select the first 3 daily missions sorted by ID (deterministic)
    const coreMissions = await dbQuery("SELECT id FROM daily_missions ORDER BY id ASC LIMIT 3");
    
    for (const m of coreMissions.rows) {
      const progressId = crypto.randomUUID();
      await dbQuery(
        `INSERT INTO user_daily_mission_progress (id, user_id, mission_id, assigned_date, is_completed)
         VALUES ($1, $2, $3, CURRENT_DATE, FALSE)
         ON CONFLICT DO NOTHING`,
        [progressId, userId, m.id]
      );
    }
  }
}

/**
 * Increment user's streak if they complete at least one daily task today.
 * Uses PostgreSQL timezone dates to prevent Node.js local timezone misalignment.
 */
export async function updateUserStreak(userId: string) {
  // Check if at least 1 mission task is completed today
  const completedTodayRes = await dbQuery(
    `SELECT COUNT(*) as count FROM user_daily_mission_progress 
     WHERE user_id = $1 AND assigned_date = CURRENT_DATE AND is_completed = true`,
    [userId]
  );
  
  const completedTodayCount = parseInt(completedTodayRes.rows[0].count, 10);
  if (completedTodayCount === 0) {
    return; // No completed missions today yet
  }

  // Get raw today/yesterday date strings from the database to avoid JS timezone shifts
  const datesRes = await dbQuery(
    `SELECT CURRENT_DATE::text as today, (CURRENT_DATE - INTERVAL '1 day')::date::text as yesterday`
  );
  const todayStr = datesRes.rows[0].today;
  const yesterdayStr = datesRes.rows[0].yesterday;

  // Get current streak status, casting the date to text to prevent node-pg timezone conversions
  const streakRes = await dbQuery(
    `SELECT current_streak, longest_streak, last_active_date::text as last_active_date 
     FROM user_streaks WHERE user_id = $1`,
    [userId]
  );

  if (streakRes.rows.length === 0) {
    // First time streak setup
    const streakId = crypto.randomUUID();
    await dbQuery(
      `INSERT INTO user_streaks (id, user_id, current_streak, longest_streak, last_active_date)
       VALUES ($1, $2, 1, 1, CURRENT_DATE)`,
      [streakId, userId]
    );
  } else {
    const streak = streakRes.rows[0];
    const lastActiveStr = streak.last_active_date; // Safe raw YYYY-MM-DD string

    if (lastActiveStr === todayStr) {
      // Already active today, nothing to change
      return;
    } else if (lastActiveStr === yesterdayStr) {
      // Consecutive day active
      const newStreak = streak.current_streak + 1;
      const newLongest = Math.max(streak.longest_streak, newStreak);
      await dbQuery(
        `UPDATE user_streaks 
         SET current_streak = $1, longest_streak = $2, last_active_date = CURRENT_DATE, updated_at = NOW()
         WHERE user_id = $3`,
        [newStreak, newLongest, userId]
      );
    } else {
      // Streak was broken or none existed, reset current streak to 1
      const newLongest = Math.max(streak.longest_streak, 1);
      await dbQuery(
        `UPDATE user_streaks 
         SET current_streak = 1, longest_streak = $1, last_active_date = CURRENT_DATE, updated_at = NOW()
         WHERE user_id = $2`,
        [newLongest, userId]
      );
    }
  }
}

/**
 * Fetch the active streak and longest streak, resetting current_streak if yesterday was missed.
 * Casts database dates to text to ensure safe comparisons.
 */
export async function getOrUpdateStreakInfo(userId: string) {
  // Get raw dates from database
  const datesRes = await dbQuery(
    `SELECT CURRENT_DATE::text as today, (CURRENT_DATE - INTERVAL '1 day')::date::text as yesterday`
  );
  const todayStr = datesRes.rows[0].today;
  const yesterdayStr = datesRes.rows[0].yesterday;

  const streakRes = await dbQuery(
    `SELECT current_streak, longest_streak, last_active_date::text as last_active_date 
     FROM user_streaks WHERE user_id = $1`,
    [userId]
  );

  if (streakRes.rows.length === 0) {
    // Create default streak row if it does not exist
    const streakId = crypto.randomUUID();
    await dbQuery(
      `INSERT INTO user_streaks (id, user_id, current_streak, longest_streak, last_active_date)
       VALUES ($1, $2, 0, 0, NULL)`,
      [streakId, userId]
    );
    return { currentStreak: 0, longestStreak: 0 };
  }

  const streak = streakRes.rows[0];
  if (!streak.last_active_date) {
    return { currentStreak: 0, longestStreak: streak.longest_streak };
  }

  const lastActiveStr = streak.last_active_date;

  if (lastActiveStr !== todayStr && lastActiveStr !== yesterdayStr) {
    // Streak broken (missed yesterday and today)
    await dbQuery(
      `UPDATE user_streaks 
       SET current_streak = 0, updated_at = NOW() 
       WHERE user_id = $1`,
      [userId]
    );
    return { currentStreak: 0, longestStreak: streak.longest_streak };
  }

  return {
    currentStreak: streak.current_streak,
    longestStreak: streak.longest_streak,
  };
}
