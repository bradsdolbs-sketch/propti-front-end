import { useState, FormEvent } from "react";
import TenantLayout from "../../../layouts/TenantLayout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

export default function TenantSettingsPage() {
  const [email, setEmail] = useState("danise@example.com");
  const [phone, setPhone] = useState("+44...");
  const [allowSms, setAllowSms] = useState(true);
  const [allowEmail, setAllowEmail] = useState(true);
  const [saved, setSaved] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <TenantLayout>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Settings</h1>
          <p className="text-slate-500 text-sm">
            Manage how Propti contacts you about maintenance.
          </p>
        </div>

        {saved && (
          <div className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800">
            Preferences saved (demo only).
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Contact details</CardTitle>
            <CardDescription>
              We&apos;ll use these to keep you updated about your requests.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email address
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Mobile number
              </label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+44..."
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Choose how you&apos;d like to hear from us.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-slate-300"
                checked={allowEmail}
                onChange={(e) => setAllowEmail(e.target.checked)}
              />
              <span>
                <span className="block text-sm font-medium text-slate-800">
                  Email updates
                </span>
                <span className="block text-xs text-slate-500">
                  When a landlord or contractor updates your request.
                </span>
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-slate-300"
                checked={allowSms}
                onChange={(e) => setAllowSms(e.target.checked)}
              />
              <span>
                <span className="block text-sm font-medium text-slate-800">
                  SMS for urgent jobs
                </span>
                <span className="block text-xs text-slate-500">
                  For example, when an engineer is on the way.
                </span>
              </span>
            </label>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit">Save preferences</Button>
        </div>
      </form>
    </TenantLayout>
  );
}
