import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { verifyJWT } from "@/lib/jwt";
import { dbQuery } from "@/lib/db";
import { User, ArrowLeft, Mail, Shield, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Profile - CodeNivra",
  description: "View and manage your CodeNivra profile and account plan options.",
};

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const decoded = verifyJWT(token);
  if (!decoded) {
    redirect("/login");
  }

  try {
    const userResult = await dbQuery(
      "SELECT id, name, email, role, status FROM users WHERE id = $1",
      [decoded.userId]
    );

    if (userResult.rows.length === 0) {
      redirect("/login");
    }

    const user = userResult.rows[0];

    if (user.status !== "active") {
      redirect("/login");
    }

    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(191,219,254,0.1),transparent_35%),linear-gradient(180deg,#f8fafc_0%,#ffffff_20%,#f8fafc_100%)] pb-20 relative overflow-hidden">
        {/* Background grids */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          
          <div className="mb-8">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Link>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_4px_30px_rgba(15,23,42,0.01)] overflow-hidden">
            {/* Header Cover Background */}
            <div className="h-32 bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 relative" />

            {/* Profile Content */}
            <div className="px-6 pb-8 sm:px-10 sm:pb-10 relative">
              {/* Avatar position overlapping header */}
              <div className="relative -mt-16 mb-6">
                <div className="w-28 h-28 rounded-3xl bg-indigo-50 border-4 border-white text-indigo-650 flex items-center justify-center shrink-0 shadow-md">
                  <User className="w-12 h-12 text-indigo-600" />
                </div>
              </div>

              {/* User Title Information */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                  {user.name}
                </h1>
                <p className="text-sm font-semibold text-slate-400 mt-1 uppercase tracking-widest font-mono">
                  {user.role} Account Plan
                </p>
              </div>

              {/* Details List Card Grid */}
              <div className="grid grid-cols-1 gap-6 mt-8 border-t border-slate-100 pt-8">
                
                {/* Account Details Block */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest font-mono">
                    Account Information
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name detail row */}
                    <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-4.5">
                      <p className="text-xs text-slate-400 font-mono">FULL NAME</p>
                      <p className="text-sm font-bold text-slate-800 mt-1.5">{user.name}</p>
                    </div>

                    {/* Email detail row */}
                    <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-4.5 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-slate-400 font-mono">EMAIL ADDRESS</p>
                        <p className="text-sm font-bold text-slate-800 mt-1.5 truncate max-w-[200px]">{user.email}</p>
                      </div>
                      <Mail className="w-4 h-4 text-slate-400" />
                    </div>

                    {/* Role detail row */}
                    <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-4.5 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-slate-400 font-mono">MEMBERSHIP ROLE</p>
                        <p className="text-sm font-bold text-slate-800 mt-1.5 capitalize">{user.role}</p>
                      </div>
                      <Shield className="w-4 h-4 text-slate-400" />
                    </div>

                    {/* Status detail row */}
                    <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-4.5 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-slate-400 font-mono">ACCOUNT STATUS</p>
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-bold text-xs mt-2 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                          Active
                        </span>
                      </div>
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    </div>
                  </div>
                </div>

                {/* Additional Platform Details card */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50/50 rounded-2xl p-5 border border-indigo-100/50 mt-2">
                  <h4 className="text-sm font-extrabold text-indigo-900 tracking-tight">CodeNivra Pro Badge</h4>
                  <p className="text-xs text-indigo-700 mt-1 leading-relaxed">
                    Your account has full access to frontend frameworks, backend API construction tracks, PostgreSQL database labs, and dynamic deployment tools.
                  </p>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    );
  } catch (error) {
    console.error("Profile Server Load Error:", error);
    redirect("/login");
  }
}
