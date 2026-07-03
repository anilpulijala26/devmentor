CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1. Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role VARCHAR(50) DEFAULT 'student',
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create user_sessions table
CREATE TABLE IF NOT EXISTS user_sessions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  refresh_token_hash TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP NOT NULL
);

-- 3. Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Create modules table
CREATE TABLE IF NOT EXISTS modules (
  id UUID PRIMARY KEY,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Create lessons table
CREATE TABLE IF NOT EXISTS lessons (
  id UUID PRIMARY KEY,
  module_id UUID REFERENCES modules(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Create user_lesson_progress table
CREATE TABLE IF NOT EXISTS user_lesson_progress (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  is_completed BOOLEAN DEFAULT FALSE,
  last_opened_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP,
  CONSTRAINT unique_user_lesson UNIQUE (user_id, lesson_id)
);

CREATE TABLE IF NOT EXISTS user_task_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid()
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  task_slug VARCHAR(255) NOT NULL,
  is_completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_user_task UNIQUE (user_id, task_slug)
);

-- 7. Create daily_missions table
CREATE TABLE IF NOT EXISTS daily_missions (
  id UUID PRIMARY KEY,
  type VARCHAR(100) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  xp_reward INTEGER NOT NULL DEFAULT 100
);

-- 8. Create user_daily_mission_progress table
CREATE TABLE IF NOT EXISTS user_daily_mission_progress (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  mission_id UUID REFERENCES daily_missions(id) ON DELETE CASCADE,
  assigned_date DATE NOT NULL DEFAULT CURRENT_DATE,
  is_completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP,
  CONSTRAINT unique_user_mission_date UNIQUE (user_id, mission_id, assigned_date)
);

-- 9. Create user_streaks table
CREATE TABLE IF NOT EXISTS user_streaks (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  current_streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  last_active_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 10. Create coding_challenges table
CREATE TABLE IF NOT EXISTS coding_challenges (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  starter_code TEXT NOT NULL,
  difficulty VARCHAR(50) NOT NULL DEFAULT 'Easy',
  order_index INTEGER UNIQUE NOT NULL
);

-- 11. Create user_challenge_attempts table
CREATE TABLE IF NOT EXISTS user_challenge_attempts (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  challenge_id UUID REFERENCES coding_challenges(id) ON DELETE CASCADE,
  submitted_code TEXT NOT NULL,
  is_solved BOOLEAN DEFAULT TRUE,
  attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_user_challenge UNIQUE (user_id, challenge_id)
);

-- Create required indexes for optimal lookup performance
CREATE INDEX IF NOT EXISTS idx_user_mission_progress_date ON user_daily_mission_progress(user_id, assigned_date);
CREATE INDEX IF NOT EXISTS idx_user_streaks_user ON user_streaks(user_id);
CREATE INDEX IF NOT EXISTS idx_user_challenge_attempts_user ON user_challenge_attempts(user_id);
