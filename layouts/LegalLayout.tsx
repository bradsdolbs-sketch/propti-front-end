import { ReactNode } from "react";
import Link from "next/link";
import { Button } from "../components/ui/button";

interface LegalLayoutProps {
  title: string;
  children: ReactNode;
}

export default function LegalLayout({ title, children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top bar */}
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-slate-900 flex items-center justify-center text-xs font-bold text-white">
              P
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-slate-900">
                Propti
              </span>
              <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                Legal &amp; Compliance
              </span>
            </div>
          </Link>

          <Link href="/login">
            <Button variant="outline" className="text-xs sm:text-sm px-3 py-1.5">
              Sign in
            </Button>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-4">
            {title}
          </h1>
          <div className="prose prose-sm max-w-none text-slate-700">
            {children}
          </div>
        </div>
      </main>

      {/* Simple footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-slate-400">
            © {new Date().getFullYear()} Propti – maintenance-first property workflows.
          </p>
          <p className="text-[11px] text-slate-400">
            For legal or data questions: enquiries@propti.com
          </p>
        </div>
      </footer>
    </div>
  );
}
