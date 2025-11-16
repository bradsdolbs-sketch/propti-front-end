import TenantLayout from "../../layouts/TenantLayout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { tenants, properties } from "../../lib/mockData";

const CURRENT_TENANT_ID = "T-1001";

export default function TenantSettingsPage() {
  const tenant = tenants.find((t) => t.id === CURRENT_TENANT_ID);
  const property = tenant
    ? properties.find((p) => p.id === tenant.propertyId)
    : undefined;

  return (
    <TenantLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">Settings</h1>
        <p className="text-slate-500 text-sm">
          Manage your contact details and how Propti keeps you updated.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Profile details */}
        <Card>
          <CardHeader>
            <CardTitle>Your details</CardTitle>
            <CardDescription>
              This is how your landlord and contractors see you in Propti.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-slate-700">
            <div className="space-y-1">
              <p className="text-xs text-slate-500">Name</p>
              <Input defaultValue={tenant?.name ?? "Tenant name"} />
            </div>
            <div className="space-y-1">
              <p className="text-xs text-slate-500">Email</p>
              <Input placeholder="you@example.com" />
            </div>
            <div className="space-y-1">
              <p className="text-xs text-slate-500">Phone</p>
              <Input placeholder="+44..." />
            </div>
            <Button disabled>Save changes (coming soon)</Button>
          </CardContent>
        </Card>

        {/* Property & notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Property & notifications</CardTitle>
            <CardDescription>
              Confirm where you&apos;re living and how you want to be contacted.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-slate-700">
            <div>
              <p className="text-xs text-slate-500 mb-1">Current property</p>
              <p className="font-medium">
                {property
                  ? `${property.name}, ${property.postcode}`
                  : "Linked property in Propti"}
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                In a full build, this would come from your tenancy record and
                you&apos;d contact support to change it.
              </p>
            </div>

            <div>
              <p className="font-medium mb-1">Notification preferences</p>
              <p className="text-[11px] text-slate-500 mb-2">
                Decide how Propti should let you know when things happen.
              </p>
              <ul className="text-[11px] text-slate-500 list-disc ml-4 space-y-1">
                <li>New updates on your requests</li>
                <li>When a contractor is booked</li>
                <li>When a job is completed</li>
              </ul>
            </div>

            <Button variant="outline" disabled>
              Configure notifications (coming soon)
            </Button>
          </CardContent>
        </Card>
      </div>
    </TenantLayout>
  );
}
