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
import { Button } from "../../../components/ui/button";

type RequestStatus = "Awaiting Landlord" | "Booked" | "In Progress" | "Completed";
type RequestPriority = "Urgent" | "Standard";

interface TenantRequestDetail {
  id: string;
  property: string;
  category: string;
  description: string;
  priority: RequestPriority;
  status: RequestStatus;
  createdAt: string;
  lastUpdate: string;
  slot?: string;
}

const mockRequestDetails: TenantRequestDetail[] = [
  {
    id: "REQ-1023",
    property: "22 Anthony House, E5",
    category: "Boiler / Heating",
    description:
      "There has been no heating or hot water since last night. The boiler shows error F28. I have tried resetting but it didn’t work.",
    priority: "Urgent",
    status: "Awaiting Landlord",
    createdAt: "2025-11-10T09:30:00Z",
    lastUpdate: "2025-11-12T14:15:00Z",
  },
  {
    id: "REQ-1020",
    property: "22 Anthony House, E5",
    category: "Kitchen leak",
    description:
      "Slow leak from under the kitchen sink. I have put a bowl underneath for now.",
    priority: "Standard",
    status: "Booked",
    createdAt: "2025-11-07T11:00:00Z",
    lastUpdate: "2025-11-11T08:30:00Z",
    slot: "Tomorrow · 09:00–11:00",
  },
];

function getRequestById(id?: string | string[]): TenantRequestDetail | undefined {
  if (!id || Array.isArray(id)) return undefined;
  return mockRequestDetails.find((r) => r.id === id);
}

function statusVariant(status: RequestStatus): "default" | "warning" | "success" {
  switch (status) {
    case "Awaiting Landlord":
      return "warning";
    case "Booked":
    case "In Progress":
      return "default";
    case "Completed":
      return "success";
  }
}

export default function TenantRequestDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const request = getRequestById(id);

  if (!request) {
    return (
      <TenantLayout>
        <p className="text-sm text-slate-500">Request not found.</p>
      </TenantLayout>
    );
  }

  return (
    <TenantLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            {request.category}
          </h1>
          <p className="text-slate-500 text-sm">
            {request.id} • {request.property}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={statusVariant(request.status)}>{request.status}</Badge>
          <Button variant="outline" onClick={() => router.push("/tenant/requests")}>
            Back to requests
          </Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[2fr,1fr]">
        {/* Left – main content */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Issue details</CardTitle>
              <CardDescription>
                This is what you reported to your landlord.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-700">
              <p className="whitespace-pre-line">{request.description}</p>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-medium text-slate-600">Priority:</span>
                <Badge
                  variant={request.priority === "Urgent" ? "danger" : "outline"}
                >
                  {request.priority}
                </Badge>
              </div>
              <p className="text-xs text-slate-500">
                Created{" "}
                {new Date(request.createdAt).toLocaleString("en-GB")} • Last
                updated {new Date(request.lastUpdate).toLocaleString("en-GB")}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Updates</CardTitle>
              <CardDescription>
                A simple timeline of what has happened so far.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-700">
              {request.status === "Awaiting Landlord" && (
                <>
                  <p>
                    <span className="font-medium">Pending landlord review</span>{" "}
                    – they&apos;ve been notified but haven&apos;t confirmed next steps yet.
                  </p>
                  <p className="text-xs text-slate-500">
                    If this feels urgent or unsafe, contact your landlord or
                    agency directly as well.
                  </p>
                </>
              )}

              {request.status === "Booked" && request.slot && (
                <>
                  <p>
                    <span className="font-medium">Visit booked: </span>
                    {request.slot}
                  </p>
                  <p className="text-xs text-slate-500">
                    Make sure someone is at home during this slot or confirm
                    access arrangements with your landlord.
                  </p>
                </>
              )}

              {request.status === "Completed" && (
                <p>
                  This request has been marked as completed. If the issue comes
                  back, you can always create a follow-up request.
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Messages & photos</CardTitle>
              <CardDescription>
                In a full build, this is where you’d see chat and uploaded
                images.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-700">
              <p className="text-slate-500 text-sm">
                Placeholder: chat thread + photo uploads will go here (e.g.
                WhatsApp-style conversation with landlord/contractor).
              </p>
              <Button variant="outline" size="sm">
                Upload photo (coming soon)
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right – summary */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Property</CardTitle>
              <CardDescription>Your rental.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-700">
              <p className="font-medium">{request.property}</p>
              <p>Managed by: Central Gate Estates</p>
              <p className="text-xs text-slate-500">
                In a full build, landlord / agent contact details would appear
                here.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Next steps</CardTitle>
              <CardDescription>What you can expect.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-700">
              {request.status === "Awaiting Landlord" && (
                <p>
                  We&apos;re waiting for your landlord or property manager to
                  review this and confirm what happens next.
                </p>
              )}
              {request.status === "Booked" && (
                <p>
                  A contractor has been assigned and a time slot has been
                  confirmed. They may contact you directly if needed.
                </p>
              )}
              {request.status === "In Progress" && (
                <p>
                  A contractor is currently working on this issue or due to
                  attend shortly.
                </p>
              )}
              {request.status === "Completed" && (
                <p>
                  This request is closed. If something isn&apos;t right, you can
                  reopen it via your landlord or submit new details.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </TenantLayout>
  );
}
