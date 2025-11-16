import Link from "next/link";
import { Button } from "../components/ui/button";
import { LogIn, ArrowRight } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-lg p-8 md:p-10">
        <p className="text-xs tracking-[0.25em] text-slate-400 mb-2">
          PROPTI
        </p>
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-2">
          Sign in
        </h1>
        <p className="text-sm text-slate-500 mb-6">
          In the live product, this is where email / password or SSO would live.
          For now, pick a portal to view the logged-in experience.
        </p>

        <div className="space-y-3 mb-6">
          <PortalLink href="/landlord" label="Landlord Plus portal" />
          <PortalLink href="/agent" label="Agent portal" />
          <PortalLink href="/owner" label="Owner portal" />
          <PortalLink href="/tenant" label="Tenant portal" />
          <PortalLink href="/contractor" label="Contractor portal" />
        </div>

        <p className="text-xs text-slate-500">
          Need an account?{" "}
          <Link
            href="/signup"
            className="text-blue-600 hover:underline font-medium"
          >
            Create one here
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

interface PortalLinkProps {
  href: string;
  label: string;
}

function PortalLink({ href, label }: PortalLinkProps) {
  return (
    <Link href={href}>
      <Button
        variant="outline"
        className="w-full flex items-center justify-between text-sm"
      >
        <span>{label}</span>
        <ArrowRight size={14} />
      </Button>
    </Link>
  );
}
