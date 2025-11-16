import OwnerLayout from "../../../layouts/OwnerLayout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";

export default function OwnerSettingsPage() {
  return (
    <OwnerLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">Settings</h1>
        <p className="text-slate-500 text-sm">
          Manage your contact details, notification preferences and approval
          rules.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Contact details */}
        <Card>
          <CardHeader>
            <CardTitle>Contact details</CardTitle>
            <CardDescription>
              How your agent and Propti will reach you about issues.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Full name
              </label>
              <Input defaultValue="Landlord Name" disabled />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Email
              </label>
              <Input defaultValue="landlord@example.com" disabled />
              <p className="text-[11px] text-slate-400 mt-1">
                In a full version this would be editable and verified.
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Phone number
              </label>
              <Input defaultValue="+44 7xxx xxx xxx" disabled />
            </div>

            <Button size="sm" disabled>
              Save changes (demo only)
            </Button>
          </CardContent>
        </Card>

        {/* Approval rules */}
        <Card>
          <CardHeader>
            <CardTitle>Approval rules</CardTitle>
            <CardDescription>
              How you want your agent to handle spend on your behalf.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <p className="text-xs font-medium text-slate-600 mb-1">
                Auto-approval threshold
              </p>
              <p className="text-sm text-slate-700">
                Automatically approve maintenance jobs up to:
              </p>
              <div className="mt-2 flex items-center gap-2">
                <Input
                  className="w-32"
                  defaultValue="250"
                  disabled
                  aria-label="auto approval limit"
                />
                <span className="text-sm text-slate-600">GBP</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Above this amount, your agent would request your explicit
                approval before booking contractors.
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium text-slate-600">
                Always allow emergency works
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="success">Enabled</Badge>
                <p className="text-[11px] text-slate-500">
                  Emergencies (no heating, major leak, unsafe electrics) can be
                  approved instantly by your agent.
                </p>
              </div>
            </div>

            <Button size="sm" disabled>
              Update rules (demo only)
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Notification preferences */}
      <div className="mt-6 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Notification preferences</CardTitle>
            <CardDescription>
              Choose when we should email you about maintenance activity.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                defaultChecked
                disabled
                className="mt-1"
              />
              <div>
                <p className="font-medium text-slate-800">
                  New request created
                </p>
                <p className="text-xs text-slate-500">
                  Get an email whenever a tenant reports a new issue in one of
                  your properties.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <input type="checkbox" defaultChecked disabled className="mt-1" />
              <div>
                <p className="font-medium text-slate-800">
                  Job booked with contractor
                </p>
                <p className="text-xs text-slate-500">
                  Be notified when your agent confirms a date and time with the
                  contractor.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <input type="checkbox" defaultChecked disabled className="mt-1" />
              <div>
                <p className="font-medium text-slate-800">
                  Job completed & invoice added
                </p>
                <p className="text-xs text-slate-500">
                  Get a summary and copy of the invoice once the work is marked
                  as complete.
                </p>
              </div>
            </div>

            <Button size="sm" disabled className="mt-2">
              Save notification settings (demo only)
            </Button>
          </CardContent>
        </Card>
      </div>
    </OwnerLayout>
  );
}
