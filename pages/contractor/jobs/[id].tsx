import { useRouter } from "next/router";
import ContractorLayout from "../../../layouts/ContractorLayout";

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

type ContractorJobStatus = "Offer" | "Assigned" | "In Progress" | "Completed";

type TimelineStep = {
  label: string;
  active: boolean;
};

type MessageRole = "Tenant" | "Contractor" | "Landlord / Agent";

interface ThreadMessage {
  id: string;
  from: string;
  role: MessageRole;
  at: string;
  text: string;
  isYou: boolean;
}

// Demo thread – mirrored idea from tenant side, but from contractor’s POV
const mockMessages: ThreadMessage[] = [
  {
    id: "m1",
    from: "Central Gate Estates",
    role: "Landlord / Agent",
    at: "2025-11-10 09:32",
    text: "Tenant has no hot water – can you attend tomorrow?",
    isYou: false,
  },
  {
    id: "m2",
    from: "ABC Plumbing",
    role: "Contractor",
    at: "2025-11-10 10:02",
    text: "We can do 09:00–11:00 tomorrow. Please confirm access.",
    isYou: true,
  },
  {
    id: "m3",
    from: "Danise",
    role: "Tenant",
    at: "2025-11-10 10:20",
    text: "I’ll be home then. Door buzzer is 142.",
    isYou: false,
  },
];

const CURRENT_CONTRACTOR_ID = "CON-001";

function toContractorStatus(status: UnifiedStatus): ContractorJobStatus {
  switch (status) {
    case "Offer":
      return "Offer";
    case "Contractor Booked":
    case "Approved – Awaiting Contractor":
      return "Assigned";
    case "In Progress":
      return "In Progress";
    case "Completed":
      return "Completed";
    case "Awaiting Landlord":
    default:
      return "Offer";
  }
}

function statusVariant(
  status: ContractorJobStatus
): "default" | "warning" | "success" {
  switch (status) {
    case "Offer":
      return "warning";
    case "Assigned":
    case "In Progress":
      return "default";
    case "Completed":
      return "success";
  }
}

export default function ContractorJobDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const job = maintenanceRequests.find((r) => r.id === id);

  if (!job) {
    return (
      <ContractorLayout>
        <p className="text-sm text-slate-500">Job not found.</p>
      </ContractorLayout>
    );
  }

  const contractorStatus = toContractorStatus(job.status);
  const property = properties.find((p) => p.id === job.propertyId);

  const createdDate = new Date(job.createdAt).toLocaleDateString("en-GB");
  const updatedDate = new Date(job.lastUpdate).toLocaleDateString("en-GB");

  const timeline: TimelineStep[] = [
    { label: "Offer received", active: true },
    {
      label: "Accepted & scheduled",
      active: ["Assigned", "In Progress", "Completed"].includes(
        contractorStatus
      ),
    },
    {
      label: "On site / in progress",
      active: ["In Progress", "Completed"].includes(contractorStatus),
    },
    {
      label: "Work completed",
      active: contractorStatus === "Completed",
    },
  ];

  const isOffer = contractorStatus === "Offer";
  const isAssigned = contractorStatus === "Assigned";
  const isInProgress = contractorStatus === "In Progress";
  const isCompleted = contractorStatus === "Completed";

  // TEMP: demo availability – in a real build, this would come from the tenant’s request
  const demoAvailability = {
    date: "2025-11-12",
    slots: ["09:00 – 11:00", "13:00 – 15:00"],
    access: "Tenant will be at home",
  };

  const availabilityDate = new Date(
    demoAvailability.date
  ).toLocaleDateString("en-GB");

  return (
    <ContractorLayout>
      {/* Header / Back link */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p
            className="text-xs text-slate-500 cursor-pointer hover:underline"
            onClick={() => router.push("/contractor/jobs")}
          >
            ← Back to jobs
          </p>
          <h1 className="text-2xl font-semibold text-slate-900 mt-2">
            {job.issueTitle}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Job ID: {job.id} · {job.category}
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <Badge variant={statusVariant(contractorStatus)}>
            {contractorStatus}
          </Badge>
          <p className="text-xs text-slate-500">
            Last updated: {updatedDate}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* LEFT COLUMN */}
        <div className="md:col-span-7 space-y-6">
          {/* Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Job overview</CardTitle>
              <CardDescription>
                Details of the issue and what’s expected on site.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-700 mb-4">
                {job.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-500 text-xs">Category</p>
                  <p className="font-medium">{job.category}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs">Created</p>
                  <p className="font-medium">{createdDate}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs">Priority</p>
                  <p className="font-medium">{job.priority}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs">Fee</p>
                  <p className="font-medium">{job.fee ?? "TBC"}</p>
                </div>
              </div>

              {/* Actions depending on status */}
              <div className="mt-6 flex flex-wrap gap-3">
                {isOffer && (
                  <>
                    <Button size="sm">Accept job</Button>
                    <Button size="sm" variant="outline">
                      Decline
                    </Button>
                  </>
                )}

                {isAssigned && <Button size="sm">Start job</Button>}

                {isInProgress && (
                  <Button size="sm">Mark as completed</Button>
                )}

                {isCompleted && (
                  <span className="text-xs text-slate-400">
                    Job completed – no further actions required.
                  </span>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Photos */}
          <Card>
            <CardHeader>
              <CardTitle>Photos</CardTitle>
              <CardDescription>
                Images uploaded by the tenant to show the issue.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {job.photos && job.photos.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {job.photos.map((photo, idx) => (
                    <div
                      key={idx}
                      className="w-full aspect-square rounded-lg bg-slate-200 flex items-center justify-center text-xs text-slate-500"
                    >
                      Photo
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500">
                  No photos attached to this job.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Messages */}
          <Card>
            <CardHeader>
              <CardTitle>Messages</CardTitle>
              <CardDescription>
                Conversation between you, the tenant, and the landlord/agent.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="max-h-64 overflow-y-auto space-y-3 border border-slate-200 rounded-md p-2 bg-slate-50">
                {mockMessages.map((m) => (
                  <div
                    key={m.id}
                    className={
                      "flex " +
                      (m.isYou ? "justify-end" : "justify-start")
                    }
                  >
                    <div
                      className={
                        "max-w-[80%] rounded-lg px-3 py-2 text-xs " +
                        (m.isYou
                          ? "bg-slate-900 text-slate-50"
                          : "bg-white border border-slate-200 text-slate-800")
                      }
                    >
                      <p className="font-medium text-[11px]">
                        {m.from} · {m.role}
                      </p>
                      <p className="mt-1">{m.text}</p>
                      <p className="mt-1 text-[10px] text-slate-400">
                        {m.at}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-sm">
                <p className="text-xs text-slate-500">
                  In a future version you&apos;d be able to send messages from
                  here, including updates when you&apos;re on the way or if you
                  need more information.
                </p>
                <Button size="sm" variant="outline" disabled>
                  Reply (demo only)
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN */}
        <div className="md:col-span-5 space-y-6">
          {/* Property details + availability */}
          <Card>
            <CardHeader>
              <CardTitle>Property & access</CardTitle>
              <CardDescription>
                Where you&apos;ll be attending and when the tenant is free.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-3">
              <div>
                <p className="font-medium">
                  {property
                    ? `${property.name}, ${property.postcode}`
                    : job.propertyId}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Managed by: {job.landlordName ?? "Landlord"}
                </p>
                <p className="text-xs text-slate-500">
                  Tenant: {job.tenantName ?? "Tenant"}
                </p>
              </div>

              {/* Tenant availability (demo) */}
              <div className="mt-4 border border-slate-200 rounded-lg p-3 space-y-1">
                <p className="text-xs font-medium text-slate-700">
                  Tenant availability (from request)
                </p>
                <p className="text-xs text-slate-500">
                  Preferred date:{" "}
                  <span className="font-medium">{availabilityDate}</span>
                </p>
                <p className="text-xs text-slate-500">
                  Time slots:{" "}
                  <span className="font-medium">
                    {demoAvailability.slots.join(", ")}
                  </span>
                </p>
                <p className="text-xs text-slate-500">
                  Access notes:{" "}
                  <span className="font-medium">
                    {demoAvailability.access}
                  </span>
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  In the real app this would be populated directly from the
                  tenant’s original request form.
                </p>
              </div>

              <p className="text-xs text-slate-500 mt-2">
                Access notes from the tenant:
              </p>
              <p className="text-xs font-medium text-slate-800">
                {job.accessNotes ?? "Not provided"}
              </p>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Status timeline</CardTitle>
              <CardDescription>
                How far along this job is in your workflow.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timeline.map((step, idx) => (
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

          {/* Payout info */}
          <Card>
            <CardHeader>
              <CardTitle>Payout</CardTitle>
              <CardDescription>
                What you’ll receive once this job is completed.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>
                <span className="text-slate-500">Agreed fee: </span>
                <span className="font-medium">{job.fee ?? "TBC"}</span>
              </p>
              <p className="text-xs text-slate-500">
                Payout timing and exact commission handling to be confirmed in a
                later version of Propti.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </ContractorLayout>
  );
}
