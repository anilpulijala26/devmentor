const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const CONTENT_DIR = path.join(__dirname, '..', 'content');

// Helper to find all MDX files
function getMdxFiles(dir, files = []) {
  const list = fs.readdirSync(dir);
  for (const item of list) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      getMdxFiles(fullPath, files);
    } else if (item.endsWith('.mdx')) {
      files.push(fullPath);
    }
  }
  return files;
}

// Generate code based on slug, title, tags
function generateCodeForTopic(slug, title, tags) {
  const combined = `${slug} ${title} ${tags.join(' ')}`.toLowerCase();

  // Docker
  if (combined.includes('docker')) {
    return {
      title: "Docker Containerization Blueprint",
      description: "A production-ready Dockerfile and docker-compose configuration for deploying the service.",
      language: "yaml",
      code: `version: '3.8'\n\nservices:\n  web:\n    build:\n      context: .\n      dockerfile: Dockerfile\n    ports:\n      - "3000:3000"\n    environment:\n      - NODE_ENV=production\n      - DATABASE_URL=postgresql://user:pass@db:5432/mydb\n    depends_on:\n      - db\n\n  db:\n    image: postgres:15-alpine\n    environment:\n      - POSTGRES_USER=user\n      - POSTGRES_PASSWORD=pass\n      - POSTGRES_DB=mydb\n    volumes:\n      - pgdata:/var/lib/postgresql/data\n\nvolumes:\n  pgdata:`
    };
  }

  // Git
  if (combined.includes('git')) {
    return {
      title: "Git Collaboration & Version Control Workflow",
      description: "Standard production commands for branch management, commit staging, and merge conflict resolution.",
      language: "bash",
      code: `# 1. Create and switch to a feature branch\ngit checkout -b feature/user-auth\n\n# 2. Stage changes and commit with conventional messages\ngit add .\ngit commit -m "feat(auth): integrate JWT session cookie verification"\n\n# 3. Pull latest main and rebase feature branch\ngit checkout main\ngit pull origin main\ngit checkout feature/user-auth\ngit rebase main\n\n# 4. Push feature branch and open PR\ngit push origin feature/user-auth`
    };
  }

  // AWS/Azure/Cloud/Vercel/Deploy
  if (combined.includes('aws') || combined.includes('azure') || combined.includes('cloud') || combined.includes('vercel') || combined.includes('deploy')) {
    return {
      title: "Cloud Deployment Pipeline Configuration",
      description: "A CI/CD deployment configuration for automated building and hosting.",
      language: "yaml",
      code: `name: Production Deployment\n\non:\n  push:\n    branches: [ main ]\n\njobs:\n  deploy:\n    runs-on: ubuntu-latest\n    steps:\n      - name: Checkout Code\n        uses: actions/checkout@v3\n\n      - name: Install & Test\n        run: |\n          npm ci\n          npm run test\n          npm run build\n\n      - name: Deploy to Hosting Provider\n        run: npx vercel --token \${{ secrets.VERCEL_TOKEN }} --prod`
    };
  }

  // SQL/Postgres/Prisma/Drizzle/Database/DB
  if (combined.includes('sql') || combined.includes('postgres') || combined.includes('prisma') || combined.includes('drizzle') || combined.includes('database') || combined.includes('db')) {
    return {
      title: "Database Schema & Query Migration",
      description: "A relational database schema table structure mapping foreign key constraints and index mappings.",
      language: "sql",
      code: `-- Create Users Table\nCREATE TABLE IF NOT EXISTS users (\n  id SERIAL PRIMARY KEY,\n  email VARCHAR(255) UNIQUE NOT NULL,\n  password_hash VARCHAR(255) NOT NULL,\n  role VARCHAR(50) DEFAULT 'student',\n  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n\n-- Create Index to speed up lookup queries\nCREATE INDEX IF NOT EXISTS idx_users_email ON users(email);\n\n-- Create Profiles Table linked to Users\nCREATE TABLE IF NOT EXISTS profiles (\n  id SERIAL PRIMARY KEY,\n  user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,\n  avatar_url TEXT,\n  bio TEXT\n);`
    };
  }

  // Next.js
  if (combined.includes('nextjs') || combined.includes('next')) {
    return {
      title: "Next.js App Router Page & API Handler",
      description: "A Next.js server-rendered component alongside a POST route handler.",
      language: "tsx",
      code: `// app/items/[id]/page.tsx\nimport React from "react";\n\ninterface ItemPageProps {\n  params: Promise<{ id: string }>;\n}\n\nexport default async function ItemPage({ params }: ItemPageProps) {\n  const { id } = await params;\n  \n  return (\n    <main className="p-8 max-w-4xl mx-auto">\n      <h1 className="text-2xl font-bold">Item Detail View</h1>\n      <p className="text-slate-500 mt-2">Active Item ID: {id}</p>\n    </main>\n  );\n}`
    };
  }

  // React/JSX/TSX/Component/Hook/State/Router
  if (combined.includes('react') || combined.includes('jsx') || combined.includes('tsx') || combined.includes('component') || combined.includes('hook') || combined.includes('state') || combined.includes('context')) {
    return {
      title: "React Functional Component & Custom Hook",
      description: "A custom React component consuming a state hook to manage local state parameters.",
      language: "tsx",
      code: `import React, { useState, useEffect } from "react";\n\nexport function DynamicTogglable() {\n  const [isOpen, setIsOpen] = useState<boolean>(false);\n\n  return (\n    <div className="border border-slate-200 rounded-xl p-4 max-w-xs mx-auto">\n      <button\n        onClick={() => setIsOpen(prev => !prev)}\n        className="bg-indigo-600 text-white font-bold text-xs px-4 py-2 rounded-lg"\n      >\n        {isOpen ? "Hide Content" : "Show Content"}\n      </button>\n      \n      {isOpen && (\n        <p className="text-xs text-slate-500 mt-3 animate-fade-in">\n          This content is rendered conditionally based on state.\n        </p>\n      )}\n    </div>\n  );\n}`
    };
  }

  // Express/Node/API/Controller/Middleware/Router
  if (combined.includes('express') || combined.includes('node') || combined.includes('api') || combined.includes('controller') || combined.includes('middleware') || combined.includes('router') || combined.includes('auth') || combined.includes('jwt') || combined.includes('bcrypt')) {
    return {
      title: "Express API Route Controller & Handler",
      description: "A modular router pipeline parsing parameters and returning standard JSON payloads.",
      language: "javascript",
      code: `const express = require('express');\nconst router = express.Router();\n\n// GET dynamic item route\nrouter.get('/items/:id', (req, res) => {\n  const { id } = req.params;\n  const { fields } = req.query;\n\n  res.status(200).json({\n    success: true,\n    data: {\n      id,\n      name: "Product Item " + id,\n      fieldsRequested: fields ? fields.split(',') : []\n    }\n  });\n});\n\nmodule.exports = router;`
    };
  }

  // TypeScript/TS
  if (combined.includes('typescript') || combined.includes('ts')) {
    return {
      title: "TypeScript Type Definitions & Generic Function",
      description: "Strongly-typed type constraints, interface unions, and reusable generics.",
      language: "typescript",
      code: `// Define User metadata schemas\ninterface AppUser {\n  id: string;\n  name: string;\n  email: string;\n  role: "admin" | "student";\n}\n\n// Reusable generic fetch wrapper\nasync function apiFetchWrapper<T>(url: string): Promise<T> {\n  const response = await fetch(url);\n  if (!response.ok) {\n    throw new Error("Network request failed");\n  }\n  return response.json() as Promise<T>;\n}`
    };
  }

  // CSS/Flexbox/Grid/Styling
  if (combined.includes('css') || combined.includes('flexbox') || combined.includes('grid') || combined.includes('styling') || combined.includes('variables')) {
    return {
      title: "Modern CSS Flexbox & Responsive Grid",
      description: "A modular, responsive CSS layout blueprint using variables, media queries, and flex alignment rules.",
      language: "css",
      code: `.container {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 16px;\n  padding: 24px;\n}\n\n.flex-card {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  background: #ffffff;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  padding: 16px;\n}\n\n@media (max-width: 640px) {\n  .container {\n    padding: 12px;\n    gap: 8px;\n  }\n}`
    };
  }

  // HTML/SEO/Meta/Rendering/Web
  if (combined.includes('html') || combined.includes('seo') || combined.includes('meta') || combined.includes('rendering') || combined.includes('works')) {
    return {
      title: "Semantic HTML5 Structural Document Template",
      description: "A standard, accessible HTML5 layout featuring header, article landmarks, and defer scripts.",
      language: "html",
      code: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Production Web Template</title>\n  <link rel="stylesheet" href="styles.css">\n  <script src="app.js" defer></script>\n</head>\n<body>\n  <header>\n    <h1>CodeNivra Platform</h1>\n  </header>\n  <main>\n    <article>\n      <h2>Fundamentals of Web Parsing</h2>\n      <p>Semantic layouts allow fast web crawler parsing and optimize SEO indexing.</p>\n    </article>\n  </main>\n</body>\n</html>`
    };
  }

  // Default fallback code example
  return {
    title: "Syllabus Concept Code Implementation",
    description: "A programming script showing practical layout operations matching this learning topic.",
    language: "javascript",
    code: `// Practice Task implementation snippet\nfunction runConceptTest() {\n  console.log("Starting execution block for topic: ${title}");\n  \n  const executionData = {\n    topic: "${title}",\n    status: "active",\n    timestamp: new Date().toISOString()\n  };\n  \n  return executionData;\n}\n\nrunConceptTest();`
  };
}

// Main execution logic
const files = getMdxFiles(CONTENT_DIR);
let count = 0;

for (const file of files) {
  const content = fs.readFileSync(file, 'utf-8');
  const parsed = matter(content);
  
  // Only add if fullCode is not already present
  if (!parsed.data.fullCode) {
    const slug = path.basename(file, '.mdx');
    const title = parsed.data.title || slug;
    const tags = parsed.data.tags || [];
    
    const fullCodeData = generateCodeForTopic(slug, title, tags);
    parsed.data.fullCode = fullCodeData;
    
    const updatedContent = matter.stringify(parsed.content, parsed.data);
    fs.writeFileSync(file, updatedContent, 'utf-8');
    count++;
  }
}

console.log(`Successfully updated ${count} MDX files with dynamic fullCode blocks.`);
