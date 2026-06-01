import React from "react";

interface FeatureCardProps {
  title: string;
  desc: string;
  icon: React.ReactNode;
  badge?: string;
  colorClass?: string;
}

export function FeatureCard({ title, desc, icon, badge, colorClass }: FeatureCardProps) {
  return (
    <div className="border border-slate-100 bg-white rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:-translate-y-[3px] transition-all duration-300 ease-out focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2">
      <div className={`h-12 w-12 rounded-2xl flex items-center justify-center mb-6 bg-indigo-50 text-indigo-600 ${colorClass}`}>
        {icon}
      </div>
      {badge && (
        <span className="inline-block text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-2">
          {badge}
        </span>
      )}
      <h3 className="text-lg font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed font-normal">{desc}</p>
    </div>
  );
}
