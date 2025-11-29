import ContractorLayout from "../layouts/ContractorLayout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { contractors } from "../lib/mockData";

const CURRENT_CONTRACTOR_ID = "CON-001";

export default function ContractorSettingsPage() {
  const contractor = contractors.find((c) => c.id === CURRENT_CONTRACTOR_ID);

  return (
    <ContractorLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">Settings</h1>
        <p className="text-slate-500 text-sm">
          Manage your company details and how you receive work from Propti.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Company details */}
        <Card>
          <CardHeader>
            <CardTitle>Company profile</CardTitle>
            <CardDescription>
              The details landlords see when they choose you for a job.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-slate-700">
            <div className="space-y-1">
              <p className="text-xs text-slate-500">Trading name</p>
              <Input defaultValue={contractor?.company ?? "Your company"} />
            </div>
            <div className="space-y-1">
              <p className="text-xs text-slate-500">Contact email</p>
              <Input placeholder="jobs@yourcompany.com" />
            </div>
            <div className="space-y-1">
              <p className="text-xs text-slate-500">Contact phone</p>
              <Input placeholder="+44..." />
            </div>
            <div className="space-y-1">
              <p className="text-xs text-slate-500">Trades</p>
              <Input defaultValue={contractor?.trades ?? ""} />
            </div>
            <Button disabled>Save changes (coming soon)</Button>
          </CardContent>
        </Card>

        {/* Coverage & notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Coverage & notifications</CardTitle>
            <CardDescription>
              Tell Propti where you work and how you want to be contacted.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-slate-700">
            <div className="space-y-1">
              <p className="text-xs text-slate-500">Coverage areas</p>
              <Input
                defaultValue={contractor?.coverage ?? "E1, E2, EC1, EC2"}
              />
              <p className="text-[11px] text-slate-500">
                In a full build, this would filter which jobs you see as offers.
              </p>
            </div>

            <div>
              <p className="font-medium mb-1">Notification preferences</p>
              <p className="text-[11px] text-slate-500 mb-2">
                Decide how Propti lets you know about new offers and changes.
              </p>
              <ul className="text-[11px] text-slate-500 list-disc ml-4 space-y-1">
                <li>New job offers in your area</li>
                <li>Changes to booked time slots</li>
                <li>Jobs marked as completed / disputed</li>
              </ul>
            </div>

            <Button variant="outline" disabled>
              Configure notifications (coming soon)
            </Button>
          </CardContent>
        </Card>
      </div>
    </ContractorLayout>
  );
}
