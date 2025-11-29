import Link from "next/link";
import { Button } from "../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";
import {
  Building2,
  Briefcase,
  KeyRound,
  UserRound,
  Wrench,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { setStoredRole, type PortalRole } from "../lib/auth";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <p className="text-xs tracking-[0.25em] text-slate-400 mb-2">
              PROPTI
            </p>
            <Link
              href="/"
              className="text-sm text-slate-600 hover:text-slate-900 inline-flex items-center gap-2"
            >
              <ArrowLeft size={14} />
              Home
            </Link>
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">
            Create your Propti account
          </h1>
          <p className="text-sm text-slate-500 mt-2 max-w-2xl">
            Choose the type of account you need. Landlord Plus is our
            fully-automated management portal for landlords. All other account
            types are free to use. Continue to the next screen to complete the
            signup form.
          </p>
        </header>

        <div className="grid gap-4 lg:grid-cols-2">
          {/* Landlord Plus – paid plan */}
          <RoleCard
            label="Landlord Plus"
            price="£49.99 / month"
            priceNote="Automated management portal"
            description="For landlords who want Propti to act like a smart digital property manager. Approve work, track billing, automate updates to tenants and contractors."
            icon={<Building2 size={20} />}
            href="/signup-form?portal=landlord-plus"
            highlight
            bullets={[
              "Automated maintenance management",
              "Landlord dashboard across all properties",
              "Billing & job history in one place",
            ]}
            role="landlord"
          />

          {/* Owner – free */}
          <RoleCard
            label="Owner"
            price="Free"
            priceNote="Single-property owner view"
            description="For individual landlords linked to a specific property via an agent or Landlord Plus account."
            icon={<KeyRound size={20} />}
            href="/signup-form?portal=owner"
            role="owner"
            bullets={[
              "View and approve maintenance requests",
              "See property documents",
              "Simple portal for one or a few homes",
            ]}
          />

          {/* Agent – free */}
          <RoleCard
            label="Agent"
            price="Free"
            priceNote="For letting & management agents"
            description="For agencies like Central Gate Estates running tenancies and coordinating maintenance between landlords, tenants and contractors."
            icon={<Briefcase size={20} />}
            href="/signup-form?portal=agent"
            role="agent"
            bullets={[
              "Tenancy-level overviews",
              "Requests across your whole portfolio",
              "Landlord & tenant communication wrapper",
            ]}
          />

          {/* Tenant – free */}
          <RoleCard
            label="Tenant"
            price="Free"
            priceNote="For people living in the property"
            description="For tenants to report issues, share photos and track progress on maintenance without chasing via WhatsApp."
            icon={<UserRound size={20} />}
            href="/signup-form?portal=tenant"
            role="tenant"
            bullets={[
              "Log issues in a few taps",
              "Upload photos & notes",
              "See live status updates",
            ]}
          />

          {/* Contractor – free */}
          <RoleCard
            label="Contractor"
            price="Free"
            priceNote="For trades & maintenance teams"
            description="For plumbers, electricians, handymen and more to receive jobs, manage time slots and mark work as completed."
            icon={<Wrench size={20} />}
            href="/signup-form?portal=contractor"
            role="contractor"
            bullets={[
              "View job offers and bookings",
              "See property and access notes",
              "Mark jobs complete on-site",
            ]}
          />
        </div>

        <p className="text-xs text-slate-500 mt-10">
          Admin accounts are created internally only – there is no public admin
          sign-up.
        </p>
      </div>
    </div>
  );
}

interface RoleCardProps {
  label: string;
  price: string;
  priceNote: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  bullets?: string[];
  highlight?: boolean;
  role: PortalRole;
}

function RoleCard({
  label,
  price,
  priceNote,
  description,
  icon,
  href,
  bullets = [],
  highlight,
  role,
}: RoleCardProps) {
  return (
    <Card
      className={
        highlight
          ? "border-slate-900 shadow-md bg-slate-950 text-slate-50"
          : "border-slate-200 bg-white"
      }
    >
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <CardTitle className="flex items-center gap-2 text-base">
            <span
              className={
                highlight
                  ? "h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-50"
                  : "h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700"
              }
            >
              {icon}
            </span>
            <span>{label}</span>
          </CardTitle>
          <CardDescription
            className={
              highlight
                ? "mt-2 text-xs text-slate-300"
                : "mt-2 text-xs text-slate-500"
            }
          >
            {description}
          </CardDescription>
        </div>
        <div className="text-right">
          <p
            className={
              highlight
                ? "text-sm font-semibold text-slate-50"
                : "text-sm font-semibold text-slate-900"
            }
          >
            {price}
          </p>
          <p
            className={
              highlight
                ? "text-[11px] text-slate-300"
                : "text-[11px] text-slate-500"
            }
          >
            {priceNote}
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {bullets.length > 0 && (
          <ul className="text-xs space-y-1 list-disc list-inside">
            {bullets.map((b) => (
              <li
                key={b}
                className={highlight ? "text-slate-200" : "text-slate-600"}
              >
                {b}
              </li>
            ))}
          </ul>
        )}

        <div className="flex justify-end">
          <Button
            size="sm"
            className={
              highlight
                ? "text-xs flex items-center gap-1 bg-slate-50 text-slate-900 hover:bg-slate-200"
                : "text-xs flex items-center gap-1"
            }
            onClick={() => {
              setStoredRole(role);
              window.location.href = href;
            }}
          >
            Continue
            <ArrowRight size={12} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
