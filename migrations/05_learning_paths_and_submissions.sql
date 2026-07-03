-- Optional normalized learning path tables for future rollout.
-- These are additive and do not replace the current working lesson/challenge/streak tables.

CREATE TABLE IF NOT EXISTS learning_paths (
  id UUID PRIMARY KEY,
  slug VARCHAR(120) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  audience TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS interview_questions (
  id UUID PRIMARY KEY,
  module_id UUID REFERENCES modules(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  expected_answer TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS challenge_test_cases (
  id UUID PRIMARY KEY,
  challenge_id UUID REFERENCES coding_challenges(id) ON DELETE CASCADE,
  input_json JSONB NOT NULL,
  expected_json JSONB NOT NULL,
  is_hidden BOOLEAN NOT NULL DEFAULT FALSE,
  explanation TEXT,
  order_index INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS project_stages (
  id UUID PRIMARY KEY,
  project_slug VARCHAR(120) NOT NULL,
  stage_title VARCHAR(255) NOT NULL,
  stage_description TEXT,
  order_index INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS user_path_progress (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  learning_path_slug VARCHAR(120) NOT NULL,
  current_module_order INTEGER NOT NULL DEFAULT 0,
  current_day INTEGER NOT NULL DEFAULT 1,
  current_level VARCHAR(120),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_user_learning_path UNIQUE (user_id, learning_path_slug)
);

CREATE TABLE IF NOT EXISTS user_project_submissions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  project_slug VARCHAR(120) NOT NULL,
  github_url TEXT,
  live_url TEXT,
  review_status VARCHAR(60) NOT NULL DEFAULT 'not_submitted_yet',
  submitted_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_user_project_submission UNIQUE (user_id, project_slug)
);

CREATE TABLE IF NOT EXISTS daily_learning_plan (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  assigned_date DATE NOT NULL DEFAULT CURRENT_DATE,
  lesson_title VARCHAR(255),
  practice_title VARCHAR(255),
  coding_problem_title VARCHAR(255),
  interview_question TEXT,
  project_step_title VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_user_daily_learning_plan UNIQUE (user_id, assigned_date)
);

