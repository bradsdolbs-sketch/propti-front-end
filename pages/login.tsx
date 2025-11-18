import Link from "next/link";
import { useRouter } from "next/router";
import SignupForm from "./auth/signup-forms";
import { Button } from "../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";
import {
  ArrowRight,
  Building2,
  Briefcase,
  KeyRound,
  UserRound,
  Wrench,
} from "lucide-react";

const portals = [
  {
    id: "landlord-plus",
    label: "Landlord Plus portal",
    description: "Automated portfolio and maintenance workspace.",
    href: "/landlord",
    icon: <Building2 size={18} />,
  },
  {
    id: "agent",
    label: "Agent portal",
    description: "Coordinate maintenance and tenancies across landlords.",
    href: "/agent",
    icon: <Briefcase size={18} />,
  },
  {
    id: "owner",
    label: "Owner portal",
    description: "Single-property view for linked landlords.",
    href: "/owner",
    icon: <KeyRound size={18} />,
  },
  {
    id: "tenant",
    label: "Tenant portal",
    description: "Report and track maintenance progress.",
    href: "/tenant",
    icon: <UserRound size={18} />,
  },
  {
    id: "contractor",
    label: "Contractor portal",
    description: "Receive jobs, manage visits, and mark work complete.",
    href: "/contractor",
    icon: <Wrench size={18} />,
  },
];

export default function LoginPage() {
  const { query } = useRouter();
  const selectedPortal = (query.portal as string) ?? "";

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[1.1fr,0.9fr]">
        <section>
          <p className="text-xs tracking-[0.25em] text-slate-400 mb-3">PROPTI</p>
          <h1 className="text-3xl font-semibold text-slate-900 mb-3">
            Welcome back
          </h1>
          <p className="text-sm text-slate-500 max-w-xl">
            In the production app you&apos;d authenticate with email, password, or SSO.
            For this preview, choose which workspace you want to explore and we’ll
            sign you straight in.
          </p>

          <div className="mt-8 space-y-3">
            {portals.map((portal) => (
              <PortalCard
                key={portal.id}
                active={portal.id === selectedPortal}
                {...portal}
              />
            ))}
          </div>

          <Card className="mt-10 border-slate-200 bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-xl text-slate-900">
                Need an account?
              </CardTitle>
              <CardDescription className="text-sm text-slate-500">
                Drop your details and we&apos;ll spin up the right workspace. We
                post straight to{" "}
                <span className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">
                  {process.env.NEXT_PUBLIC_API_URL}/api/auth/register
                </span>
                .
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SignupForm defaultRole={selectedPortal || "landlord-plus"} />
            </CardContent>
          </Card>
        </section>

        <Card className="border-slate-200 bg-white shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl text-slate-900">
              Sign in to continue
            </CardTitle>
            <CardDescription className="text-slate-500">
              Email / password and SSO will live here when authentication is wired up.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <Button className="w-full" variant="outline" disabled>
              Email sign-in coming soon
            </Button>
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 space-y-3">
              <p className="text-sm font-medium text-slate-900">
                Need an account?
              </p>
              <p className="text-sm text-slate-500">
                Tell us which role fits you best and we’ll get your workspace ready.
              </p>
              <Link href="/signup" className="block">
                <Button className="w-full">Create a Propti account</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

type PortalCardProps = {
  id: string;
  label: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  active?: boolean;
};

function PortalCard({ href, label, description, icon, active }: PortalCardProps) {
  return (
    <Link href={href}>
      <Card
        className={`group border transition-all ${
          active
            ? "border-slate-900 bg-white shadow-lg"
            : "border-slate-200 bg-white hover:border-slate-900 hover:shadow-lg"
        }`}
      >
        <div className="flex items-center gap-4 px-5 py-4">
          <span
            className={`flex h-10 w-10 items-center justify-center rounded-full ${
              active ? "bg-slate-900 text-slate-50" : "bg-slate-100 text-slate-700"
            }`}
          >
            {icon}
          </span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-900">{label}</p>
            <p className="text-xs text-slate-500">{description}</p>
          </div>
          <ArrowRight
            size={16}
            className={`transition ${
              active ? "text-slate-900" : "text-slate-400 group-hover:text-slate-900"
            }`}
          />
        </div>
      </Card>
    </Link>
  );
}
