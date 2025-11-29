import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import {
  Building2,
  Wrench,
  Users,
  ShieldCheck,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import { getStoredRole, roleToPortal, setStoredRole } from "../lib/auth";
import { api } from "../lib/api";

export default function LandingPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (typeof document === "undefined") return;
    let cancelled = false;

    const storedRole = getStoredRole();
    if (storedRole) setRole(storedRole);

    const hasCookie = document.cookie.includes("stack-access");
    setLoggedIn(hasCookie);

    api
      .getCurrentUser()
      .then((me) => {
        if (cancelled) return;
        if (me?.role) {
          setRole(me.role);
          setStoredRole(me.role as any);
        }
        // If the call worked, we know we're logged in.
        setLoggedIn(true);
      })
      .catch(() => {
        if (cancelled) return;
        // Fall back to cookie detection; keep logged in if cookie exists.
        setLoggedIn(document.cookie.includes("stack-access"));
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const portalHref = role ? roleToPortal(role as any) : loggedIn ? "/post-auth" : "/signup";
  const fallbackHref = "/post-auth";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* NAVBAR */}
      <header className="w-full border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo / brand */}
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-slate-900 flex items-center justify-center text-xs font-bold text-white">
              P
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-slate-900">
                Propti
              </span>
              <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                Maintenance-first
              </span>
            </div>
          </Link>

          {/* Right side: auth buttons or portal CTA when logged in */}
          <nav className="flex items-center gap-3">
            {loggedIn ? (
              <>
                <Link href={portalHref || fallbackHref}>
                  <Button className="text-xs sm:text-sm px-3 py-1.5">
                    Go to portal
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="text-xs sm:text-sm px-3 py-1.5"
                  onClick={() => {
                    // Clear stored role and rely on auth logout page
                    if (typeof window !== "undefined") {
                      window.localStorage.removeItem("propti_role");
                      window.location.href = "/handler/sign-out";
                    }
                  }}
                >
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="text-xs sm:text-sm px-3 py-1.5"
                  >
                    Sign in
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="text-xs sm:text-sm px-3 py-1.5">
                    Create account
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1">
        {/* HERO / WELCOME SECTION */}
        <section className="border-b border-slate-200 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 grid gap-10 md:grid-cols-2 items-center">
            <div>
              <p className="text-xs tracking-[0.25em] text-slate-400 mb-3">
                WELCOME TO PROPTI
              </p>
              <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 leading-tight mb-3">
                Maintenance, done properly for{" "}
                <span className="underline decoration-slate-300">
                  every part
                </span>{" "}
                of the tenancy chain.
              </h1>
              <p className="text-sm md:text-base text-slate-600 mb-6 max-w-xl">
                Propti connects landlords, agents, tenants and contractors in a
                single, shared view of every maintenance issue. No more missed
                messages, lost photos or “who’s chasing this?”.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-3">
                <Link href="/signup" className="sm:flex-1">
                  <Button className="w-full flex items-center justify-center gap-2">
                    <span>Get started free</span>
                    <ArrowRight size={14} />
                  </Button>
                </Link>
                <Link href="/portals" className="sm:flex-1">
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2 text-slate-700"
                  >
                    Preview the portals
                  </Button>
                </Link>
              </div>

              <p className="text-[11px] text-slate-400">
                Landlord Plus (automated management) from £49.99/month. All
                other portals are free to use.
              </p>
            </div>

            {/* Right-hand summary cards */}
            <div className="grid gap-4">
              <FeatureCard
                icon={<Building2 size={18} />}
                title="For landlords & owners"
                body="See every property, request and invoice in one place. Approve work with a click and let Propti handle the updates."
              />
              <FeatureCard
                icon={<Users size={18} />}
                title="For agents"
                body="A shared workspace for your team to coordinate maintenance, keep landlords reassured and tenants in the loop."
              />
              <FeatureCard
                icon={<Wrench size={18} />}
                title="For tenants & contractors"
                body="Tenants log issues with photos. Contractors see clear jobs, time slots and access notes. Everyone knows what’s happening."
              />
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="bg-white border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-4 py-10 md:py-12">
            <h2 className="text-lg md:text-xl font-semibold text-slate-900 mb-2">
              How Propti fits around your existing lettings workflow
            </h2>
            <p className="text-sm text-slate-500 mb-6 max-w-2xl">
              Keep using the tools you already know – Propti quietly owns the
              maintenance layer in the middle, so every job has a clear home.
            </p>

            <div className="grid gap-4 md:grid-cols-3">
              <StepCard
                step="1"
                title="Tenant reports the issue"
                body="They log the problem in their portal with photos, notes and preferred time slots. No more unclear WhatsApps or missing context."
              />
              <StepCard
                step="2"
                title="Landlord or agent approves"
                body="The right person approves the job, picks or invites a contractor, and Propti keeps everyone synced on status."
              />
              <StepCard
                step="3"
                title="Contractor completes, record is kept"
                body="Trades see their jobs, attend, mark complete, and upload evidence. You keep a clean history for every property."
              />
            </div>
          </div>
        </section>

        {/* VALUE SECTION */}
        <section className="bg-slate-950 text-slate-50">
          <div className="max-w-6xl mx-auto px-4 py-10 md:py-12 grid gap-8 md:grid-cols-[1.2fr,0.8fr] items-center">
            <div>
              <p className="text-xs tracking-[0.25em] text-slate-400 mb-2">
                WHY PROPTI
              </p>
              <h2 className="text-xl md:text-2xl font-semibold mb-3">
                Built by people who actually manage properties.
              </h2>
              <p className="text-sm text-slate-300 mb-4 max-w-xl">
                Propti started as a way to handle maintenance more cleanly
                inside a real lettings business. Every screen you see comes from
                real-world jobs, angry tenants and late-night landlord calls.
              </p>
              <ul className="text-xs text-slate-200 space-y-1.5">
                <li>• Designed around UK lettings and tenancies</li>
                <li>• Works whether the landlord is hands-on or hands-off</li>
                <li>• Gives trades a simple, mobile-friendly job view</li>
              </ul>
            </div>

            <div className="space-y-3">
              <MiniStat
                icon={<ShieldCheck size={16} />}
                title="Maintenance-first, not CRM-first"
                body="Propti sits alongside your CRM or spreadsheets – it doesn’t try to replace your whole stack."
              />
              <MiniStat
                icon={<MessageSquare size={16} />}
                title="Fewer chasing messages"
                body="Everyone checks the same source of truth instead of going hunting through WhatsApp and email chains."
              />
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-slate-400">
            © {new Date().getFullYear()} Propti – maintenance-first property workflows.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
            <Link
              href="/portals"
              className="hover:text-slate-700 underline-offset-2 hover:underline"
            >
              View demo portals
            </Link>
            <span className="hidden sm:inline">·</span>
            <Link
              href="/legal/privacy"
              className="hover:text-slate-700 underline-offset-2 hover:underline"
            >
              Privacy Policy
            </Link>
            <span className="hidden sm:inline">·</span>
            <Link
              href="/legal/cookie-policy"
              className="hover:text-slate-700 underline-offset-2 hover:underline"
            >
              Cookie Policy
            </Link>
            <span className="hidden sm:inline">·</span>
            <Link
              href="/legal/landlord-terms"
              className="hover:text-slate-700 underline-offset-2 hover:underline"
            >
              Landlord Terms
            </Link>
            <span className="hidden sm:inline">·</span>
            <Link
              href="/legal/tenant-terms"
              className="hover:text-slate-700 underline-offset-2 hover:underline"
            >
              Tenant Terms
            </Link>
            <span className="hidden sm:inline">·</span>
            <Link
              href="/legal/contractor-agreement"
              className="hover:text-slate-700 underline-offset-2 hover:underline"
            >
              Contractor Agreement
            </Link>
            <span className="hidden sm:inline">·</span>
            <Link
              href="/legal/dpa"
              className="hover:text-slate-700 underline-offset-2 hover:underline"
            >
              DPA
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  body: string;
}

function FeatureCard({ icon, title, body }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="h-9 w-9 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600">
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
          <p className="text-xs text-slate-500 mt-1">{body}</p>
        </div>
      </div>
    </div>
  );
}

interface StepCardProps {
  step: string;
  title: string;
  body: string;
}

function StepCard({ step, title, body }: StepCardProps) {
  return (
    <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 h-full">
      <div className="flex items-center gap-2 mb-2">
        <span className="h-6 w-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center">
          {step}
        </span>
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      </div>
      <p className="text-xs text-slate-500">{body}</p>
    </div>
  );
}

interface MiniStatProps {
  icon: React.ReactNode;
  title: string;
  body: string;
}

function MiniStat({ icon, title, body }: MiniStatProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center text-slate-50">
        {icon}
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-50">{title}</p>
        <p className="text-[11px] text-slate-300">{body}</p>
      </div>
    </div>
  );
}
