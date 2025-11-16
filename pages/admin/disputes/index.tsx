import AdminLayout from "../../../layouts/AdminLayout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../components/ui/card";

export default function AdminDisputesPage() {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">
          Disputes & Resolution
        </h1>
        <p className="text-sm text-slate-500">
          Manage platform disputes and issues.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Open Disputes</CardTitle>
          <CardDescription>Nothing to review right now.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-40 rounded-lg border border-dashed border-slate-200 flex flex-col items-center justify-center text-sm text-slate-400 gap-2">
            <span className="text-3xl">✅</span>
            <p>No open disputes</p>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
