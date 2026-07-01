-- Seed course
INSERT INTO courses (id, title, description, order_index)
VALUES (
  'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  'Full Stack Web Development',
  'Master frontend development, API architecture, database design, and cloud deployments with hands-on practice.',
  1
)
ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title, 
  description = EXCLUDED.description, 
  order_index = EXCLUDED.order_index;

-- Seed modules
INSERT INTO modules (id, course_id, title, order_index) VALUES
  ('f47ac10b-58cc-4372-a567-0e02b2c3d480', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'HTML Foundations', 1),
  ('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'CSS & Responsive Design', 2),
  ('f47ac10b-58cc-4372-a567-0e02b2c3d482', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Modern JavaScript (ES6+)', 3),
  ('f47ac10b-58cc-4372-a567-0e02b2c3d483', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'React Framework', 4),
  ('f47ac10b-58cc-4372-a567-0e02b2c3d484', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Node.js & Express APIs', 5),
  ('f47ac10b-58cc-4372-a567-0e02b2c3d485', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'PostgreSQL Database Design', 6),
  ('f47ac10b-58cc-4372-a567-0e02b2c3d486', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Cloud Deployment & DevOps', 7)
ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title, 
  order_index = EXCLUDED.order_index;

-- Seed lessons
INSERT INTO lessons (id, module_id, title, content, order_index) VALUES
  -- HTML
  ('f47ac10b-58cc-4372-a567-0e02b2c3d490', 'f47ac10b-58cc-4372-a567-0e02b2c3d480', 'Introduction to HTML & Web Anatomy', '# Introduction to HTML

HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser. It defines the structure and meaning of web content.

## Key Concepts
1. **Tags and Elements**: Elements are represented by tags, which are enclosed in angle brackets like `<h1>`.
2. **Attributes**: Attributes provide additional information about elements, such as the `src` attribute on an `<img>` tag.
3. **Basic Page Structure**: Every HTML page requires a `<!DOCTYPE html>`, `<html>`, `<head>`, and `<body>`.

Practice building a simple structure and viewing it in your browser!', 1),
  
  ('f47ac10b-58cc-4372-a567-0e02b2c3d491', 'f47ac10b-58cc-4372-a567-0e02b2c3d480', 'Semantic HTML & Accessibility basics', '# Semantic HTML

Semantic HTML elements clearly describe their meaning in a human- and machine-readable way.

## Why Semantic HTML?
- **Accessibility (a11y)**: Screen readers use tags like `<nav>` or `<main>` to navigate pages.
- **SEO**: Search engines prioritize structural clarity.
- **Maintainability**: Cleaner code for teams.

## Popular Semantic Tags
- `<header>` and `<footer>`
- `<main>` for primary contents
- `<article>` and `<section>`
- `<aside>` for sidebars
- `<nav>` for navigation links', 2),

  -- CSS
  ('f47ac10b-58cc-4372-a567-0e02b2c3d492', 'f47ac10b-58cc-4372-a567-0e02b2c3d481', 'CSS Selectors & The Box Model', '# CSS Box Model & Selectors

CSS controls layout and aesthetics on modern web pages. Understanding selectors and the box model is crucial.

## The Box Model
Every element in CSS is represented as a rectangular box consisting of:
- **Content**: The text/image.
- **Padding**: Transparent area around the content.
- **Border**: Border surrounding the padding.
- **Margin**: Transparent area outside the border separating this element from others.', 1),

  ('f47ac10b-58cc-4372-a567-0e02b2c3d493', 'f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Flexbox & CSS Grid Mastery', '# Flexbox & CSS Grid

These two layout models form the foundation of responsive modern frontend UI architecture.

## Flexbox
Designed for one-dimensional layouts (a row OR a column). Great for headers, nav bars, and simple lists.
`display: flex; justify-content: space-between; align-items: center;`

## CSS Grid
Designed for two-dimensional layouts (rows AND columns). Perfect for page structures, image galleries, and complex dash designs.', 2),

  -- JavaScript
  ('f47ac10b-58cc-4372-a567-0e02b2c3d494', 'f47ac10b-58cc-4372-a567-0e02b2c3d482', 'Variables, Functions, and Scope', '# JavaScript Scope and Closures

JavaScript is a dynamic programming language powering modern web interactivity.

## Variables
- `const`: Constant bindings.
- `let`: Re-assignable local variables.
- `var`: Legacy function-scoped variables.

## Functions & Closures
A closure is the combination of a function bundled together with references to its surrounding state. Closures allow functions to access outer variables even after the outer function has returned.', 1),

  ('f47ac10b-58cc-4372-a567-0e02b2c3d495', 'f47ac10b-58cc-4372-a567-0e02b2c3d482', 'Asynchronous JS & Fetch API', '# Asynchronous JavaScript

Handling HTTP requests, disk I/O, or timers without blocking the main browser thread.

## Promises and Async/Await
A Promise represents the eventual completion (or failure) of an asynchronous operation.
`async/await` is syntactic sugar built on top of Promises to make async code look sequential.

```javascript
async function fetchData() {
  try {
    const res = await fetch("https://api.github.com/users");
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
```', 2),

  -- React
  ('f47ac10b-58cc-4372-a567-0e02b2c3d496', 'f47ac10b-58cc-4372-a567-0e02b2c3d483', 'React Components, JSX & Props', '# React Components & Props

React is a declarative component-driven user interface library.

## Components
Self-contained, reusable blocks of UI. Written as Javascript functions returning JSX.

## Props
Input parameters passed to a component. Props are read-only (immutable) values that flow down from parents to children.', 1),

  ('f47ac10b-58cc-4372-a567-0e02b2c3d497', 'f47ac10b-58cc-4372-a567-0e02b2c3d483', 'Hooks: useState, useEffect & Custom Hooks', '# React Hooks

Hooks allow you to use state and other React features without writing a class.

## Common Hooks
- `useState`: For tracking local component state variables.
- `useEffect`: For performing side effects (data fetching, subscriptions, timer setup).

```javascript
import { useState, useEffect } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```', 2),

  -- Node.js
  ('f47ac10b-58cc-4372-a567-0e02b2c3d498', 'f47ac10b-58cc-4372-a567-0e02b2c3d484', 'Express.js Fundamentals', '# Express.js Framework

Express is a minimal and flexible Node.js web application framework providing robust routing and middleware.

## Simple Server Setup
```javascript
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => console.log("Server running..."));
```', 1),

  ('f47ac10b-58cc-4372-a567-0e02b2c3d499', 'f47ac10b-58cc-4372-a567-0e02b2c3d484', 'Building Secure REST APIs', '# RESTful APIs

Designing uniform, stateless, client-server service endpoints.

## REST Guidelines
- **HTTP Verbs**: GET (Read), POST (Create), PUT (Replace), PATCH (Update), DELETE (Remove).
- **Status Codes**: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Server Error.
- **JSON Format**: Exchanging payloads in standardized JSON structures.', 2),

  -- PostgreSQL
  ('f47ac10b-58cc-4372-a567-0e02b2c3d4a0', 'f47ac10b-58cc-4372-a567-0e02b2c3d485', 'Relational Databases & SQL Basics', '# PostgreSQL Relational Design

PostgreSQL is a powerful, open-source object-relational database system.

## Basic SQL Operations
- **CREATE TABLE**: Define columns and types.
- **INSERT**: Put rows into tables.
- **SELECT**: Query data.
- **UPDATE** & **DELETE**: Modify or remove records.', 1),

  ('f47ac10b-58cc-4372-a567-0e02b2c3d4a1', 'f47ac10b-58cc-4372-a567-0e02b2c3d485', 'Joins, Constraints, and Indexes', '# Joins and Constraints

Connecting and securing data records across multiple database tables.

## Joins
- **INNER JOIN**: Matches records in both tables.
- **LEFT JOIN**: Returns all records from left and matching records from right.

## Indexes
Speeds up queries at the cost of disk write operations. Critical for performance on heavily queried columns like `email` or `slug`.', 2),

  -- Deployment
  ('f47ac10b-58cc-4372-a567-0e02b2c3d4a2', 'f47ac10b-58cc-4372-a567-0e02b2c3d486', 'Containerization with Docker', '# Docker Basics

Docker packages applications and dependencies into standardized virtual containers that run anywhere.

## Why Docker?
- **Consistency**: Solves the "works on my machine" problem.
- **Isolation**: Keeps dependencies isolated.
- **Scalability**: Seamless orchestration on platforms like Kubernetes.', 1),

  ('f47ac10b-58cc-4372-a567-0e02b2c3d4a3', 'f47ac10b-58cc-4372-a567-0e02b2c3d486', 'Deploying Next.js to Production', '# Production Deployment

Taking a local web application live to the cloud.

## Key Deploy Steps
1. **Build Step**: Bundle assets and minify code (`npm run build`).
2. **Environment Variables**: Configure secrets in the cloud host panel.
3. **SSL Setup**: Secure site traffic with Let''s Encrypt HTTPS certificates.
4. **CI/CD Pipelines**: Automate testing and shipping using GitHub Actions.', 2)
ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title, 
  content = EXCLUDED.content, 
  order_index = EXCLUDED.order_index;

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

-- Seed beginner Javascript challenges
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
