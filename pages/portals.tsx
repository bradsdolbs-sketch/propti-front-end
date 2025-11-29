import Link from "next/link";
import {
  Building2,
  UserRound,
  Wrench,
  ShieldCheck,
  Home,
  Briefcase,
} from "lucide-react";
import { setStoredRole, type PortalRole } from "../lib/auth";

export default function PortalChooserPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-6xl py-16">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.25em] text-slate-400 mb-3">
            PROPTI
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-3">
            Maintenance, done properly.
          </h1>
          <p className="text-sm md:text-base text-slate-500 max-w-2xl mx-auto">
            Choose a portal to preview how Propti works for landlords, owners,
            tenants, contractors, agents, and your internal admin team.
          </p>
        </div>

        {/* GRID OF PORTALS */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {/* Landlord portal */}
          <PortalCard
            title="Landlord portal"
            description="Approve requests, assign contractors, see billing."
            metaTitle="Demo user: Central Gate Estates"
            metaBody="Properties, requests, billing and settings."
          href="/landlord"
          cta="Enter"
          icon={<Building2 className="h-5 w-5" />}
          role="landlord"
        />

          {/* Tenant portal */}
          <PortalCard
            title="Tenant portal"
            description="Raise issues, track progress, see job history."
            metaTitle="Demo property: 22 Anthony House"
            metaBody="AI triage, requests and status updates."
          href="/tenant"
          cta="Enter"
          icon={<UserRound className="h-5 w-5" />}
          role="tenant"
        />

          {/* Contractor portal */}
          <PortalCard
            title="Contractor portal"
            description="View offers, booked jobs, and mark work complete."
            metaTitle="Demo company: ABC Plumbing"
            metaBody="Jobs list and job details."
          href="/contractor"
          cta="Enter"
          icon={<Wrench className="h-5 w-5" />}
          role="contractor"
        />

          {/* Admin console */}
          <PortalCard
            title="Admin console"
            description="Cross-platform view of jobs, landlords and contractors."
            metaTitle="Demo environment: Sandbox"
            metaBody="Jobs, landlords, people, and settings."
          href="/admin"
          cta="Enter"
          icon={<ShieldCheck className="h-5 w-5" />}
          role="admin"
        />

          {/* Owner portal */}
          <PortalCard
            title="Owner portal"
            description="Single-property view for individual landlords."
            metaTitle="Demo owner: 22 Anthony House"
            metaBody="Approve work, see history, access documents."
          href="/owner"
          cta="Enter"
          icon={<Home className="h-5 w-5" />}
          role="owner"
        />

          {/* Agent portal */}
          <PortalCard
            title="Agent portal"
            description="Manage tenancies, coordinate maintenance, and keep everyone updated."
            metaTitle="Demo agency: Central Gate Estates"
            metaBody="Tenancies, landlords, tenants, and references."
          href="/agent"
          cta="Enter"
          icon={<Briefcase className="h-5 w-5" />}
          role="agent"
        />
        </div>

        <p className="mt-10 text-center text-xs text-slate-400">
          🔒 Demo environment – no real data, no real charges. Propti · Built
          for maintenance-first property management.
        </p>
      </div>
    </div>
  );
}


interface PortalCardProps {
  title: string;
  description: string;
  metaTitle: string;
  metaBody: string;
  href: string;
  cta: string;
  icon: React.ReactNode;
  role?: PortalRole;
}

function PortalCard({
  title,
  description,
  metaTitle,
  metaBody,
  href,
  cta,
  icon,
  role,
}: PortalCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          <p className="text-sm text-slate-500 mt-1">{description}</p>
        </div>
        <div className="h-9 w-9 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500">
          {icon}
        </div>
      </div>

      <div className="flex items-end justify-between gap-4 mt-2">
        <div>
          <p className="text-xs font-medium text-slate-500">{metaTitle}</p>
          <p className="text-xs text-slate-400">{metaBody}</p>
        </div>
        <Link
          href={href}
          onClick={() => {
            if (role) {
              setStoredRole(role);
            }
          }}
        >
          <button className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-medium">
            {cta}
          </button>
        </Link>
      </div>
    </div>
  );
}
