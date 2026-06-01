import React from "react";
import Link from "next/link";
import { ChevronLeft, FolderTree, Layers, Server, Cpu, Info, Target, Wrench, ShieldAlert, Sparkles } from "lucide-react";
import { ProjectChecklist } from "@/components/mdx/ProjectChecklist";
import { InterviewExplanation } from "@/components/mdx/InterviewExplanation";

export const metadata = {
  title: "E-commerce Listing - Project Lab | DevMentor",
  description: "Detailed system design, requirements, and templates for the E-commerce Product Listing App.",
};

export default function EcommerceListingPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 py-10 relative animate-fade-in">
        {/* Top Back Navigation */}
        <div className="sticky top-16 z-40 -mx-4 px-4 py-3 bg-slate-50/90 backdrop-blur-md border-b border-slate-200/60 mb-8 flex items-center justify-between rounded-b-xl shadow-xs">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-indigo-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Project Labs
          </Link>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            LAB // ECOMMERCE-LISTING
          </span>
        </div>

        {/* Project Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold border bg-violet-50 text-violet-750 border-violet-150">
              Intermediate Lab
            </span>
            <span className="text-xs text-slate-500 font-semibold">2 - 3 Weeks Duration</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900">
            E-commerce Product Listing App
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Build a fast, searchable product catalog website. You will connect filtering sidebars, synchronize parameters with query URLs, implement local storage cart states, and enforce strict TypeScript data validations.
          </p>
        </div>

        {/* 1. Project Overview & 2. Who Should Build This */}
        <div className="grid sm:grid-cols-2 gap-6 my-8">
          <section className="p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-3">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
              <Info className="w-4.5 h-4.5 text-indigo-500" />
              1. Project Overview
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Design a searchable product catalog index featuring multi-select filters, price sliders, rating grids, list toggles, sorting mechanisms, and a persistent client-side shopping cart drawer.
            </p>
          </section>

          <section className="p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-3">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
              <Target className="w-4.5 h-4.5 text-indigo-500" />
              2. Who Should Build This?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Perfect for React developers ready to master advanced hooks (useMemo, useCallback), Context API state containers, URL search parameter synchronizations, and client-side database filtering techniques.
            </p>
          </section>
        </div>

        {/* 3. Real-Time Business Requirement & 4. Features List */}
        <section className="my-8 p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-6">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
            <Layers className="w-5 h-5 text-indigo-500" />
            3. Business Requirement & Features
          </h2>

          <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
            <div className="p-4 bg-indigo-50/30 border border-indigo-100 rounded-2xl">
              <p className="text-xs font-bold text-indigo-805 uppercase tracking-wider mb-1.5">Business Objective</p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                E-commerce platforms demand zero-latency catalog filtering. Customers should be able to filter by categories, price range, ratings, and availability. The catalog filter state must be serialized into the URL query parameters so users can share specific filter results. Product images should lazy-load, and the local cart must persist and compute taxes, discounts, and item limits client-side.
              </p>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Core Features List</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs sm:text-sm text-slate-650">
                <li><strong className="text-slate-900">Debounced Search Input:</strong> Queries items safely without rendering stutter.</li>
                <li><strong className="text-slate-900">Multi-Option Filters:</strong> Categorize by categories, ratings, availability.</li>
                <li><strong className="text-slate-900">URL Query Syncing:</strong> Filters map to query params for shareable states.</li>
                <li><strong className="text-slate-900">Shopping Cart Drawer:</strong> Computes subtotals, tax margins, and quantities.</li>
                <li><strong className="text-slate-900">Layout Toggle:</strong> Seamless grid-to-list animations.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 5. Tech Stack & 6. Folder Structure */}
        <section className="my-8 p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-6">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
            <Wrench className="w-5 h-5 text-indigo-500" />
            5. Tech Stack & 6. Folder Structure
          </h2>

          <div className="grid sm:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-700 mb-4">
            <div className="p-3 bg-slate-50 border rounded-xl">
              <span className="font-bold text-slate-800">Core Stack</span>
              <p className="text-xs text-slate-500 mt-1">React 19 & TypeScript</p>
            </div>
            <div className="p-3 bg-slate-50 border rounded-xl">
              <span className="font-bold text-slate-800">State</span>
              <p className="text-xs text-slate-500 mt-1">Context API + LocalStorage</p>
            </div>
            <div className="p-3 bg-slate-50 border rounded-xl">
              <span className="font-bold text-slate-800">Styling</span>
              <p className="text-xs text-slate-500 mt-1">CSS Modules / TailwindCSS</p>
            </div>
          </div>

          <pre className="bg-slate-950 text-slate-200 p-4 rounded-2xl border border-slate-900 font-mono text-xs overflow-x-auto leading-relaxed">
{`ecommerce-listing/
├── src/
│   ├── app/
│   │   ├── page.tsx               # Main catalog layout
│   │   └── layout.tsx
│   ├── components/
│   │   ├── CatalogGrid.tsx        # Grid wrapper
│   │   ├── FilterSidebar.tsx      # Sidebar inputs
│   │   ├── CartDrawer.tsx         # Cart slide-over drawer
│   │   └── ui/
│   │       ├── RangeSlider.tsx    # Price selectors
│   │       └── StarsRating.tsx    # Graphic stars
│   ├── context/
│   │   └── CartContext.tsx        # Global shopping cart provider
│   ├── hooks/
│   │   └── useDebounce.ts         # Hook for input debouncing
│   ├── lib/
│   │   └── products.ts            # Local mock product records
│   └── types/
│       └── index.ts               # Product, Cart, Filter types
└── tsconfig.json`}
          </pre>
        </section>

        {/* 7. Component Breakdown */}
        <section className="my-8 p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
            <FolderTree className="w-5 h-5 text-indigo-500" />
            7. Component Breakdown
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-slate-650">
            <div>
              <p className="font-bold text-slate-800 mb-1">`CatalogGrid` Component</p>
              <p className="leading-relaxed">Maps filtered product sets into responsive grids, featuring load skeleton placeholders and empty-result fallback screens.</p>
            </div>
            <div>
              <p className="font-bold text-slate-800 mb-1">`FilterSidebar` Component</p>
              <p className="leading-relaxed">Presents multi-select controls for category checkboxes, min/max price sliders, ratings, and instant-resets.</p>
            </div>
            <div>
              <p className="font-bold text-slate-800 mb-1">`CartDrawer` Component</p>
              <p className="leading-relaxed">Sliding lateral overlay listing cart items. Automatically calculates subtotal prices, discount code percentages, sales tax, and shipping rates.</p>
            </div>
          </div>
        </section>

        {/* 8. API Contract & 9. Database Schema Idea */}
        <section className="my-8 p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-6">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
            <Server className="w-5 h-5 text-indigo-500" />
            8. API Contract & 9. Database Schema
          </h2>

          <div className="space-y-6 text-sm text-slate-700">
            <div>
              <h3 className="font-bold text-slate-905 mb-2 text-xs uppercase tracking-wider">GET `/api/products` Contract</h3>
              <pre className="bg-slate-950 text-slate-200 p-4 rounded-xl border border-slate-900 font-mono text-xs overflow-x-auto">
{`Request Query Params:
?search=shoes&category=footwear&minPrice=20&maxPrice=150&rating=4&sort=price_desc

Response (200 OK):
{
  "products": [
    {
      "id": "prod_1001",
      "title": "Trail Runner Pro",
      "price": 120.00,
      "category": "footwear",
      "rating": 4.5,
      "inStock": true,
      "imageUrl": "https://cdn.devmentor.io/products/runner.jpg"
    }
  ],
  "totalCount": 1
}`}
              </pre>
            </div>

            <div>
              <h3 className="font-bold text-slate-905 mb-2 text-xs uppercase tracking-wider">PostgreSQL Database Schema</h3>
              <pre className="bg-slate-950 text-slate-200 p-4 rounded-xl border border-slate-900 font-mono text-xs overflow-x-auto">
{`CREATE TABLE categories (
  slug VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE products (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category_slug VARCHAR(50) REFERENCES categories(slug),
  rating DECIMAL(2, 1) CHECK (rating >= 0 AND rating <= 5),
  stock_count INTEGER NOT NULL DEFAULT 0,
  image_url VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_products_category ON products(category_slug);
CREATE INDEX idx_products_price ON products(price);`}
              </pre>
            </div>
          </div>
        </section>

        {/* 10. Step-by-Step Implementation Phases */}
        <section className="my-8 p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
            <Cpu className="w-5 h-5 text-indigo-500" />
            10. Step-by-Step Phases
          </h2>

          <div className="space-y-4 text-sm text-slate-700">
            {[
              { phase: "Phase 1: Database Setup & Grids", desc: "Define mock datasets and render product catalog listing structures. Create product cards responsive grid layouts." },
              { phase: "Phase 2: Filter States & Searching", desc: "Construct filter sidebar checkboxes, inputs, and sliders. Code debounced triggers on searches." },
              { phase: "Phase 3: Serializing Filters to URLs", desc: "Connect filters state to Next.js query parameter hooks. Ensure browser history parameters and refresh preserves active filters." },
              { phase: "Phase 4: Shopping Cart Context State", desc: "Setup React Context to hold shopping items. Integrate local storage synchronization to save cart states across page loads." },
              { phase: "Phase 5: Persistent Cart Sliding Drawer", desc: "Design sliding drawer menus triggering subtotal computations. Enforce stock availability checks before allowing quantity increments." }
            ].map((p, idx) => (
              <div key={idx} className="flex gap-4">
                <span className="h-6 w-6 rounded-full bg-indigo-50 text-indigo-650 font-bold text-xs flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <div>
                  <h4 className="font-bold text-slate-900">{p.phase}</h4>
                  <p className="text-slate-650 text-xs mt-0.5 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 13. Common Mistakes (Architectural Pitfalls) */}
        <section className="my-8 p-6 bg-red-50/20 border border-red-200 rounded-3xl shadow-xs space-y-4">
          <h2 className="text-lg font-extrabold text-red-950 flex items-center gap-2 pb-3 border-b border-red-100">
            <ShieldAlert className="w-5 h-5 text-red-600" />
            13. Common Mistakes to Avoid
          </h2>
          <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <li className="flex gap-2 items-start">
              <span className="text-red-600 font-bold shrink-0">✕</span>
              <span><strong>URL & Local State Mismatches:</strong> Tracking filter parameters in local state hooks instead of directly binding to url routers, breaking standard browser shareability.</span>
            </li>
            <li className="flex gap-2 items-start">
              <span className="text-red-600 font-bold shrink-0">✕</span>
              <span><strong>Direct State Modifications:</strong> Mutating cart arrays directly (e.g. `state.push()`) instead of returning shallow copies, preventing React re-renders.</span>
            </li>
            <li className="flex gap-2 items-start">
              <span className="text-red-600 font-bold shrink-0">✕</span>
              <span><strong>Failing to Key Grid Elements:</strong> Omitting unique product key bindings on grids, causing structural layout rebuilds on sorting changes.</span>
            </li>
          </ul>
        </section>

        {/* 14. Senior Developer Notes */}
        <section className="my-8 p-6 bg-indigo-50/20 border border-indigo-150 rounded-3xl shadow-xs space-y-4">
          <h2 className="text-lg font-extrabold text-indigo-950 flex items-center gap-2 pb-3 border-b border-indigo-100">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            14. Senior Developer Advice
          </h2>
          <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <p>
              💡 <strong>Rely on useTransition:</strong> Filtering large datasets client-side causes laggy interactions. Wrap URL updating functions in React&apos;s `useTransition` to keep inputs responsive while lists process filters.
            </p>
            <p>
              💡 <strong>Cart Calculation Integrity:</strong> Calculate the shopping cart&apos;s totals dynamically inside the render thread using `useMemo`. Never store computed totals in separate states, avoiding synchronization anomalies.
            </p>
          </div>
        </section>

        {/* 11. Testing Checklist & 12. Deployment Checklist */}
        <ProjectChecklist
          title="11. Testing Checklist"
          storageKey="ecommerce-listing-testing"
          items={[
            "Verify filters serialize correctly in address URLs on refresh.",
            "Verify local storage buffers restore shopping cart items on page reload.",
            "Ensure inventory limit warnings block inputs from exceeding maximum stock quotas.",
            "Verify list items remain keyboard focusable."
          ]}
        />

        <ProjectChecklist
          title="12. Deployment Checklist"
          storageKey="ecommerce-listing-deploy"
          items={[
            "Set cache control headers on product visual images.",
            "Confirm responsive grids scale seamlessly without elements clipping.",
            "Run clean npm production builds compile pipelines."
          ]}
        />

        {/* 15. Interview Explanation */}
        <InterviewExplanation
          projectName="E-commerce Product Listing App"
          buildDesc="I designed an optimized product catalog interface that links layout filtration sidebars with query URLs, and features a local shopping cart drawer."
          approachDesc="I chose React Context to distribute cart events, and synced filter parameters with browser query strings to maintain URL state integrity."
          challengesDesc="The primary challenge was preventing catalog lag when filtering numerous cards. I solved this by adding debouncing timers and using React's useTransition hooks."
          performanceDesc="I optimized images with custom formats, memoized expensive filtering arrays, and offloaded heavy computations."
          errorsDesc="I handled missing product assets using fallback placeholders, and caught cart database synchronization errors using fallback try-catch scopes."
          structureDesc="I structured the workspace logically: components hold UI views, context maintains shopping buffers, and helper functions manage debouncing."
          productionImprovements={[
            "Build automated checkout test scripts using Playwright.",
            "Implement server-driven server-side filtering APIs.",
            "Connect analytics tools to monitor checkout completion conversion flows."
          ]}
        />

        {/* 16. Future Enhancements */}
        <section className="my-8 p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xs space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
            <Sparkles className="w-5 h-5 text-indigo-500" />
            16. Future Enhancements
          </h2>
          <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <li>Integrate recommendation carousels highlighting associated products using basic matching criteria.</li>
            <li>Incorporate support for dynamic localization, letting users toggle multi-currencies.</li>
            <li>Link Stripe checkout APIs to handle actual card transactions securely.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
