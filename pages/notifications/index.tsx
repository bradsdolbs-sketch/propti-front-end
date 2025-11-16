import { useState } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/card";

import { Badge } from "../../components/ui/badge";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "../../components/ui/table";

import { Button } from "../../components/ui/button";

type Role = "Tenant" | "Landlord" | "Contractor";

interface NotificationItem {
  id: string;
  role: Role;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  category: "Request" | "Job" | "Billing" | "System";
}

const mockNotifications: NotificationItem[] = [
  {
    id: "N-1001",
    role: "Tenant",
    title: "Landlord approved your request",
    message: "Your boiler issue has been approved and is being sent to a contractor.",
    createdAt: "2025-11-12T09:30:00Z",
    read: false,
    category: "Request",
  },
  {
    id: "N-1002",
    role: "Tenant",
    title: "Contractor booked",
    message: "A contractor has been booked to attend tomorrow between 09:00–11:00.",
    createdAt: "2025-11-11T15:12:00Z",
    read: true,
    category: "Job",
  },
  {
    id: "N-2001",
    role: "Landlord",
    title: "New maintenance request",
    message: "Danise has reported an issue at 22 Anthony House (Heating & hot water).",
    createdAt: "2025-11-12T08:05:00Z",
    read: false,
    category: "Request",
  },
  {
    id: "N-2002",
    role: "Landlord",
    title: "Job completed",
    message: "Boiler repair at 22 Anthony House has been marked as completed by the contractor.",
    createdAt: "2025-11-10T17:45:00Z",
    read: true,
    category: "Job",
  },
  {
    id: "N-2003",
    role: "Landlord",
    title: "Subscription renewal",
    message: "Your Propti subscription will renew on 1st December.",
    createdAt: "2025-11-09T11:20:00Z",
    read: true,
    category: "Billing",
  },
  {
    id: "N-3001",
    role: "Contractor",
    title: "New job offer",
    message: "Central Gate Estates has offered you a job at Central Gate, E1.",
    createdAt: "2025-11-12T10:15:00Z",
    read: false,
    category: "Job",
  },
  {
    id: "N-3002",
    role: "Contractor",
    title: "Job marked as paid",
    message: "Your job at Silverstream House, W1 has been marked as paid in the system.",
    createdAt: "2025-11-10T13:25:00Z",
    read: true,
    category: "Billing",
  },
];

function categoryColour(category: NotificationItem["category"]):
  "default" | "success" | "warning" | "danger" {
  switch (category) {
    case "Request":
      return "warning";
    case "Job":
      return "default";
    case "Billing":
      return "success";
    case "System":
      return "default";
  }
}

export default function NotificationsPage() {
  const [activeRole, setActiveRole] = useState<Role>("Landlord");

  const notificationsForRole = mockNotifications
    .filter((n) => n.role === activeRole)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  const unreadCount = notificationsForRole.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center px-4 py-8">
      <div className="w-full max-w-5xl space-y-6">
        {/* Page header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Notifications
            </h1>
            <p className="text-slate-500 text-sm">
              Central place to see what’s changed across Propti.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1">
              <span className="inline-block h-2 w-2 rounded-full bg-slate-900" />{" "}
              Unread
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="inline-block h-2 w-2 rounded-full bg-slate-300" />{" "}
              Read
            </span>
          </div>
        </div>

        {/* Role filter tabs */}
        <Card>
          <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Role filter</CardTitle>
              <CardDescription>
                Switch between Tenant, Landlord, and Contractor notifications.
              </CardDescription>
            </div>
            <div className="inline-flex rounded-lg border border-slate-200 bg-slate-100 p-1">
              {(["Tenant", "Landlord", "Contractor"] as Role[]).map((role) => {
                const isActive = role === activeRole;
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setActiveRole(role)}
                    className={[
                      "px-3 py-1.5 text-xs font-medium rounded-md transition",
                      isActive
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-600 hover:text-slate-900",
                    ].join(" ")}
                  >
                    {role}
                  </button>
                );
              })}
            </div>
          </CardHeader>
        </Card>

        {/* Summary + list */}
        <div className="grid gap-6 md:grid-cols-12">
          {/* Summary card */}
          <div className="md:col-span-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  {activeRole} notifications
                </CardTitle>
                <CardDescription>
                  Recent activity relevant to this portal.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>
                  <span className="text-slate-500">Total for this role: </span>
                  <span className="font-semibold">
                    {notificationsForRole.length}
                  </span>
                </p>
                <p>
                  <span className="text-slate-500">Unread: </span>
                  <span className="font-semibold">
                    {unreadCount}
                  </span>
                </p>
                <p className="text-xs text-slate-500">
                  In a future version of Propti, clicking a notification would
                  deep-link into the relevant request, job, or billing page.
                </p>

                <Button variant="outline" size="sm" disabled>
                  Mark all as read (soon)
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Notifications table */}
          <div className="md:col-span-8">
            <Card>
              <CardHeader>
                <CardTitle>Activity feed</CardTitle>
                <CardDescription>
                  Most recent notifications for the selected role.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {notificationsForRole.length === 0 ? (
                  <p className="text-sm text-slate-500">
                    No notifications yet for {activeRole}. Once things start
                    happening in the system (requests, jobs, billing), they’ll
                    appear here.
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <Thead>
                        <Tr>
                          <Th>Title</Th>
                          <Th>Category</Th>
                          <Th>Date</Th>
                          <Th>Status</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {notificationsForRole.map((n) => {
                          const date = new Date(n.createdAt);
                          const isUnread = !n.read;

                          return (
                            <Tr key={n.id}>
                              <Td>
                                <div className="flex items-start gap-2">
                                  <span
                                    className={[
                                      "mt-1 h-2 w-2 rounded-full",
                                      isUnread
                                        ? "bg-slate-900"
                                        : "bg-slate-300",
                                    ].join(" ")}
                                  />
                                  <div>
                                    <p className="text-sm font-medium text-slate-900">
                                      {n.title}
                                    </p>
                                    <p className="text-xs text-slate-500 mt-1">
                                      {n.message}
                                    </p>
                                  </div>
                                </div>
                              </Td>
                              <Td className="whitespace-nowrap">
                                <Badge variant={categoryColour(n.category)}>
                                  {n.category}
                                </Badge>
                              </Td>
                              <Td className="whitespace-nowrap text-xs text-slate-500">
                                {date.toLocaleDateString("en-GB")} ·{" "}
                                {date.toLocaleTimeString("en-GB", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </Td>
                              <Td className="whitespace-nowrap">
                                <Badge variant={isUnread ? "warning" : "default"}>
                                  {isUnread ? "Unread" : "Read"}
                                </Badge>
                              </Td>
                            </Tr>
                          );
                        })}
                      </Tbody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
