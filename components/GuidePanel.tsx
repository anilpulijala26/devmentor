import { HelpCircle, ArrowRight, Target, UserCheck, Compass, Award } from "lucide-react";

interface GuidePanelProps {
  title: string;
  what: string;
  who: string;
  first: string;
  next: string;
  outcome: string;
  nextAction: string;
}

export function GuidePanel({
  title,
  what,
  who,
  first,
  next,
  outcome,
  nextAction,
}: GuidePanelProps) {
  return (
    <div className="w-full bg-slate-50 border border-slate-200/80 rounded-3xl p-6 mb-8 shadow-[0_4px_20px_rgba(0,0,0,0.01)] transition-all duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/60 pb-4 mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center border border-indigo-100">
            <HelpCircle className="w-4 h-4 text-indigo-650" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-slate-900 tracking-tight">{title}</h2>
            <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase mt-0.5">Self-Guided Help Console</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-indigo-600/9 bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100/80 px-3.5 py-1.5 rounded-2xl w-fit">
          <span className="text-[9px] font-extrabold text-indigo-700 tracking-wider uppercase">Next Action</span>
          <ArrowRight className="w-3 h-3 text-indigo-500" aria-hidden="true" />
          <span className="text-xs font-bold text-slate-800">{nextAction}</span>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 text-left">
        {/* Item 1 */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-indigo-650 font-bold text-xs uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" aria-hidden="true" />
            <span>What is this for?</span>
          </div>
          <p className="text-xs text-slate-550 leading-relaxed font-normal">{what}</p>
        </div>

        {/* Item 2 */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-indigo-650 font-bold text-xs uppercase tracking-wider">
            <UserCheck className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Who is it for?</span>
          </div>
          <p className="text-xs text-slate-550 leading-relaxed font-normal">{who}</p>
        </div>

        {/* Item 3 */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-emerald-650 font-bold text-xs uppercase tracking-wider">
            <Target className="w-3.5 h-3.5" aria-hidden="true" />
            <span>What to do first?</span>
          </div>
          <p className="text-xs text-slate-550 leading-relaxed font-normal">{first}</p>
        </div>

        {/* Item 4 */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-violet-650 font-bold text-xs uppercase tracking-wider">
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            <span>What to do next?</span>
          </div>
          <p className="text-xs text-slate-550 leading-relaxed font-normal">{next}</p>
        </div>

        {/* Item 5 */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-amber-650 font-bold text-xs uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Outcome you get</span>
          </div>
          <p className="text-xs text-slate-550 leading-relaxed font-normal">{outcome}</p>
        </div>
      </div>
    </div>
  );
}
