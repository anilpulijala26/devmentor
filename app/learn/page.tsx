import { getAllTracks } from "@/lib/content";
import { LearnClient } from "@/components/LearnClient";

export const metadata = {
  title: "Learning Hub - CodeNivra",
  description: "Gain hands-on developer experience. Follow guided paths, practice daily tasks, build project blueprints, and crack interviews.",
};

export default function LearnPage() {
  const tracks = getAllTracks();

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 relative overflow-hidden">
      {/* Decorative background blur shapes */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-80 right-1/4 w-[500px] h-[500px] bg-violet-200/10 rounded-full blur-3xl pointer-events-none" />
      
      <LearnClient tracks={tracks} />
    </div>
  );
}
