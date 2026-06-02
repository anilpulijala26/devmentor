export interface ProductionBlueprint {
  folderStructure: string;
  buildSteps: string[];
  environmentSetup: {
    installCommand: string;
    envExample: string;
    localRunCommand: string;
  };
  fullCode: string;
  validationDetails: string;
  testSuite: string;
  productionChecklist: string[];
  commonMistakes: string[];
  interviewExplanation: string;
}

export const productionBlueprints: Record<string, ProductionBlueprint> = {
  foundations: {
    folderStructure: `my-semantic-page/
├── index.html
├── styles/
│   └── main.css
├── js/
│   └── app.js
├── package.json
└── README.md`,
    buildSteps: [
      "Initialize your workspace and write semantic document outlines using HTML5 semantic tags.",
      "Add responsive CSS Grid and Flexbox alignment rules using CSS Custom Properties.",
      "Write optimized JavaScript handlers to fetch data and defer heavy rendering scripts to avoid blockages."
    ],
    environmentSetup: {
      installCommand: "npm install --save-dev browser-sync",
      envExample: "PORT=3000\nNODE_ENV=development",
      localRunCommand: "npx browser-sync start --server --files '*.html, styles/*.css, js/*.js'"
    },
    fullCode: `<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Production Semantic Layout</title>
  <link rel="stylesheet" href="styles/main.css">
  <script src="js/app.js" defer></script>
</head>
<body>
  <header>
    <nav aria-label="Main Navigation">
      <a href="/" class="logo">CodeNivra</a>
      <ul class="nav-links">
        <li><a href="#features">Features</a></li>
        <li><a href="#pricing">Pricing</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <article>
      <h1>Optimized Web Foundations</h1>
      <p>Semantic document structures pass Core Web Vitals automatically.</p>
    </article>
  </main>
</body>
</html>`,
    validationDetails: "HTML5 native validation (`required`, `pattern`) combined with standard JavaScript event validators to block bad submits.",
    testSuite: `// js/app.test.js
test("adds defer to script tags and respects semantic structure", () => {
  const scripts = document.querySelectorAll("script");
  scripts.forEach(s => {
    expect(s.hasAttribute("defer")).toBe(true);
  });
});`,
    productionChecklist: [
      "Verify zero render-blocking styles or script imports in head.",
      "Enforce explicit image width/height to avoid layout shifts (CLS).",
      "Run WCAG color contrast validation checking for AAA compliance."
    ],
    commonMistakes: [
      "Using non-semantic div tags for headers, footers, and links, which breaks accessibility tab order.",
      "Importing heavy JavaScript libraries in the head tag without defer or async attributes."
    ],
    interviewExplanation: "I built a highly semantic layout with critical inline styles, achieving 100 on Lighthouse. I utilized async/defer script attributes to ensure DOM parsing remains unblocked, and forced explicit image sizing metrics to completely solve layout shifting issues."
  },
  "frontend-frameworks": {
    folderStructure: `my-next-app/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── api/
│       └── submit/
│           route.ts
├── components/
│   └── Form.tsx
├── hooks/
│   └── useLocalStorage.ts
├── package.json
└── tsconfig.json`,
    buildSteps: [
      "Setup dynamic Next.js App Router folders and configure strict TypeScript.",
      "Create reactive components utilizing useState and local storage sync hook hooks.",
      "Build a POST endpoint route utilizing Next.js API Routes to validate payload schemas."
    ],
    environmentSetup: {
      installCommand: "npm install zod lucide-react typescript @types/react",
      envExample: "NEXT_PUBLIC_API_URL=https://api.codenivra.io\nNODE_ENV=production",
      localRunCommand: "npm run dev"
    },
    fullCode: `// components/Form.tsx
import React, { useState } from "react";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export function Form() {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = formSchema.safeParse(data);
    if (!result.success) {
      const errMap: Record<string, string> = {};
      result.error.errors.forEach(err => {
        errMap[err.path[0] as string] = err.message;
      });
      setErrors(errMap);
    } else {
      setErrors({});
      console.log("Submit data:", result.data);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-xs font-bold text-slate-700">Email</label>
        <input
          id="email"
          type="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          className="mt-1 block w-full rounded-md border-slate-300"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>
    </form>
  );
}`,
    validationDetails: "Zod Schema validation (`z.object`) on fields, parsing on-change or on-submit to render validation errors instantly.",
    testSuite: `// components/Form.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { Form } from "./Form";

test("renders form inputs and handles invalid emails", () => {
  render(<Form />);
  const input = screen.getByLabelText(/email/i);
  fireEvent.change(input, { target: { value: "invalid" } });
  fireEvent.click(screen.getByRole("button", { name: /submit/i }));
  expect(screen.getByText("Invalid email format")).toBeInTheDocument();
});`,
    productionChecklist: [
      "Optimize state updates by separating static layouts and dynamic inputs.",
      "Check keyboard focus loops on forms and inputs.",
      "Use dynamic imports for heavy charting libraries to optimize bundle size."
    ],
    commonMistakes: [
      "Writing massive monolithic client files holding too many sub-states causing performance delays.",
      "Leaving components un-typed under TypeScript or bypassing warnings with any assertions."
    ],
    interviewExplanation: "I implemented a React client with strict type-safety, integrating client-side Zod validation. I isolated state transitions to prevent excessive rerenders and configured dynamic prefetching routes on Next.js to provide instantaneous page navigation."
  },
  backend: {
    folderStructure: `my-express-api/
├── src/
│   ├── app.ts
│   ├── controllers/
│   │   └── user.controller.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   └── error.middleware.ts
│   └── routes/
│       └── api.ts
├── prisma/
│   └── schema.prisma
├── package.json
└── tsconfig.json`,
    buildSteps: [
      "Setup your ts-node compiler, Express app router, and custom json parsing middle nodes.",
      "Define schema tables inside your prisma.schema and execute schema database migrations.",
      "Build authentication routers, hashing passwords, signing JWTs, and parsing cookies."
    ],
    environmentSetup: {
      installCommand: "npm install express cors jsonwebtoken zod dotenv bcrypt\nnpm install --save-dev typescript @types/express prisma tsx",
      envExample: "DATABASE_URL=postgresql://user:pass@localhost:5432/mydb\nJWT_SECRET=super_secret\nPORT=8080",
      localRunCommand: "npx prisma db push && npx tsx src/app.ts"
    },
    fullCode: `// src/middleware/error.middleware.ts
import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  
  console.error(\`[Error] Status \${status} - \${message}\`);
  
  res.status(status).json({
    success: false,
    error: {
      status,
      message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack })
    }
  });
}`,
    validationDetails: "Zod Schema middleware checking `req.body` and `req.query` schemas before handling business service controllers.",
    testSuite: `// src/app.test.ts
import request from "supertest";
import { app } from "./app";

test("POST /api/login checks correct validation schemas", async () => {
  const res = await request(app)
    .post("/api/login")
    .send({ email: "bademail", password: "" });
  expect(res.status).toBe(400);
  expect(res.body.success).toBe(false);
});`,
    productionChecklist: [
      "Ensure production passwords are encrypted utilizing Bcrypt configurations.",
      "Define Express rate limiters on endpoints to prevent Denial-of-Service attacks.",
      "Implement structured JSON logging with custom logging libraries instead of console sinks."
    ],
    commonMistakes: [
      "Failing to catch errors in Express async routers causing server loop threads to collapse.",
      "Bypassing secure HTTP-Only flags on JWT auth cookie objects, triggering XSS security loops."
    ],
    interviewExplanation: "I architected an Express API utilizing Prisma ORM with PostgreSQL. I engineered a robust JWT token-refresh controller, set custom rate-limiting rules on routers, and standard error intercept middleware to ensure the service returns uniform JSON error payloads."
  },
  fullstack: {
    folderStructure: `my-monorepo/
├── apps/
│   ├── web/ (Next.js app)
│   └── api/ (Express API)
├── packages/
│   ├── config/ (shared configs)
│   └── types/ (shared DB types)
├── package.json
└── turbo.json`,
    buildSteps: [
      "Create monorepo workspace configurations utilizing Turborepo or npm workspaces.",
      "Define shared Typescript types for database structures across client and server workspaces.",
      "Establish CORS configs and HttpOnly auth token handshake headers on client fetchers."
    ],
    environmentSetup: {
      installCommand: "npm install turbo --global",
      envExample: "API_PORT=8080\nCLIENT_PORT=3000\nDATABASE_URL=postgresql://...",
      localRunCommand: "turbo run dev"
    },
    fullCode: `// apps/web/lib/api.ts
import { UserType } from "types";

export async function fetchUserProfile(token: string): Promise<UserType> {
  const res = await fetch("http://localhost:8080/api/profile", {
    headers: {
      "Authorization": \`Bearer \${token}\`,
      "Content-Type": "application/json"
    }
  });
  if (!res.ok) {
    throw new Error("Failed to load user profile");
  }
  const data = await res.json();
  return data.user;
}`,
    validationDetails: "Shared schema libraries validating JSON request payloads on the server and synchronizing Typescript generics on the frontend.",
    testSuite: `// apps/web/tests/e2e.test.ts
test("user registration and database profile validation syncs", async () => {
  // mock browser automation tests or cross-boundary assertions
});`,
    productionChecklist: [
      "Enable secure CORS cookies and headers across domains.",
      "Configure global Monorepo workspaces pipeline caching targets.",
      "Verify client token expirations route automatically to refresh links."
    ],
    commonMistakes: [
      "Configuring permissive wildcard CORS headers ('*') while processing credentials headers.",
      "Re-declaring type interfaces on client and server workspace configurations independently."
    ],
    interviewExplanation: "I constructed a scalable monorepo packaging common TypeScript interfaces. I secured the boundary through HttpOnly cookie parameters, prevented routing leaks through middleware guards, and configured automated workspace build caching pipelines."
  },
  deployment: {
    folderStructure: `deployment-workspace/
├── .github/
│   └── workflows/
│       └── cd.yml
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
└── README.md`,
    buildSteps: [
      "Write multi-stage Dockerfiles caching node_modules and minimizing final bundle sizes.",
      "Write GitHub actions configuration compiling, auditing static tests, and deploying images.",
      "Configure docker-compose configurations orchestrating client, api, and database containers."
    ],
    environmentSetup: {
      installCommand: "docker build -t app:latest .",
      envExample: "DOCKER_REGISTRY=docker.io\nAWS_ACCESS_KEY_ID=...\nAWS_SECRET_ACCESS_KEY=...",
      localRunCommand: "docker compose up -d"
    },
    fullCode: `# Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000
ENV NODE_ENV=production
CMD ["npm", "run", "start"]`,
    validationDetails: "Health checks on routes (`/api/health`) validating database connections and memory statistics before traffic ingestion.",
    testSuite: `// ci/build-check.sh
#!/bin/sh
docker build -t test-build . && echo "Docker build successful!"`,
    productionChecklist: [
      "Set multi-stage caching layers to reduce final container footprint.",
      "Verify secrets are loaded via cloud parameter stores instead of raw code.",
      "Inject health checks validating service uptime thresholds."
    ],
    commonMistakes: [
      "Leaving debug root privileges active inside production containers.",
      "Pushing raw environment configuration secrets directly inside GitHub actions yml scripts."
    ],
    interviewExplanation: "I engineered a multi-stage Docker deployment script, reducing the target container size from 1.2GB down to 180MB. I automated deployment pipelines utilizing GitHub Actions, routing container clusters securely inside isolated cloud container groups."
  },
  interview: {
    folderStructure: `interview-prep/
├── system-architecture/
│   └── pitch.md
├── algorithms/
└── behavioral/`,
    buildSteps: [
      "Structure system design schemas using common proxy, CDN, and database nodes.",
      "Master the critical rendering path steps and browser event loop ticks.",
      "Rehearse behavioral responses using the Situation-Task-Action-Result (STAR) template."
    ],
    environmentSetup: {
      installCommand: "npm install --global markdown-cli",
      envExample: "MOCK_INTERVIEWER=SeniorArchitect",
      localRunCommand: "npx markdown-cli system-architecture/pitch.md"
    },
    fullCode: `# System Design Pitch Template
- **Situation**: Scaled a high-traffic dashboard supporting 10k requests/min.
- **Task**: Reduce response latencies, improve loading scores, and secure databases.
- **Action**: Configured CDNs, implemented redis caching layers, and tuned Prisma queries.
- **Result**: Core Web Vital metrics scored 95+, database overhead reduced by 40%.`,
    validationDetails: "Mock interview self-assessment checks verifying performance, design patterns, and scale architecture considerations.",
    testSuite: `// test/interview-check.sh
echo "Rehearsed concurrency, token refreshes, and database query optimizations."`,
    productionChecklist: [
      "Rehearse answering API route and database index planning challenges.",
      "Validate browser rendering loop sequence understanding.",
      "Verify query optimization solutions for common N+1 loading bottlenecks."
    ],
    commonMistakes: [
      "Explaining coding solutions without detailing performance implications and trade-offs.",
      "Overcomplicating basic system architecture configurations before validating constraints."
    ],
    interviewExplanation: "I structure my architectural answers using the STAR method, focusing on scalability and trade-offs. I explain rendering in terms of the Critical Path, secure APIs through token management, and tune database operations utilizing indexes and ORM transaction pipelines."
  }
};
