# CodeNivra - Static Tutorial Platform

A fully static, production-quality tutorial web application built with modern web technologies. All content is authored in MDX and statically generated at build time.

## Project Overview

CodeNivra is a tutorial platform that feels like a senior software engineer mentoring an intern. It focuses on production-ready guidance, real-world patterns, and modern tooling. It features a PostgreSQL database connection to track user accounts, streaks, daily missions, and syllabus progress.

## Why MDX

MDX allows lessons to be authored in Markdown while embedding React components for callouts, checklists, and interactive content. This keeps content readable and composable while enabling rich UI elements in lessons.

## Tech Stack

- Next.js (App Router)
- TypeScript
- React
- MDX
- Tailwind CSS
- lucide-react

## How to Run Locally

```bash
npm install
npm run dev
```

Then open the app at `localhost:3000`.

## Content Structure

```
content/
	tracks.json
	html/
	css/
	javascript/
	typescript/
	react/
	nextjs/
	react-node-postgres/
	nextjs-postgres/
```

- `tracks.json` defines the learning structure.
- Each lesson is an MDX file under its track folder.

## How to Add a New Lesson

1. Create a new MDX file in the correct track folder.
2. Add the lesson entry to `content/tracks.json`.
3. Include required frontmatter fields.
4. Use the provided MDX components for callouts and checklists.

### Required Frontmatter

```mdx
---
title: "Lesson Title"
description: "Short description"
tags: ["tag1", "tag2"]
estimatedTime: "45 minutes"
youtubeId: "video-id"
---
```

### Example MDX Components

```mdx
<SeniorNote>
Senior guidance goes here.
</SeniorNote>

<Pitfall>
Common mistakes go here.
</Pitfall>

<ProTip>
Helpful tips go here.
</ProTip>

<Checklist
	items={["Item 1", "Item 2"]}
/>

<YouTubeEmbed videoId="video-id" />
```

## Environment Variables

Configure your database connection string and credentials in `.env` or `.env.local` using the keys defined in `.env.example`:
- `DATABASE_URL`: Connection string to your PostgreSQL database.
- `JWT_SECRET`: Secret key used for signing and verifying JWT tokens.

## Database Setup

To set up the database schema and seed data on Supabase (or any PostgreSQL instance):

1. **Run the Schema**:
   - Go to your Supabase Dashboard.
   - Navigate to the **SQL Editor** from the left-hand navigation pane.
   - Create a new blank query, copy/paste the entire contents of [schema.sql](file:///c:/DevMentor/supabase/schema.sql), and click **Run**.

2. **Seed the Database**:
   - Create another new blank query in the SQL Editor.
   - Copy/paste the entire contents of [seed.sql](file:///c:/DevMentor/supabase/seed.sql), and click **Run**.

## Development Notes

- All pages are statically generated using `generateStaticParams`.
- Lessons are parsed with `gray-matter` and rendered with `next-mdx-remote`.
- Code blocks include syntax highlighting and a copy button.

## License

MIT
