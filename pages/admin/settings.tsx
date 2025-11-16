import AdminLayout from "../../layouts/AdminLayout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export default function AdminSettingsPage() {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">
          Platform settings
        </h1>
        <p className="text-slate-500 text-sm">
          Internal configuration for how Propti operates across all landlords,
          tenants, and contractors.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Branding / org */}
        <Card>
          <CardHeader>
            <CardTitle>Branding & organisation</CardTitle>
            <CardDescription>
              How Propti is presented to landlords and tenants.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-slate-700">
            <div className="space-y-1">
              <p className="text-xs text-slate-500">Platform name</p>
              <Input defaultValue="Propti" />
            </div>
            <div className="space-y-1">
              <p className="text-xs text-slate-500">Primary colour</p>
              <Input defaultValue="#0F172A" />
            </div>
            <p className="text-xs text-slate-500">
              In production this is where you&apos;d upload logos and tweak colour
              themes for white-labelled landlord portals.
            </p>
            <Button disabled>Save branding (coming soon)</Button>
          </CardContent>
        </Card>

        {/* AI triage */}
        <Card>
          <CardHeader>
            <CardTitle>AI triage settings</CardTitle>
            <CardDescription>
              Control how aggressively AI suggests categories, priorities, and
              pricing.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-slate-700">
            <div>
              <p className="font-medium">Triage mode</p>
              <p className="text-xs text-slate-500 mt-1">
                For now this is just a mock – later it will map to your actual
                OpenAI / model config.
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-slate-500">Model behaviour</p>
              <Input defaultValue="Conservative – landlord must approve" />
            </div>
            <div className="space-y-1">
              <p className="text-xs text-slate-500">Default max spend AI can approve</p>
              <Input defaultValue="£120" />
            </div>
            <Button variant="outline" disabled>
              Update AI settings (coming soon)
            </Button>
          </CardContent>
        </Card>

        {/* SLAs */}
        <Card>
          <CardHeader>
            <CardTitle>SLAs & response times</CardTitle>
            <CardDescription>
              Global targets for first response and time to attend.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-700">
            <div className="space-y-1">
              <p className="text-xs text-slate-500">
                Urgent – first response target
              </p>
              <Input defaultValue="2 hours" />
            </div>
            <div className="space-y-1">
              <p className="text-xs text-slate-500">
                Standard – first response target
              </p>
              <Input defaultValue="24 hours" />
            </div>
            <p className="text-xs text-slate-500">
              In a full build, breaching these targets could trigger alerts in
              the admin dashboard.
            </p>
            <Button variant="outline" disabled>
              Save SLA targets (coming soon)
            </Button>
          </CardContent>
        </Card>

        {/* System / environment */}
        <Card>
          <CardHeader>
            <CardTitle>System environment</CardTitle>
            <CardDescription>
              High-level configuration for the Propti environment.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-700">
            <div className="space-y-1">
              <p className="text-xs text-slate-500">Environment</p>
              <Input defaultValue="Sandbox / Demo" />
            </div>
            <div className="space-y-1">
              <p className="text-xs text-slate-500">Default timezone</p>
              <Input defaultValue="Europe/London" />
            </div>
            <p className="text-xs text-slate-500">
              Eventually this links to feature flags, maintenance windows, and
              per-region deployments.
            </p>
            <Button variant="outline" disabled>
              Manage advanced config (coming soon)
            </Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
