import { FormEvent, useEffect, useState } from "react";
import LandlordLayout from "../../../layouts/LandlordLayout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { api } from "../../../lib/api";

export default function LandlordSettingsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [autoApproveLimit, setAutoApproveLimit] = useState("");
  const [preferredComm, setPreferredComm] = useState("");
  const [notifUrgent, setNotifUrgent] = useState(false);
  const [notifCompleted, setNotifCompleted] = useState(false);
  const [notifInvoices, setNotifInvoices] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let cancelled = false;
    api
      .getCurrentUser()
      .then((me) => {
        if (cancelled) return;
        if (me?.name) setName(me.name);
        if (me?.email) setEmail(me.email);
        if (me?.phone) setPhone(me.phone);
        if (me?.companyName) setCompany(me.companyName);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await api.updateMyProfile({
        name,
        phone,
        email,
        companyName: company,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setSaved(false);
    }
  }

  return (
    <LandlordLayout>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Settings</h1>
          <p className="text-slate-500 text-sm">
            Manage how Propti works for you as a landlord.
          </p>
        </div>

        {saved && (
          <div className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800">
            Settings saved (demo only). In production this would update your
            live preferences.
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {/* Account details */}
          <Card>
            <CardHeader>
              <CardTitle>Account details</CardTitle>
              <CardDescription>
                Basic information about your landlord profile.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Name
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Contact email
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Contact phone
                </label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+44..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Company name
                </label>
                <Input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Company"
                />
              </div>
            </CardContent>
          </Card>

          {/* Maintenance preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Maintenance preferences</CardTitle>
              <CardDescription>
                How Propti should handle requests by default.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-slate-500 mb-1">
                  Auto-approve low-cost jobs
                </p>
                <label className="block text-sm text-slate-700 mb-1">
                  Auto-approve up to
                </label>
                <Input
                  type="number"
                  min={0}
                  value={autoApproveLimit}
                  onChange={(e) => setAutoApproveLimit(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Preferred communication
                </label>
                <Input
                  value={preferredComm}
                  onChange={(e) => setPreferredComm(e.target.value)}
                  placeholder="Email, SMS, etc."
                />
                <p className="text-xs text-slate-500 mt-1">
                  In a full version, you&apos;d be able to choose between email,
                  SMS, and in-app notifications.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Billing + notifications */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Billing & invoices</CardTitle>
              <CardDescription>
                Configure how you are billed for maintenance.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-slate-600">
                Default payment method: <span className="font-medium">
                  Card ending •••• 1234
                </span>
              </p>
              <p className="text-xs text-slate-500">
                Stripe / GoCardless integration will sit behind this in the live
                product.
              </p>
              <Button variant="outline" type="button">
                Manage payment methods (demo)
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Control when we contact you about jobs.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <ToggleRow
                label="Urgent requests"
                description="Notify when tenants submit urgent requests."
                checked={notifUrgent}
                onChange={setNotifUrgent}
              />
              <ToggleRow
                label="Job completion"
                description="Notify when a contractor marks a job as completed."
                checked={notifCompleted}
                onChange={setNotifCompleted}
              />
              <ToggleRow
                label="Invoices & billing"
                description="Notify when invoices are created or paid."
                checked={notifInvoices}
                onChange={setNotifInvoices}
              />
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end">
          <Button type="submit">Save changes</Button>
        </div>
      </form>
    </LandlordLayout>
  );
}

interface ToggleRowProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}

function ToggleRow({ label, description, checked, onChange }: ToggleRowProps) {
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <input
        type="checkbox"
        className="mt-1 h-4 w-4 rounded border-slate-300"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span>
        <span className="block text-sm font-medium text-slate-800">
          {label}
        </span>
        <span className="block text-xs text-slate-500">{description}</span>
      </span>
    </label>
  );
}
