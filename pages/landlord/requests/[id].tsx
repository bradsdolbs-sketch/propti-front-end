import { useRouter } from "next/router";
import LandlordLayout from "../../../layouts/LandlordLayout";

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
  Priority,
} from "../../../lib/mockData";

type MessageRole = "Tenant" | "Contractor" | "Landlord / Agent";

interface ThreadMessage {
  id: string;
  from: string;
  role: MessageRole;
  at: string;
  text: string;
  isYou: boolean;
}

// Demo thread – same job, landlord perspective
const mockMessages: ThreadMessage[] = [
  {
    id: "m1",
    from: "Danise",
    role: "Tenant",
    at: "2025-11-10 09:14",
    text: "Hi, the boiler stopped working last night. No hot water.",
    isYou: false,
  },
  {
    id: "m2",
    from: "Central Gate Estates",
    role: "Landlord / Agent",
    at: "2025-11-10 09:32",
    text: "Thanks for flagging – we’ll arrange a contractor for you.",
    isYou: true,
  },
  {
    id: "m3",
    from: "ABC Plumbing",
    role: "Contractor",
    at: "2025-11-10 10:02",
    text: "We can attend tomorrow 09:00–11:00. Will someone be at home?",
    isYou: false,
  },
  {
    id: "m4",
    from: "Danise",
    role: "Tenant",
    at: "2025-11-10 10:20",
    text: "Yes, I’ll be home. Door buzzer is 142.",
    isYou: false,
  },
];

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

function priorityVariant(priority: Priority): "danger" | "outline" {
  return priority === "Urgent" ? "danger" : "outline";
}

export default function LandlordRequestDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const req = maintenanceRequests.find((r) => r.id === id);

  if (!req) {
    return (
      <LandlordLayout>
        <div className="max-w-5xl mx-auto">
          <p className="text-sm text-slate-500">Request not found.</p>
        </div>
      </LandlordLayout>
    );
  }

  const property = properties.find((p) => p.id === req.propertyId);

  const createdDate = new Date(req.createdAt).toLocaleDateString("en-GB");
  const updatedDate = new Date(req.lastUpdate).toLocaleDateString("en-GB");

  // TEMP demo availability – same idea as contractor view
  const demoAvailability = {
    date: "2025-11-12",
    slots: ["09:00 – 11:00", "13:00 – 15:00"],
    access: "Tenant will be at home",
  };

  const availabilityDate = new Date(
    demoAvailability.date
  ).toLocaleDateString("en-GB");

  return (
    <LandlordLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p
              className="text-xs text-slate-500 cursor-pointer hover:underline"
              onClick={() => router.push("/landlord/requests")}
            >
              ← Back to tenant requests
            </p>
            <h1 className="text-2xl font-semibold text-slate-900 mt-2">
              {req.issueTitle}
            </h1>
            <p className="text-sm text-slate-500">
              Request ID: {req.id} · {req.category}
            </p>
          </div>
          <div className="text-right space-y-2">
            <Badge variant={statusVariant(req.status)}>{req.status}</Badge>
            <p className="text-xs text-slate-500">
              Priority: <span className="font-medium">{req.priority}</span>
            </p>
            <p className="text-xs text-slate-500">
              Last updated: {updatedDate}
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* LEFT – issue + tenant & property */}
          <div className="md:col-span-2 space-y-6">
            {/* Issue details */}
            <Card>
              <CardHeader>
                <CardTitle>Issue details</CardTitle>
                <CardDescription>
                  What the tenant has reported for this property.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p className="text-slate-700">{req.description}</p>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-xs text-slate-500">Category</p>
                    <p className="font-medium">{req.category}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Priority</p>
                    <Badge variant={priorityVariant(req.priority)}>
                      {req.priority}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Created</p>
                    <p className="font-medium">{createdDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Current status</p>
                    <p className="font-medium">{req.status}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tenant & property snapshot */}
            <Card>
              <CardHeader>
                <CardTitle>Property & tenant</CardTitle>
                <CardDescription>
                  Who raised this issue and where it is.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm space-y-3">
                <div>
                  <p className="text-xs text-slate-500">Property</p>
                  <p className="font-medium">
                    {property
                      ? `${property.name}, ${property.postcode}`
                      : req.propertyId}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Tenant</p>
                  <p className="font-medium">
                    {req.tenantName ?? "Tenant (name not populated in mock)"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Managed by</p>
                  <p className="font-medium">
                    {req.landlordName ?? "You / your agency"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Access notes</p>
                  <p className="font-medium">
                    {req.accessNotes ?? "No extra access notes provided."}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Photos */}
            <Card>
              <CardHeader>
                <CardTitle>Photos</CardTitle>
                <CardDescription>
                  What the tenant uploaded to show the problem.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {req.photos && req.photos.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {req.photos.map((photo, idx) => (
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
                    No photos attached to this request.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* RIGHT – availability + messages + actions */}
          <div className="md:col-span-1 space-y-6">
            {/* Tenant availability */}
            <Card>
              <CardHeader>
                <CardTitle>Tenant availability</CardTitle>
                <CardDescription>
                  When the tenant said they can be at home.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm space-y-3">
                <p className="text-xs text-slate-500">Preferred date</p>
                <p className="font-medium">{availabilityDate}</p>

                <p className="text-xs text-slate-500">Time slots</p>
                <p className="font-medium">
                  {demoAvailability.slots.join(", ")}
                </p>

                <p className="text-xs text-slate-500">Access</p>
                <p className="font-medium">{demoAvailability.access}</p>

                <p className="text-[11px] text-slate-400 mt-2">
                  In the full system these values would come directly from the
                  tenant&apos;s &quot;New request&quot; form and update if
                  either side re-schedules.
                </p>
              </CardContent>
            </Card>

            {/* Messages */}
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>
                  Shared conversation for this job (tenant, contractor, you).
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

                <p className="text-[11px] text-slate-400">
                  In a future version you&apos;d be able to reply here and it
                  would post into the same thread tenants and contractors see
                  inside their portals.
                </p>

                <Button size="sm" variant="outline" disabled>
                  Reply (demo only)
                </Button>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Landlord actions</CardTitle>
                <CardDescription>
                  High-level decisions for this request.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p className="text-xs text-slate-500">
                  In a future build this is where you’d:
                </p>
                <ul className="list-disc list-inside text-xs text-slate-600 space-y-1">
                  <li>Approve or reject the work</li>
                  <li>Select a contractor or let Propti auto-assign</li>
                  <li>Confirm the final time slot</li>
                </ul>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Button size="sm" disabled>
                    Approve work (demo)
                  </Button>
                  <Button size="sm" variant="outline" disabled>
                    Request more info (demo)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </LandlordLayout>
  );
}
