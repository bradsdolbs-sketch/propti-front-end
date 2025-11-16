import { Info } from "lucide-react";

export default function DemoBanner() {
  return (
    <div className="w-full bg-amber-100 border-b border-amber-200 px-4 sm:px-6 py-2 text-[11px] sm:text-xs text-amber-900 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <Info size={14} className="hidden sm:block" />
        <span>
          Propti is running in sandbox mode. All data, jobs, payouts and users
          shown here are mock and for demonstration only.
        </span>
      </div>
      <span className="hidden sm:inline-flex rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide">
        Demo environment
      </span>
    </div>
  );
}
