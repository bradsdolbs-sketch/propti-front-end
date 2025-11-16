import { useRouter } from "next/router";
import AdminLayout from "../../../layouts/AdminLayout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import {
  maintenanceRequests,
  landlords,
  properties,
  tenants,
  contractors,
  UnifiedStatus,
  Priority,
} from "../../../lib/mockData";

function statusVariant(status: UnifiedStatus): "default" | "warning" | "success" {
  switch (status) {
    case "Awaiting Landlord":
    case "Offer":
      return "warning";
    case "Approved – Awaiting Contractor":
    case "Contractor Booked":
    case "In Progress":
      return "default";
    case "Completed":
      return "success";
  }
}

// Simple mock AI suggestion based on the existing job data.
// In the real app, this would come from your backend / OpenAI.
function getAiSuggestion(job: {
  category: string;
  priority: Priority;
  fee: string;
  description: string;
}) {
  return {
    category: job.category,
    priority: job.priority,
    estimatedFee: job.fee,
    confidence: "High",
    explanation:
      "Based on similar issues seen across the platform, the AI suggests this category, priority and fee range. In production this would be returned by the model along with confidence scores.",
  };
}

export default function AdminJobDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id !== "string") {
    return null;
  }

  const job = maintenanceRequests.find((j) => j.id === id);

  if (!job) {
    return (
      <AdminLayout>
        <h1 className="text-2xl font-semibold mb-4">Job not found</h1>
        <Button variant="outline" onClick={() => router.push("/admin/jobs")}>
          Back to jobs
        </Button>
      </AdminLayout>
    );
  }

  const landlord = landlords.find((l) => l.id === job.landlordId);
  const property = properties.find((p) => p.id === job.propertyId);
  const tenant = tenants.find((t) => t.id === job.tenantId);
  const contractor = job.contractorId
    ? contractors.find((c) => c.id === job.contractorId)
    : undefined;

  const aiSuggestion = getAiSuggestion(job);

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold">Job details</h1>
          <p className="text-sm text-slate-500">{job.id}</p>
        </div>
        <Button variant="outline" onClick={() => router.push("/admin/jobs")}>
          Back to jobs
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr,1.2fr]">
        {/* Left: Job Info + Description */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{job.issueTitle}</CardTitle>
              <CardDescription>
                {property
                  ? `${property.name}, ${property.postcode}`
                  : job.propertyId}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-700">
              <p>
                <span className="font-medium">Landlord:</span>{" "}
                {landlord?.name ?? job.landlordId}
              </p>
              <p>
                <span className="font-medium">Tenant:</span>{" "}
                {tenant?.name ?? job.tenantId}
              </p>
              <p>
                <span className="font-medium">Category:</span> {job.category}
              </p>
              <p>
                <span className="font-medium">Priority:</span> {job.priority}
              </p>
              <p>
                <span className="font-medium">Status:</span>{" "}
                <Badge variant={statusVariant(job.status)}>{job.status}</Badge>
              </p>
              <p>
                <span className="font-medium">Fee:</span> {job.fee}
              </p>
              <p>
                <span className="font-medium">Created:</span>{" "}
                {new Date(job.createdAt).toLocaleString("en-GB")}
              </p>
              <p>
                <span className="font-medium">Last update:</span>{" "}
                {new Date(job.lastUpdate).toLocaleString("en-GB")}
              </p>
              {contractor && (
                <p>
                  <span className="font-medium">Contractor:</span>{" "}
                  {contractor.name} ({contractor.company})
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700">{job.description}</p>
            </CardContent>
          </Card>
        </div>

        {/* Right: Admin controls + AI triage */}
        <div className="space-y-6">
          {/* Admin controls */}
          <Card>
            <CardHeader>
              <CardTitle>Admin controls</CardTitle>
              <CardDescription>
                Override status or reassign contractor.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-slate-700">
              <div>
                <p className="font-medium mb-1">Update status</p>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm">Mark Completed</Button>
                  <Button size="sm" variant="outline">
                    Set In Progress
                  </Button>
                  <Button size="sm" variant="outline">
                    Re-open
                  </Button>
                </div>
              </div>

              <div>
                <p className="font-medium mb-1">Assign / change contractor</p>
                <p className="text-xs text-slate-500 mb-2">
                  In production this would open a contractor picker filtered by
                  coverage and trade.
                </p>
                <Button size="sm" variant="outline">
                  Choose contractor (mock)
                </Button>
              </div>

              <div>
                <p className="font-medium mb-1">Audit & system actions</p>
                <p className="text-xs text-slate-500 mb-2">
                  Eventually this will show every change to this job and who made
                  it.
                </p>
                <Button size="sm" variant="outline" disabled>
                  View audit log (coming soon)
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* AI triage (mock) */}
          <Card>
            <CardHeader>
              <CardTitle>AI triage (mock)</CardTitle>
              <CardDescription>
                How the AI thinks this job should be classified and priced.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-700">
              <div>
                <p className="text-xs text-slate-500">Suggested category</p>
                <p className="font-medium">{aiSuggestion.category}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Suggested priority</p>
                <p className="font-medium">{aiSuggestion.priority}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Estimated fee</p>
                <p className="font-medium">{aiSuggestion.estimatedFee}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Confidence</p>
                <p className="font-medium">{aiSuggestion.confidence}</p>
              </div>
              <p className="text-[11px] text-slate-500">
                {aiSuggestion.explanation}
              </p>
              <p className="text-[11px] text-slate-500">
                Later you can compare this to the final invoice and track AI
                accuracy across categories, landlords, and contractors.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
