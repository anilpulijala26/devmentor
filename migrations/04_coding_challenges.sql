-- Migration: coding challenges tables
CREATE TABLE IF NOT EXISTS coding_challenges (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  starter_code TEXT NOT NULL,
  difficulty VARCHAR(50) NOT NULL DEFAULT 'Easy',
  order_index INTEGER UNIQUE NOT NULL
);

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

CREATE INDEX IF NOT EXISTS idx_user_challenge_attempts_user ON user_challenge_attempts(user_id);

-- Seed 10 beginner Javascript challenges
INSERT INTO coding_challenges (id, title, description, starter_code, difficulty, order_index)
VALUES 
('c17ac10b-58cc-4372-a567-0e02b2c3d401', 
 'Return the Sum of Two Numbers', 
 'Write a function that takes two numbers as arguments and returns their sum.', 
 'function addition(a, b) {\n  // Write your code here\n  \n}', 
 'Easy', 
 1)
ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title, 
  description = EXCLUDED.description, 
  starter_code = EXCLUDED.starter_code, 
  difficulty = EXCLUDED.difficulty, 
  order_index = EXCLUDED.order_index;

INSERT INTO coding_challenges (id, title, description, starter_code, difficulty, order_index)
VALUES 
('c17ac10b-58cc-4372-a567-0e02b2c3d402', 
 'Convert Minutes into Seconds', 
 'Write a function that takes an integer minutes and converts it to seconds.', 
 'function convert(minutes) {\n  // Write your code here\n  \n}', 
 'Easy', 
 2)
ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title, 
  description = EXCLUDED.description, 
  starter_code = EXCLUDED.starter_code, 
  difficulty = EXCLUDED.difficulty, 
  order_index = EXCLUDED.order_index;

INSERT INTO coding_challenges (id, title, description, starter_code, difficulty, order_index)
VALUES 
('c17ac10b-58cc-4372-a567-0e02b2c3d403', 
 'Return the Next Number', 
 'Create a function that takes a number as an argument, increments the number by +1 and returns the result.', 
 'function addition(num) {\n  // Write your code here\n  \n}', 
 'Easy', 
 3)
ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title, 
  description = EXCLUDED.description, 
  starter_code = EXCLUDED.starter_code, 
  difficulty = EXCLUDED.difficulty, 
  order_index = EXCLUDED.order_index;

INSERT INTO coding_challenges (id, title, description, starter_code, difficulty, order_index)
VALUES 
('c17ac10b-58cc-4372-a567-0e02b2c3d404', 
 'Area of a Triangle', 
 'Write a function that takes the base and height of a triangle and return its area.', 
 'function triArea(base, height) {\n  // Write your code here\n  \n}', 
 'Easy', 
 4)
ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title, 
  description = EXCLUDED.description, 
  starter_code = EXCLUDED.starter_code, 
  difficulty = EXCLUDED.difficulty, 
  order_index = EXCLUDED.order_index;

INSERT INTO coding_challenges (id, title, description, starter_code, difficulty, order_index)
VALUES 
('c17ac10b-58cc-4372-a567-0e02b2c3d405', 
 'Find the Smallest Number in an Array', 
 'Write a function that takes an array of numbers and returns the smallest number.', 
 'function findSmallest(arr) {\n  // Write your code here\n  \n}', 
 'Easy', 
 5)
ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title, 
  description = EXCLUDED.description, 
  starter_code = EXCLUDED.starter_code, 
  difficulty = EXCLUDED.difficulty, 
  order_index = EXCLUDED.order_index;

INSERT INTO coding_challenges (id, title, description, starter_code, difficulty, order_index)
VALUES 
('c17ac10b-58cc-4372-a567-0e02b2c3d406', 
 'First Element in an Array', 
 'Create a function that takes an array containing only numbers and return the first element.', 
 'function getFirstValue(arr) {\n  // Write your code here\n  \n}', 
 'Easy', 
 6)
ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title, 
  description = EXCLUDED.description, 
  starter_code = EXCLUDED.starter_code, 
  difficulty = EXCLUDED.difficulty, 
  order_index = EXCLUDED.order_index;

INSERT INTO coding_challenges (id, title, description, starter_code, difficulty, order_index)
VALUES 
('c17ac10b-58cc-4372-a567-0e02b2c3d407', 
 'Power Calculator', 
 'Create a function that takes voltage and current and returns the calculated power (voltage * current).', 
 'function circuitPower(voltage, current) {\n  // Write your code here\n  \n}', 
 'Easy', 
 7)
ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title, 
  description = EXCLUDED.description, 
  starter_code = EXCLUDED.starter_code, 
  difficulty = EXCLUDED.difficulty, 
  order_index = EXCLUDED.order_index;

INSERT INTO coding_challenges (id, title, description, starter_code, difficulty, order_index)
VALUES 
('c17ac10b-58cc-4372-a567-0e02b2c3d408', 
 'Return Something to Me', 
 'Write a function that returns the string "something" joined with a space " " and the given argument a.', 
 'function giveMeSomething(a) {\n  // Write your code here\n  \n}', 
 'Easy', 
 8)
ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title, 
  description = EXCLUDED.description, 
  starter_code = EXCLUDED.starter_code, 
  difficulty = EXCLUDED.difficulty, 
  order_index = EXCLUDED.order_index;

INSERT INTO coding_challenges (id, title, description, starter_code, difficulty, order_index)
VALUES 
('c17ac10b-58cc-4372-a567-0e02b2c3d409', 
 'Is the Number Less than or Equal to Zero?', 
 'Create a function that takes a number as its only argument and returns true if it''s less than or equal to zero, otherwise return false.', 
 'function lessThanOrEqualToZero(num) {\n  // Write your code here\n  \n}', 
 'Easy', 
 9)
ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title, 
  description = EXCLUDED.description, 
  starter_code = EXCLUDED.starter_code, 
  difficulty = EXCLUDED.difficulty, 
  order_index = EXCLUDED.order_index;

INSERT INTO coding_challenges (id, title, description, starter_code, difficulty, order_index)
VALUES 
('c17ac10b-58cc-4372-a567-0e02b2c3d410', 
 'Divides Evenly', 
 'Given two integers, a and b, return true if a divides evenly by b (a % b === 0), otherwise return false.', 
 'function dividesEvenly(a, b) {\n  // Write your code here\n  \n}', 
 'Easy', 
 10)
ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title, 
  description = EXCLUDED.description, 
  starter_code = EXCLUDED.starter_code, 
  difficulty = EXCLUDED.difficulty, 
  order_index = EXCLUDED.order_index;
