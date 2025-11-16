import { useRouter } from "next/router";
import OwnerLayout from "../../../layouts/OwnerLayout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { maintenanceRequests, properties, UnifiedStatus } from "../../../lib/mockData";

function statusVariant(status: UnifiedStatus): "default" | "warning" | "success" {
  switch (status) {
    case "Awaiting Landlord":
    case "Approved – Awaiting Contractor":
      return "warning";
    case "Offer":
    case "Contractor Booked":
    case "In Progress":
      return "default";
    case "Completed":
      return "success";
  }
}

export default function OwnerRequestDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const request = maintenanceRequests.find((r) => r.id === id);
  const property = properties.find((p) => p.id === request?.propertyId);

  if (!request) {
    return (
      <OwnerLayout>
        <p className="text-sm text-slate-500">Request not found.</p>
      </OwnerLayout>
    );
  }

  const createdDate = new Date(request.createdAt).toLocaleDateString("en-GB");
  const updatedDate = new Date(request.lastUpdate).toLocaleDateString("en-GB");

  const availabilityLabel =
    (request as any).tenantAvailability ?? "No availability provided";

  const timelineSteps = [
    {
      label: "Request created by tenant",
      active: true,
    },
    {
      label: "Reviewed by agent / landlord",
      active: [
        "Awaiting Landlord",
        "Approved – Awaiting Contractor",
        "Offer",
        "Contractor Booked",
        "In Progress",
        "Completed",
      ].includes(request.status),
    },
    {
      label: "Contractor booked",
      active: ["Contractor Booked", "In Progress", "Completed"].includes(
        request.status
      ),
    },
    {
      label: "On site / in progress",
      active: ["In Progress", "Completed"].includes(request.status),
    },
    {
      label: "Work completed",
      active: request.status === "Completed",
    },
  ];

  return (
    <OwnerLayout>
      <div className="max-w-5xl space-y-6">
        {/* Header / back */}
        <div className="flex items-center justify-between">
          <div>
            <p
              className="text-xs text-slate-500 cursor-pointer hover:underline"
              onClick={() => router.push("/owner/requests")}
            >
              ← Back to requests
            </p>
            <h1 className="text-2xl font-semibold text-slate-900 mt-2">
              {request.issueTitle}
            </h1>
            <p className="text-sm text-slate-500">
              Request ID {request.id} · {createdDate}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-slate-700">
              {property
                ? `${property.name}, ${property.postcode}`
                : request.propertyId}
            </p>
            <Badge className="mt-1" variant={statusVariant(request.status)}>
              {request.status}
            </Badge>
            <p className="text-xs text-slate-500 mt-1">
              Last updated {updatedDate}
            </p>
          </div>
        </div>

        {/* Top row cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* Status & priority */}
          <Card>
            <CardHeader>
              <CardTitle>Status & priority</CardTitle>
              <CardDescription>
                Where this request is in the workflow.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>
                <span className="text-slate-500">Status: </span>
                <span className="font-medium">{request.status}</span>
              </p>
              <p>
                <span className="text-slate-500">Priority: </span>
                <span className="font-medium">{request.priority}</span>
              </p>
              <p className="text-xs text-slate-500 mt-2">
                In a full build, you could control approval rules here (e.g.
                auto-approve below £250, require approval above that).
              </p>
            </CardContent>
          </Card>

          {/* Tenant & access */}
          <Card>
            <CardHeader>
              <CardTitle>Tenant & access</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>
                <span className="text-slate-500">Tenant: </span>
                <span className="font-medium">
                  {request.tenantName ?? "Tenant"}
                </span>
              </p>
              <p>
                <span className="text-slate-500">Availability: </span>
                <span className="font-medium">{availabilityLabel}</span>
              </p>
              <p>
                <span className="text-slate-500">Access notes: </span>
                <span className="font-medium">
                  {request.accessNotes ?? "Not provided"}
                </span>
              </p>
              <p className="text-xs text-slate-500 mt-2">
                Contractors see this information when they accept the job. Your
                agent coordinates exact times with them.
              </p>
            </CardContent>
          </Card>

          {/* Financials */}
          <Card>
            <CardHeader>
              <CardTitle>Financials</CardTitle>
              <CardDescription>Indicative cost for this issue.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>
                <span className="text-slate-500">Estimated fee: </span>
                <span className="font-medium">
                  {request.fee ?? "To be confirmed by contractor"}
                </span>
              </p>
              <p className="text-xs text-slate-500 mt-2">
                In a later version, quotes and invoices could be attached here,
                along with your configured approval thresholds.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle>Issue description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-700">
              {request.description || "No additional description provided."}
            </p>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Timeline</CardTitle>
            <CardDescription>
              High-level view of how this job is progressing.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {timelineSteps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      step.active ? "bg-slate-900" : "bg-slate-300"
                    }`}
                  />
                  <p
                    className={`text-sm ${
                      step.active ? "text-slate-900" : "text-slate-400"
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Agent involvement info */}
        <Card>
          <CardHeader>
            <CardTitle>Your agent&apos;s role</CardTitle>
            <CardDescription>
              How this request is being handled on your behalf.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-600">
            <p>
              In most cases your managing agent will handle contractor booking,
              access coordination and basic triage for you. You&apos;re seeing a
              read-only view of the operational detail.
            </p>
            <p className="text-xs text-slate-500">
              Later we can add a simple toggle here for you to require explicit
              approval above a certain spend, or to opt into automatic approval
              for specific categories (e.g. emergencies).
            </p>
          </CardContent>
        </Card>
      </div>
    </OwnerLayout>
  );
}
