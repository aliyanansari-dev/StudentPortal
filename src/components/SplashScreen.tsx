import { useEffect, useState } from 'react';
import { COLLEGE_INFO } from '../data/portalData';
import { GraduationCap, ArrowRight, ShieldCheck } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
  duration?: number; // default 5 seconds
}

export default function SplashScreen({ onComplete, duration = 5 }: SplashScreenProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const totalMs = duration * 1000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, Math.ceil((totalMs - elapsed) / 1000));
      const currentProgress = Math.min(100, (elapsed / totalMs) * 100);

      setTimeLeft(remaining);
      setProgress(currentProgress);

      if (elapsed >= totalMs) {
        clearInterval(interval);
        onComplete();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  return (
    <div 
      id="splash-screen-container" 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900 text-white px-6 select-none"
    >
      {/* Background Decorative Rings */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-emerald-500/30 blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-cyan-500/20"></div>
      </div>

      <div className="relative z-10 max-w-lg w-full text-center flex flex-col items-center">
        {/* Official College Crest Emblem */}
        <div 
          id="college-logo-emblem" 
          className="relative mb-6 group"
        >
          <div className="w-28 h-28 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 p-1 shadow-2xl shadow-emerald-500/30 flex items-center justify-center transition-transform hover:scale-105">
            <div className="w-full h-full bg-slate-900 rounded-[14px] flex flex-col items-center justify-center border border-emerald-500/40 p-2">
              <GraduationCap className="w-12 h-12 text-emerald-400" />
              <span className="text-[10px] font-bold tracking-widest text-emerald-300 uppercase mt-1">GCT</span>
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-slate-950 p-1.5 rounded-full shadow-lg">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>

        {/* College Name & Department */}
        <h1 
          id="splash-college-title" 
          className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight"
        >
          {COLLEGE_INFO.name}
        </h1>
        <p 
          id="splash-college-dept" 
          className="text-emerald-400 font-semibold text-sm sm:text-base mt-2 tracking-wide"
        >
          Department of {COLLEGE_INFO.department}
        </p>
        <p className="text-slate-400 text-xs mt-1">
          {COLLEGE_INFO.session} • w.e.f {COLLEGE_INFO.effectiveDate}
        </p>

        {/* 5-Second Timer and Progress Bar */}
        <div className="w-full mt-8 bg-slate-800/80 p-4 rounded-xl border border-slate-700/60 backdrop-blur-sm">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Loading College Portal System...</span>
            <span className="font-mono text-emerald-400 font-bold">{timeLeft}s remaining</span>
          </div>

          <div className="w-full bg-slate-700 h-2.5 rounded-full overflow-hidden">
            <div 
              id="splash-progress-bar"
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-75 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-between items-center mt-3 text-[11px] text-slate-400">
            <span>Affiliation: PBTE & TEVTA</span>
            <span>MERN Stack Student Portal</span>
          </div>
        </div>

        {/* Skip button so user is never trapped */}
        <button
          id="btn-skip-splash"
          onClick={onComplete}
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-sm font-medium border border-slate-700 transition-colors shadow-sm"
        >
          Skip to Portal <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <footer className="absolute bottom-4 text-center text-slate-400 text-xs">
        Government College of Technology, Bhakkar • Computer Information Technology
      </footer>
    </div>
  );
}
