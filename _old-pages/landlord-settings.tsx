import LandlordLayout from "../layouts/LandlordLayout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

export default function LandlordSettingsPage() {
  return (
    <LandlordLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">Settings</h1>
        <p className="text-slate-500 text-sm">
          Manage how Propti works for you as a landlord.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Account details */}
        <Card>
          <CardHeader>
            <CardTitle>Account details</CardTitle>
            <CardDescription>
              Basic information about your landlord profile.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-slate-700">
            <div className="space-y-1">
              <p className="text-xs text-slate-500">Name</p>
              <Input defaultValue="Central Gate Estates" />
            </div>
            <div className="space-y-1">
              <p className="text-xs text-slate-500">Contact email</p>
              <Input defaultValue="info@centralgateestates.com" />
            </div>
            <div className="space-y-1">
              <p className="text-xs text-slate-500">Contact phone</p>
              <Input placeholder="+44..." />
            </div>
            <Button disabled>Save changes (coming soon)</Button>
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
          <CardContent className="space-y-4 text-sm text-slate-700">
            <div>
              <p className="font-medium">Auto-approve low-cost jobs</p>
              <p className="text-xs text-slate-500 mt-1">
                For example, anything under £100 for existing tenants.
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-slate-500">Auto-approve up to</p>
              <Input defaultValue="£100" />
            </div>

            <div>
              <p className="font-medium">Preferred communication</p>
              <p className="text-xs text-slate-500 mt-1">
                In a full version, you’ll choose between email, SMS, and app
                notifications.
              </p>
            </div>

            <Button variant="outline" disabled>
              Update preferences (coming soon)
            </Button>
          </CardContent>
        </Card>

        {/* Billing & invoices */}
        <Card>
          <CardHeader>
            <CardTitle>Billing & invoices</CardTitle>
            <CardDescription>
              Configure how you are billed for maintenance.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-700">
            <p>
              <span className="font-medium">Default payment method:</span>{" "}
              Card ending •••• 1234
            </p>
            <p className="text-xs text-slate-500">
              Stripe / GoCardless integration would live behind this.
            </p>
            <Button variant="outline" disabled>
              Manage payment methods (coming soon)
            </Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Control when we contact you about jobs.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-700">
            <p>
              We’ll notify you when tenants submit{" "}
              <span className="font-medium">urgent</span> requests, when jobs
              are completed, and when invoices are created.
            </p>
            <p className="text-xs text-slate-500">
              Later this can become a full toggle matrix (email / SMS / app) per
              event type.
            </p>
            <Button variant="outline" disabled>
              Configure notifications (coming soon)
            </Button>
          </CardContent>
        </Card>
      </div>
    </LandlordLayout>
  );
}
