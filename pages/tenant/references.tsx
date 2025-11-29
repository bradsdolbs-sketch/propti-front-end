import Link from "next/link";
import { useState, FormEvent } from "react";
import TenantLayout from "../../layouts/TenantLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

export default function TenantReferencesPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <TenantLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">References</h1>
            <p className="text-sm text-slate-500">
              Basic placeholder form — we&apos;ll expand this later.
            </p>
          </div>
          <Link href="/tenant">
            <Button variant="outline" size="sm">
              Back to dashboard
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Provide your details</CardTitle>
            <CardDescription>
              Share simple info so your landlord/agent can progress the tenancy. This is a demo only.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="rounded-md bg-green-50 border border-green-200 px-3 py-2 text-sm text-green-800">
                Submitted (demo). In a real build this would trigger checks and update your status.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Full name
                  </label>
                  <input
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Employer / Income details
                  </label>
                  <textarea
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200"
                    rows={3}
                    placeholder="Where you work, income, or guarantor info (demo)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Right-to-rent notes
                  </label>
                  <textarea
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200"
                    rows={2}
                    placeholder="e.g., passport provided, visa status (demo)"
                  />
                </div>
                <div className="flex justify-end">
                  <Button type="submit">Submit references (demo)</Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </TenantLayout>
  );
}
