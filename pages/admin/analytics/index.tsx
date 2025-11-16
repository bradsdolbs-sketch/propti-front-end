import AdminLayout from "../../../layouts/AdminLayout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../components/ui/card";

export default function AdminAnalyticsPage() {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">
          Analytics & Insights
        </h1>
        <p className="text-sm text-slate-500">
          Deep platform analytics and performance metrics.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Commission</CardTitle>
            <CardDescription>Platform revenue (10%)</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">£0</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Avg Job Value</CardTitle>
            <CardDescription>0 completed jobs</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">£0</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Contractors</CardTitle>
            <CardDescription>Verified</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">4</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Requests</CardTitle>
            <CardDescription>All time</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">3</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Commission Revenue</CardTitle>
          <CardDescription>Placeholder chart (frontend only)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-48 rounded-lg border border-dashed border-slate-200 flex items-center justify-center text-sm text-slate-400">
            Chart coming later when we hook up real data
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
