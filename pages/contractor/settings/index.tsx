import { useState, FormEvent } from "react";
import ContractorLayout from "../../../layouts/ContractorLayout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

export default function ContractorSettingsPage() {
  const [companyName, setCompanyName] = useState("ABC Plumbing");
  const [email, setEmail] = useState("contractor@example.com");
  const [phone, setPhone] = useState("07700 900123");
  const [calloutFee, setCalloutFee] = useState("50");
  const [hourlyRate, setHourlyRate] = useState("40");
  const [saved, setSaved] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <ContractorLayout>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Settings</h1>
          <p className="text-slate-500 text-sm">
            Update your company details, pricing, and contact preferences.
          </p>
        </div>

        {saved && (
          <div className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800">
            Settings saved (demo only). In a real build these values would drive
            offers and pricing.
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Company profile</CardTitle>
            <CardDescription>
              How landlords and tenants will see you in Propti.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Company name
              </label>
              <Input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
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
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Phone number
              </label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pricing</CardTitle>
            <CardDescription>
              These rates are shown to landlords when they book you.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Call-out fee (£)
              </label>
              <Input
                type="number"
                min={0}
                value={calloutFee}
                onChange={(e) => setCalloutFee(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Hourly rate (£)
              </label>
              <Input
                type="number"
                min={0}
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit">Save changes</Button>
        </div>
      </form>
    </ContractorLayout>
  );
}
