import { useRouter } from "next/router";
import AgentLayout from "../../../layouts/AgentLayout";

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
  properties,
  UnifiedStatus,
} from "../../../lib/mockData";

function statusVariant(status: UnifiedStatus): "default" | "warning" | "success" {
  switch (status) {
    case "Awaiting Landlord":
      return "warning";
    case "Approved – Awaiting Contractor":
    case "Offer":
    case "Contractor Booked":
    case "In Progress":
      return "default";
    case "Completed":
      return "success";
  }
}

export default function AgentRequestDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const req = maintenanceRequests.find((r) => r.id === id);

  if (!req) {
    return (
      <AgentLayout>
        <p className="text-sm text-slate-500">Request not found.</p>
      </AgentLayout>
    );
  }

  const property = properties.find((p) => p.id === req.propertyId);
  const createdDate = new Date(req.createdAt).toLocaleDateString("en-GB");
  const updatedDate = new Date(req.lastUpdate).toLocaleDateString("en-GB");

  const availabilityText =
    (req as any).tenantAvailability ??
    "Tenant availability from the request form will be pulled into this section in the full system.";

  const hasContractor =
    !!req.contractorId || req.status === "Contractor Booked" || req.status === "In Progress" || req.status === "Completed";

  return (
    <AgentLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p
              className="text-xs text-slate-500 cursor-pointer hover:underline"
              onClick={() => router.push("/agent/requests")}
            >
              ← Back to requests
            </p>
            <h1 className="text-2xl font-semibold text-slate-900 mt-2">
              {req.issueTitle}
            </h1>
            <p className="text-sm text-slate-500">
              {req.id} · {req.category} · created {createdDate}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-slate-800">
              {property
                ? `${property.name}, ${property.postcode}`
                : req.propertyId}
            </p>
            <Badge className="mt-1" variant={statusVariant(req.status)}>
              {req.status}
            </Badge>
            <p className="text-xs text-slate-500 mt-1">
              Last updated {updatedDate}
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* LEFT – triage + messages */}
          <div className="md:col-span-2 space-y-6">
            {/* Triage card */}
            <Card>
              <CardHeader>
                <CardTitle>Triage & classification</CardTitle>
                <CardDescription>
                  Review the issue, set priority and coordinate the next step.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p className="text-slate-700">
                  {req.description || "No extra description provided by the tenant."}
                </p>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-xs text-slate-500">Tenant</p>
                    <p className="font-medium">
                      {req.tenantName ?? "Tenant"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Landlord</p>
                    <p className="font-medium">
                      {req.landlordName ?? "Landlord"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Priority</p>
                    <p className="font-medium">{req.priority}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Category</p>
                    <p className="font-medium">{req.category}</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  {req.status === "Awaiting Landlord" && (
                    <>
                      <Button size="sm">Send to landlord for approval</Button>
                      <Button size="sm" variant="outline">
                        Ask tenant for more info
                      </Button>
                    </>
                  )}

                  {req.status === "Approved – Awaiting Contractor" && (
                    <>
                      <Button size="sm">Assign contractor</Button>
                      <Button size="sm" variant="outline">
                        Send to contractor marketplace
                      </Button>
                    </>
                  )}

                  {req.status === "Contractor Booked" && (
                    <Button size="sm" variant="outline">
                      Update appointment
                    </Button>
                  )}

                  {req.status === "Completed" && (
                    <span className="text-xs text-slate-400">
                      Completed – you could request feedback or close this case
                      in your CRM.
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Messages */}
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>
                  Central thread between tenant, landlord and contractor.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="border border-slate-200 rounded-lg p-3 bg-slate-50">
                  <p className="text-xs text-slate-500 mb-1">
                    10 Nov 2025 · 09:24 · Tenant
                  </p>
                  <p className="text-slate-700">
                    Hi, the boiler stopped working last night and we have no hot
                    water.
                  </p>
                </div>
                <div className="border border-slate-200 rounded-lg p-3 bg-white">
                  <p className="text-xs text-slate-500 mb-1">
                    10 Nov 2025 · 09:40 · You (Agent)
                  </p>
                  <p className="text-slate-700">
                    Thanks, we&apos;ve logged this as urgent and will confirm an
                    appointment shortly.
                  </p>
                </div>
                <div className="border border-slate-200 rounded-lg p-3 bg-white">
                  <p className="text-xs text-slate-500 mb-1">
                    10 Nov 2025 · 10:05 · Landlord
                  </p>
                  <p className="text-slate-700">
                    Please go ahead and arrange a contractor – happy to proceed.
                  </p>
                </div>
                <div className="border border-slate-200 rounded-lg p-3 bg-white">
                  <p className="text-xs text-slate-500 mb-1">
                    11 Nov 2025 · 08:45 · Contractor
                  </p>
                  <p className="text-slate-700">
                    We&apos;re attending between 09:00–11:00 tomorrow. Keys
                    required from your office?
                  </p>
                </div>

                <p className="text-[11px] text-slate-400">
                  In the full build this would be a live thread stored against
                  the request, with notifications to each party.
                </p>

                <div className="mt-2 space-y-2">
                  <label className="block text-xs font-medium text-slate-600">
                    Send a message (demo only)
                  </label>
                  <textarea
                    className="w-full border border-slate-200 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200"
                    rows={3}
                    placeholder="Update the tenant, landlord or contractor…"
                    disabled
                  />
                  <Button size="sm" disabled>
                    Send (demo only)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT – availability / access / contractor */}
          <div className="md:col-span-1 space-y-6">
            {/* Availability */}
            <Card>
              <CardHeader>
                <CardTitle>Tenant availability</CardTitle>
                <CardDescription>
                  Helps you choose the right slot with contractors.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p className="text-slate-700">{availabilityText}</p>
                <p className="text-[11px] text-slate-400">
                  This can be fed directly from the tenant&apos;s request form
                  (weekday AM/PM, Saturday, notes, etc).
                </p>
              </CardContent>
            </Card>

            {/* Access */}
            <Card>
              <CardHeader>
                <CardTitle>Access & keys</CardTitle>
                <CardDescription>
                  What contractors need to know to get in.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p>
                  <span className="text-slate-500">Access notes: </span>
                  <span className="font-medium">
                    {req.accessNotes ?? "Not provided"}
                  </span>
                </p>
                <p className="text-[11px] text-slate-400">
                  Over time this could tie into your key log and building
                  instructions.
                </p>
              </CardContent>
            </Card>

            {/* Contractor status */}
            <Card>
              <CardHeader>
                <CardTitle>Contractor</CardTitle>
                <CardDescription>
                  Who&apos;s booked or being assigned.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p>
                  <span className="text-slate-500">Assigned contractor: </span>
                  <span className="font-medium">
                    {hasContractor
                      ? req.contractorName ?? "Assigned contractor"
                      : "Not yet assigned"}
                  </span>
                </p>
                <p className="text-[11px] text-slate-400">
                  In the full system you&apos;d see slots and confirmations from
                  the contractor portal here.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AgentLayout>
  );
}
