import TenantLayout from "../../../layouts/TenantLayout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";

export default function TenantDashboard() {
  return (
    <TenantLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Tenant Dashboard</h1>
          <p className="text-slate-500 text-sm">
            Track your maintenance requests and property updates.
          </p>
        </div>
        <Button>Create new request</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Open requests</CardTitle>
            <CardDescription>Waiting to be resolved</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">2</p>
            <p className="text-xs text-slate-500 mt-1">1 urgent · 1 standard</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming visits</CardTitle>
            <CardDescription>Confirmed contractor visits</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">1</p>
            <p className="text-xs text-slate-500 mt-1">Tomorrow morning</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your property</CardTitle>
            <CardDescription>Managed by Central Gate Estates</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-700">
              22 Anthony House, Pembury Place, London E5 8GZ
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Landlord: Central Gate Estates
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent updates</CardTitle>
            <CardDescription>
              Latest activity across your requests.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-700">
            <p>
              <span className="font-medium">Today, 14:15</span> – Landlord
              reviewed your boiler request.
            </p>
            <p>
              <span className="font-medium">Yesterday, 10:05</span> – Contractor
              marked kitchen leak as completed.
            </p>
            <p>
              <span className="font-medium">2 days ago</span> – You created a
              request about heating not working.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status overview</CardTitle>
            <CardDescription>
              Quick glance at your current requests.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-700">
            <div className="flex items-center justify-between">
              <span>Awaiting landlord approval</span>
              <Badge variant="warning">1</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Contractor booked</span>
              <Badge variant="default">1</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Recently completed</span>
              <Badge variant="success">3</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </TenantLayout>
  );
}
