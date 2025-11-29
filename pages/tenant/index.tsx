import TenantLayout from "../../layouts/TenantLayout";

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

import { useEffect, useMemo, useState } from "react";
import { api, TenantStatus } from "../../lib/api";
import { Button } from "../../components/ui/button";
import Link from "next/link";

export default function TenantDashboardPage() {
  const [tenantStatus, setTenantStatus] = useState<"pending" | "active">("pending");
  const [tenancyStatus, setTenancyStatus] = useState<TenantStatus | null>(null);
  const isPendingTenancy =
    tenantStatus === "pending" || tenancyStatus === "PENDING";
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tenancyId, setTenancyId] = useState<string | null>(null);
  const [activating, setActivating] = useState(false);
  const [referenceStatus, setReferenceStatus] = useState<"NOT_STARTED" | "IN_PROGRESS" | "COMPLETED" | null>(null);
  const [agreementStatus, setAgreementStatus] = useState<"NOT_SENT" | "SENT" | "SIGNED" | null>(null);
  const [invites, setInvites] = useState<Invite[]>([]);
  const [tenantId, setTenantId] = useState<string | null>(null);
  const [inviteActionMessage, setInviteActionMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    api
      .getCurrentUser()
      .then((me) => {
        if (!isMounted) return;
        if (!me?.id || me.role !== "tenant") {
          setError("No tenant session found.");
          setLoading(false);
          return;
        }
        setTenantId(me.id);
        if (me.name) {
          window.localStorage.setItem("propti_user_name", me.name);
        }
        return api.getTenancyForTenant(me.id).then((tenancy) => {
          if (!isMounted) return;
          setTenancyStatus(tenancy.tenantStatus);
          setTenancyId(tenancy.id);
          setReferenceStatus(tenancy.referenceStatus ?? null);
          setAgreementStatus(tenancy.agreementStatus ?? null);
          setTenantStatus(
            tenancy.tenantStatus === "ACTIVE" ? "active" : "pending"
          );
         api
            .listTenantInvites(me.id)
            .then((list) => {
              if (!isMounted) return;
              setInvites(list);
            })
            .catch(() => {});
        });
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err.message || "Could not load your session.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <TenantLayout>
        <div className="max-w-2xl mx-auto mt-10 text-sm text-slate-600">
          Checking your tenancy status...
        </div>
      </TenantLayout>
    );
  }

  if (isPendingTenancy) {
    return (
      <TenantLayout>
        <div className="max-w-2xl mx-auto mt-10">
          <Card>
            <CardHeader>
              <CardTitle>We&apos;re setting up your tenancy</CardTitle>
              <CardDescription>
                Your landlord/agency will add you to the tenancy. You&apos;ll see your dashboard once that&apos;s done.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-slate-600 space-y-3">
              {inviteActionMessage && (
                <p className="text-xs text-emerald-700">{inviteActionMessage}</p>
              )}
              {invites.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-800">Invites to you</p>
                  {invites.map((inv) => (
                    <div key={inv.id} className="border border-slate-200 rounded-md p-2 text-xs text-slate-700">
                      <p>{inv.inviterName || inv.inviterRole || "New invite"} has invited you</p>
                      {inv.propertyAddress && <p className="text-slate-600">Property: {inv.propertyAddress}</p>}
                      <p>Status: {inv.status}</p>
                      {inv.status === "SENT" && (
                        <div className="flex gap-2 mt-2">
                          <Button
                            size="sm"
                            onClick={async () => {
                              try {
                                await api.acceptInvite(inv.id);
                                setInviteActionMessage("Invite accepted.");
                                setInvites((prev) =>
                                  prev.map((i) => (i.id === inv.id ? { ...i, status: "ACCEPTED" } : i))
                                );
                                if (tenancyId) {
                                  setTenantStatus("active");
                                  setTenancyStatus("ACTIVE");
                                  setReferenceStatus("IN_PROGRESS");
                                }
                              } catch (err: any) {
                                setInviteActionMessage(err.message || "Failed to accept invite");
                              }
                            }}
                          >
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={async () => {
                              try {
                                await api.declineInvite(inv.id);
                                setInviteActionMessage("Invite declined.");
                                setInvites((prev) =>
                                  prev.map((i) => (i.id === inv.id ? { ...i, status: "DECLINED" } : i))
                                );
                              } catch (err: any) {
                                setInviteActionMessage(err.message || "Failed to decline invite");
                              }
                            }}
                          >
                            Decline
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <p>
                Sit tight — once your agent links you to the tenancy, you&apos;ll see rent, documents,
                and maintenance here.
              </p>
              {error && (
                <p className="text-xs text-amber-700">
                  Couldn&apos;t sync tenancy status right now ({error}). We&apos;ll keep you pending.
                </p>
              )}
              {tenancyId && (
                <div className="pt-2">
                  <Button
                    onClick={async () => {
                      setActivating(true);
                      try {
                    await api.activateTenancy(tenancyId);
                    setTenantStatus("active");
                    setTenancyStatus("ACTIVE");
                    setReferenceStatus("IN_PROGRESS");
                    setAgreementStatus("NOT_SENT");
                    setError(null);
                  } catch (err: any) {
                    setError(err.message || "Failed to accept tenancy");
                  } finally {
                    setActivating(false);
                      }
                    }}
                    disabled={activating}
                  >
                    {activating ? "Accepting..." : "Accept tenancy"}
                  </Button>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Accept to activate your portal and start references.
                  </p>
                </div>
              )}
              <p className="text-xs text-slate-500">
                If something looks wrong, ask your landlord or agent to finish adding you.
              </p>
            </CardContent>
          </Card>
        </div>
      </TenantLayout>
    );
  }

  return (
    <TenantLayout>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Dashboard
          </h1>
          <p className="text-slate-500 text-sm">
            Quick overview of your maintenance requests and property.
          </p>
        </div>
      </div>

      {/* Top stats */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Open requests</CardTitle>
            <CardDescription>Still being worked on</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">0</p>
            <p className="text-xs text-slate-500 mt-1">
              Out of 0 total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Completed</CardTitle>
            <CardDescription>Jobs marked as done</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">0</p>
            <p className="text-xs text-slate-500 mt-1">
              Since you started using Propti
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Urgent issues</CardTitle>
            <CardDescription>Marked as urgent</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">0</p>
            <p className="text-xs text-slate-500 mt-1">
              We’ll prioritise these first
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>This month</CardTitle>
            <CardDescription>Requests created this month</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">0</p>
            <p className="text-xs text-slate-500 mt-1">
              New issues raised this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>References</CardTitle>
            <CardDescription>Status of your tenancy checks</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">
              {referenceStatus === "COMPLETED"
                ? "Done"
                : referenceStatus === "IN_PROGRESS"
                ? "Waiting for you"
                : "Not started"}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              After acceptance, references need to complete before the agreement is sent.
            </p>
            <Link href="/tenant/references">
              <Button size="sm" className="mt-3">
                Fill references (demo)
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Agreement</CardTitle>
            <CardDescription>Signature status</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">
              {agreementStatus === "SIGNED"
                ? "Signed"
                : agreementStatus === "SENT"
                ? "Sent"
                : "Not sent"}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              You&apos;ll receive the agreement once references are completed.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Invites</CardTitle>
            <CardDescription>Recent tenancy invites to you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {inviteActionMessage && (
              <p className="text-xs text-emerald-700">{inviteActionMessage}</p>
            )}
            {invites.length === 0 ? (
              <p className="text-sm text-slate-500">No invites found.</p>
            ) : (
              invites.map((inv) => (
                <div key={inv.id} className="border border-slate-200 rounded-md p-3">
                  <p className="text-sm font-medium text-slate-800">
                    {inv.inviterRole || "Someone"} invited you
                  </p>
                  {inv.inviterName && (
                    <p className="text-xs text-slate-600">From: {inv.inviterName}</p>
                  )}
                  {inv.propertyAddress && (
                    <p className="text-xs text-slate-600">Property: {inv.propertyAddress}</p>
                  )}
                  <p className="text-xs text-slate-500">Status: {inv.status}</p>
                  <div className="flex gap-2 mt-2">
                    <Button
                      size="sm"
                      disabled={inv.status !== "SENT"}
                      onClick={async () => {
                        try {
                          await api.acceptInvite(inv.id);
                          setInviteActionMessage("Invite accepted.");
                          setInvites((prev) =>
                            prev.map((i) =>
                              i.id === inv.id ? { ...i, status: "ACCEPTED" } : i
                            )
                          );
                          setTenantStatus("active");
                          setTenancyStatus("ACTIVE");
                          setReferenceStatus("IN_PROGRESS");
                        } catch (err: any) {
                          setInviteActionMessage(err.message || "Failed to accept invite");
                        }
                      }}
                    >
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={inv.status !== "SENT"}
                      onClick={async () => {
                        try {
                          await api.declineInvite(inv.id);
                          setInviteActionMessage("Invite declined.");
                          setInvites((prev) =>
                            prev.map((i) =>
                              i.id === inv.id ? { ...i, status: "DECLINED" } : i
                            )
                          );
                        } catch (err: any) {
                          setInviteActionMessage(err.message || "Failed to decline invite");
                        }
                      }}
                    >
                      Decline
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        {/* Recent requests */}
        <div className="md:col-span-7">
          <Card>
            <CardHeader>
              <CardTitle>Recent requests</CardTitle>
              <CardDescription>
                The last few issues you’ve reported.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {recentRequests.length === 0 ? (
                <p className="text-sm text-slate-500">
                  You haven’t raised any maintenance requests yet. When you do,
                  they’ll appear here.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <Thead>
                      <Tr>
                        <Th>ID</Th>
                        <Th>Issue</Th>
                        <Th>Status</Th>
                        <Th>Created</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {recentRequests.map((req) => (
                        <Tr key={req.id}>
                          <Td className="whitespace-nowrap">
                            <span className="text-xs font-medium">
                              {req.id}
                            </span>
                          </Td>
                          <Td>
                            <div className="text-sm font-medium">
                              {req.issueTitle}
                            </div>
                            <div className="text-xs text-slate-500">
                              {req.category}
                            </div>
                          </Td>
                          <Td>
                            <Badge
                              variant={
                                req.status === "Completed"
                                  ? "success"
                                  : req.status === "Awaiting Landlord"
                                  ? "warning"
                                  : "default"
                              }
                            >
                              {req.status}
                            </Badge>
                          </Td>
                          <Td>
                            {new Date(
                              req.createdAt
                            ).toLocaleDateString("en-GB")}
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Property summary */}
        <div className="md:col-span-5">
          <Card>
            <CardHeader>
              <CardTitle>Your property</CardTitle>
              <CardDescription>
                Where these requests are being raised.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {property ? (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-900">
                    {property.name}
                  </p>
                  <p className="text-sm text-slate-600">
                    {property.address}, {property.postcode}
                  </p>
                  <p className="text-xs text-slate-500 mt-2">
                    If anything changes (like your phone number or access
                    details), update your information in Settings so
                    contractors can reach you easily.
                  </p>
                </div>
              ) : (
                <p className="text-sm text-slate-500">
                  We couldn’t find a linked property for this tenant in
                  mock data. In a real system, your tenancy address would
                  appear here.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </TenantLayout>
  );
}
