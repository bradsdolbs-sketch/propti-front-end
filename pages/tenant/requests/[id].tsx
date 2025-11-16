import { useRouter } from "next/router";
import TenantLayout from "../../../layouts/TenantLayout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Textarea } from "../../../components/ui/textarea";
import { Button } from "../../../components/ui/button";
import {
  maintenanceRequests,
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

// Demo conversation – in real life this would be per-request.
const mockMessages: ThreadMessage[] = [
  {
    id: "m1",
    from: "Danise",
    role: "Tenant",
    at: "2025-11-10 09:14",
    text: "Hi, the boiler stopped working last night. No hot water.",
    isYou: true,
  },
  {
    id: "m2",
    from: "Central Gate Estates",
    role: "Landlord / Agent",
    at: "2025-11-10 09:32",
    text: "Thanks for flagging – we’ve sent this to a contractor. Please confirm when you’re home.",
    isYou: false,
  },
  {
    id: "m3",
    from: "ABC Plumbing",
    role: "Contractor",
    at: "2025-11-10 10:02",
    text: "We can attend tomorrow 09:00–11:00. Will someone be at home?",
    isYou: false,
  },
];

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

function priorityVariant(priority: Priority): "danger" | "outline" {
  return priority === "Urgent" ? "danger" : "outline";
}

export default function TenantRequestDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const req = maintenanceRequests.find((r) => r.id === id);

  if (!req) {
    return (
      <TenantLayout>
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-slate-500">Request not found.</p>
        </div>
      </TenantLayout>
    );
  }

  const createdDate = new Date(req.createdAt).toLocaleDateString("en-GB");
  const updatedDate = new Date(req.lastUpdate).toLocaleDateString("en-GB");

  return (
    <TenantLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p
              className="text-xs text-slate-500 cursor-pointer hover:underline"
              onClick={() => router.push("/tenant/requests")}
            >
              ← Back to your requests
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
              Priority:{" "}
              <span className="font-medium">{req.priority}</span>
            </p>
            <p className="text-xs text-slate-500">
              Last updated: {updatedDate}
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* LEFT column – details + photos */}
          <div className="md:col-span-2 space-y-6">
            {/* Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Issue details</CardTitle>
                <CardDescription>
                  What you reported to your landlord/agent.
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
                    <p className="text-xs text-slate-500">
                      Managed by
                    </p>
                    <p className="font-medium">
                      {req.landlordName ?? "Landlord / agent"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Photos */}
            <Card>
              <CardHeader>
                <CardTitle>Photos</CardTitle>
                <CardDescription>
                  Images you uploaded to show the problem.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {req.photos && req.photos.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {req.photos.map((photo, index) => (
                      <div
                        key={index}
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

          {/* RIGHT column – status + messages */}
          <div className="md:col-span-1 space-y-6">
            {/* Status summary */}
            <Card>
              <CardHeader>
                <CardTitle>Progress</CardTitle>
                <CardDescription>
                  Where this request is in the process.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm space-y-3">
                <p>
                  <span className="text-xs text-slate-500">
                    Current status:
                  </span>
                  <br />
                  <span className="font-medium">{req.status}</span>
                </p>
                <p className="text-xs text-slate-500">
                  In the full system this would show when a contractor has been
                  booked and your confirmed time slot.
                </p>
              </CardContent>
            </Card>

            {/* Messages */}
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>
                  Chat with your landlord/agent and contractor about this job.
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

                <div className="space-y-2">
                  <Textarea
                    rows={3}
                    placeholder="Type a message about this issue…"
                    disabled
                  />
                  <div className="flex justify-end">
                    <Button size="sm" disabled>
                      Send (demo only)
                    </Button>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    In the full product this would post into a real thread
                    shared with the landlord/agent and any contractor assigned
                    to this job.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TenantLayout>
  );
}
