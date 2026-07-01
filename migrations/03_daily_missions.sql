-- Create daily_missions table
CREATE TABLE IF NOT EXISTS daily_missions (
  id UUID PRIMARY KEY,
  type VARCHAR(100) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  xp_reward INTEGER NOT NULL DEFAULT 100
);

-- Create user_daily_mission_progress table
CREATE TABLE IF NOT EXISTS user_daily_mission_progress (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  mission_id UUID REFERENCES daily_missions(id) ON DELETE CASCADE,
  assigned_date DATE NOT NULL DEFAULT CURRENT_DATE,
  is_completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP,
  CONSTRAINT unique_user_mission_date UNIQUE (user_id, mission_id, assigned_date)
);

-- Create user_streaks table
CREATE TABLE IF NOT EXISTS user_streaks (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  current_streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  last_active_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add required indexes
CREATE INDEX IF NOT EXISTS idx_user_mission_progress_date ON user_daily_mission_progress(user_id, assigned_date);
CREATE INDEX IF NOT EXISTS idx_user_streaks_user ON user_streaks(user_id);

-- Seed daily missions
INSERT INTO daily_missions (id, type, title, xp_reward) VALUES
  ('d17ac10b-58cc-4372-a567-0e02b2c3d490', 'open_lesson', 'Open one lesson', 100),
  ('d17ac10b-58cc-4372-a567-0e02b2c3d491', 'complete_lesson', 'Complete one lesson', 150),
  ('d17ac10b-58cc-4372-a567-0e02b2c3d492', 'read_interview', 'Read one interview question', 100),
  ('d17ac10b-58cc-4372-a567-0e02b2c3d493', 'solve_challenge', 'Solve one coding challenge', 200),
  ('d17ac10b-58cc-4372-a567-0e02b2c3d494', 'continue_learning', 'Continue learning for today', 100)
ON CONFLICT (id) DO UPDATE SET
  type = EXCLUDED.type,
  title = EXCLUDED.title,
  xp_reward = EXCLUDED.xp_reward;
