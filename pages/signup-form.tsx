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
import { ArrowLeft } from "lucide-react";

const roleLabels: Record<string, string> = {
  "landlord-plus": "Landlord Plus",
  owner: "Owner",
  agent: "Agent",
  tenant: "Tenant",
  contractor: "Contractor",
};

export default function SignupFormPage() {
  const { query } = useRouter();
  const selectedPortal = (query.portal as string) || "landlord-plus";
  const roleLabel = roleLabels[selectedPortal] ?? "Landlord Plus";

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl space-y-8">
        <header>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
            >
              <ArrowLeft size={14} />
              Home
            </Link>
            <Link
              href={`/signup?portal=${selectedPortal}`}
              className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
            >
              <ArrowLeft size={14} />
              Back to role selection
            </Link>
          </div>
          <p className="text-xs tracking-[0.25em] text-slate-400 mt-4 mb-2">
            PROPTI
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">
            Create your Propti account
          </h1>
          <p className="text-sm text-slate-500 mt-2 max-w-2xl">
            You chose the {roleLabel} portal. Drop your details and we will set up
            the right workspace for you.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1fr,0.95fr] items-start">
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-slate-900">
                What happens next
              </CardTitle>
              <CardDescription className="text-sm text-slate-500">
                We tailor your workspace to the role you chose. Share your details
                and we&apos;ll prepare the right access for you.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600">
              <ul className="space-y-1 list-disc list-inside">
                <li>We set up your workspace with the right permissions.</li>
                <li>Security checks run in the background while we finish setup.</li>
                <li>We email you when everything is ready to use.</li>
              </ul>
              <div>
                <p className="text-xs text-slate-500">
                  Picked the wrong role?{" "}
                  <Link
                    href="/signup"
                    className="font-semibold text-slate-700 hover:text-slate-900"
                  >
                    Choose again
                  </Link>
                  .
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-slate-900">
                Create your account
              </CardTitle>
              <CardDescription className="text-sm text-slate-500">
                All fields are required.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SignupForm key={selectedPortal} defaultRole={selectedPortal} />
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-xs text-slate-500">
            All rights reserved &copy; 2025 Propti
          </p>
          <Link href="/signup">
            <Button variant="outline" size="sm">
              Switch role
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
