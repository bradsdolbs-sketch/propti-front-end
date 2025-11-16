import AgentLayout from "../../../layouts/AgentLayout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

export default function AgentSettingsPage() {
  return (
    <AgentLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">Agent settings</h1>
        <p className="text-slate-500 text-sm">
          Workspace-level settings for your agency in Propti.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Agency profile */}
        <Card>
          <CardHeader>
            <CardTitle>Agency profile</CardTitle>
            <CardDescription>
              Basic details shown to landlords, tenants and contractors.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Agency name
              </label>
              <Input defaultValue="Central Gate Estates" disabled />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Support email
              </label>
              <Input defaultValue="support@centralgateestates.com" disabled />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Main phone number
              </label>
              <Input defaultValue="+44 20 xxxx xxxx" disabled />
            </div>

            <Button size="sm" disabled>
              Save changes (demo only)
            </Button>
          </CardContent>
        </Card>

        {/* Maintenance defaults */}
        <Card>
          <CardHeader>
            <CardTitle>Maintenance defaults</CardTitle>
            <CardDescription>
              How your team handles new issues by default.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <p className="text-xs font-medium text-slate-600 mb-1">
                Default approval note
              </p>
              <textarea
                className="w-full border border-slate-200 rounded-md p-2 text-sm bg-slate-50"
                rows={3}
                disabled
                defaultValue="We'll triage urgent issues immediately and contact your contractor network or our preferred suppliers."
              />
            </div>

            <div>
              <p className="text-xs font-medium text-slate-600 mb-1">
                Emergency definition (internal)
              </p>
              <textarea
                className="w-full border border-slate-200 rounded-md p-2 text-sm bg-slate-50"
                rows={3}
                disabled
                defaultValue="No heating in winter, active water leaks, unsafe electrics, or anything posing immediate risk to health or safety."
              />
              <p className="text-[11px] text-slate-400 mt-1">
                In a full build this could sync to tenant/landlord messaging so expectations are clear.
              </p>
            </div>

            <Button size="sm" disabled>
              Update defaults (demo only)
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Notification & escalation rules */}
      <div className="mt-6 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Notifications & escalation</CardTitle>
            <CardDescription>
              How your team wants to be kept in the loop on live issues.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <input type="checkbox" defaultChecked disabled className="mt-1" />
              <div>
                <p className="font-medium text-slate-800">
                  Email digest of open requests each morning
                </p>
                <p className="text-xs text-slate-500">
                  Summary by property, priority and status to start the day.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <input type="checkbox" defaultChecked disabled className="mt-1" />
              <div>
                <p className="font-medium text-slate-800">
                  Immediate email for urgent issues
                </p>
                <p className="text-xs text-slate-500">
                  Any request marked as &quot;Urgent&quot; sends a notification to your
                  maintenance inbox.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <input type="checkbox" defaultChecked disabled className="mt-1" />
              <div>
                <p className="font-medium text-slate-800">
                  Escalate if no action in 24 hours
                </p>
                <p className="text-xs text-slate-500">
                  In a full version this could create tasks or notify a manager if
                  requests stagnate.
                </p>
              </div>
            </div>

            <Button size="sm" disabled className="mt-2">
              Save notification settings (demo only)
            </Button>
          </CardContent>
        </Card>
      </div>
    </AgentLayout>
  );
}
