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
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "../../../lib/api";
import { Input } from "../../../components/ui/input";
import { useRouter } from "next/router";

// NEW: Empty state + icon
import EmptyState from "../../../components/ui/empty-state";
import { Home } from "lucide-react";

type Status = "Occupied" | "Vacant";
type TenancyStatus = "active" | "pending" | "vacant";

interface PropertyRow {
  id: string;
  name: string;
  address: string;
  postcode: string;
  tenant?: string;
  tenantEmail?: string;
  rent: string;
  status: Status;
  tenancyStatus: TenancyStatus;
  tenancyId?: string;
  referenceStatus?: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  agreementStatus?: "NOT_SENT" | "SENT" | "SIGNED";
}

function statusVariant(status: Status): "default" | "success" | "warning" {
  return status === "Occupied" ? "success" : "warning";
}

function tenancyVariant(status: TenancyStatus): "default" | "success" | "warning" {
  switch (status) {
    case "active":
      return "success";
    case "pending":
      return "warning";
    case "vacant":
    default:
      return "default";
  }
}

function refBadgeVariant(status?: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED"): "default" | "warning" | "success" {
  switch (status) {
    case "COMPLETED":
      return "success";
    case "IN_PROGRESS":
      return "warning";
    default:
      return "default";
  }
}

export default function LandlordPropertiesPage() {
  const [propertiesState, setPropertiesState] = useState<PropertyRow[]>([]);
  const [loading, setLoading] = useState(true);
  const hasProperties = propertiesState.length > 0;
  const [showModalFor, setShowModalFor] = useState<string | null>(null);
  const [formState, setFormState] = useState({
    tenantName: "",
    tenantEmail: "",
    ownerEmail: "",
    startDate: "",
    monthlyRent: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [landlordId, setLandlordId] = useState<string | null>(null);
  const [inviteMessage, setInviteMessage] = useState<string | null>(null);
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [newProperty, setNewProperty] = useState({
    name: "",
    address: "",
    postcode: "",
  });
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    api
      .getCurrentUser()
      .then((me) => {
        if (cancelled) return;
        if (me?.id) {
          setLandlordId(me.id);
          return api.listProperties(me.id).then((props) => {
            if (cancelled) return;
            setPropertiesState(
              props.map((p) => ({
                id: p.id,
                name: p.name,
                address: p.address,
                postcode: p.postcode,
                tenant: p.tenantName || undefined,
                tenantEmail: p.tenantEmail || undefined,
                rent: p.rent ? formatGBP(p.rent) + "/mo" : "N/A",
                status: (p.status as Status) || "Vacant",
                tenancyStatus: p.tenantStatus
                  ? p.tenantStatus === "ACTIVE"
                    ? "active"
                    : "pending"
                  : "vacant",
                tenancyId: p.tenancyId,
                referenceStatus: p.referenceStatus,
                agreementStatus: p.agreementStatus,
              }))
            );
          });
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const submitNewProperty = async () => {
    setAddError(null);
    setAdding(true);
    try {
      if (!landlordId) throw new Error("No landlord session");
      const created = await api.createProperty(landlordId, {
        name: newProperty.name,
        address: newProperty.address,
        postcode: newProperty.postcode,
        paid: false,
      });
      // refresh list from backend to ensure persistence
      const refreshed = await api.listProperties(landlordId);
      setPropertiesState(
        refreshed.map((p) => ({
          id: p.id,
          name: p.name,
          address: p.address,
          postcode: p.postcode,
          tenant: p.tenantName || undefined,
          tenantEmail: p.tenantEmail || undefined,
          rent: p.rent ? formatGBP(p.rent) + "/mo" : "N/A",
          status: (p.status as Status) || "Vacant",
          tenancyStatus: p.tenantStatus
            ? p.tenantStatus === "ACTIVE"
              ? "active"
              : "pending"
            : "vacant",
          tenancyId: p.tenancyId,
          referenceStatus: p.referenceStatus,
          agreementStatus: p.agreementStatus,
        }))
      );
      setNewProperty({ name: "", address: "", postcode: "" });
      setShowAddProperty(false);
    } catch (err: any) {
      setAddError(err.message || "Failed to add property");
    } finally {
      setAdding(false);
    }
  };

  const resetForm = () => {
    setFormState({ tenantName: "", tenantEmail: "", ownerEmail: "", startDate: "", monthlyRent: "" });
    setError(null);
  };

  const handleStartTenancy = (id: string) => {
    setShowModalFor(id);
  };

  const submitTenancy = async () => {
    if (!showModalFor) return;
    setSubmitting(true);
    setError(null);
    setInviteMessage(null);
    const effectiveLandlord = landlordId || "landlord-demo";
    const inviterName =
      (typeof window !== "undefined" && window.localStorage.getItem("propti_user_name")) ||
      "Landlord";
    const property = propertiesState.find((p) => p.id === showModalFor);
    const propertyAddress = property ? `${property.address}, ${property.postcode}` : undefined;
    try {
      const tenancy = await api.createTenancy({
        landlordId: effectiveLandlord,
        propertyId: showModalFor,
        tenantId: formState.tenantEmail || "tenant-" + showModalFor,
        tenantName: formState.tenantName,
        tenantEmail: formState.tenantEmail,
        ownerEmail: formState.ownerEmail || undefined,
        startDate: formState.startDate,
        monthlyRent: formState.monthlyRent ? parseInt(formState.monthlyRent, 10) : undefined,
      });

      setPropertiesState((prev) =>
        prev.map((p) =>
          p.id === showModalFor
            ? {
                ...p,
                status: "Occupied",
                tenancyStatus: "pending",
                tenancyId: tenancy.id,
                tenant: formState.tenantName || formState.tenantEmail || "New tenant (invite sent)",
                referenceStatus: "NOT_STARTED",
                agreementStatus: "NOT_SENT",
              }
            : p
        )
      );
      try {
        const invite = await api.sendTenantInvite({
          tenantEmail: formState.tenantEmail,
          inviterRole: "LANDLORD",
          tenancyId: tenancy.id,
          inviteeRole: "tenant",
          inviterName,
          propertyAddress,
        });
        setInviteMessage(`Invite sent to ${invite.tenantEmail}`);
        if (formState.ownerEmail) {
          await api.sendTenantInvite({
            tenantEmail: formState.ownerEmail,
            inviterRole: "LANDLORD",
            tenancyId: tenancy.id,
            inviteeRole: "owner",
            inviterName,
            propertyAddress,
          });
          setInviteMessage((prev) =>
            prev
              ? `${prev} | Owner invite sent to ${formState.ownerEmail}`
              : `Owner invite sent to ${formState.ownerEmail}`
          );
        }
      } catch (inviteErr: any) {
        setInviteMessage(inviteErr.message || "Invite could not be sent. Ask the tenant to sign up.");
      }
      setShowModalFor(null);
      resetForm();
    } catch (err: any) {
      setError(err.message || "Failed to create tenancy");
    } finally {
      setSubmitting(false);
    }
  };

  const handleMarkActive = async (id: string, tenancyId?: string) => {
    if (!tenancyId) return;
    try {
      await api.activateTenancy(tenancyId);
      setPropertiesState((prev) =>
        prev.map((p) =>
          p.id === id
            ? {
                ...p,
                tenancyStatus: "active",
              }
            : p
        )
      );
    } catch (err) {
      console.error("Failed to mark tenancy active", err);
    }
  };

  const handleSendAgreement = async (tenancyId?: string) => {
    if (!tenancyId) return;
    try {
      await api.sendAgreement(tenancyId);
      router.push("/landlord/requests"); // placeholder navigation to show next step
    } catch (err) {
      console.error("Failed to send agreement", err);
    }
  };

  return (
    <LandlordLayout>
      {loading && (
        <div className="text-sm text-slate-500 mb-4">Loading properties...</div>
      )}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Properties</h1>
          <p className="text-slate-500 text-sm">
            Manage and track your owned properties.
          </p>
        </div>

        {/* CHANGED: real button that links to a form page */}
        <Button onClick={() => setShowAddProperty(true)}>Add new property</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your properties</CardTitle>
          <CardDescription>
            Overview of all properties linked to your account.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* EMPTY STATE */}
          {!hasProperties ? (
            <EmptyState
              title="No properties yet"
              description="Any properties linked to your account will appear here."
              icon={<Home size={40} />}
              action={<Button disabled>Add property (coming soon)</Button>}
            />
          ) : (
            <div className="space-y-4">
              {propertiesState.map((p) => (
                <div
                  key={p.id}
                  className="flex flex-col md:flex-row md:items-center md:justify-between border border-slate-200 p-4 rounded-lg"
                >
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-lg font-semibold">{p.name}</h3>
                      <Badge variant={statusVariant(p.status)}>{p.status}</Badge>
                      {p.tenancyStatus !== "vacant" && (
                        <Badge variant={tenancyVariant(p.tenancyStatus)}>
                          {p.tenancyStatus === "pending"
                            ? "Tenancy pending"
                            : p.tenancyStatus === "active"
                            ? "Tenancy active"
                            : "N/A"}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-slate-600">
                      {p.address}, {p.postcode}
                    </p>
                    <div className="grid md:grid-cols-3 gap-3 text-sm">
                      <div>
                        <p className="text-xs text-slate-500">Tenant</p>
                        <p className="font-medium">
                          {p.tenant ? p.tenant : "Vacant"}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {p.tenancyStatus === "pending"
                            ? "Waiting for agent to add the tenant to the tenancy."
                            : p.tenancyStatus === "vacant"
                            ? "No active tenancy yet."
                            : "Tenancy active and visible to the tenant."}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">References</p>
                        <Badge variant={refBadgeVariant(p.referenceStatus)}>
                          {p.referenceStatus && p.tenancyStatus !== "vacant"
                            ? p.referenceStatus === "IN_PROGRESS"
                              ? "Waiting for references"
                              : p.referenceStatus
                            : "N/A"}
                        </Badge>
                        <p className="text-[11px] text-slate-500 mt-1">
                          Complete references before sending the agreement.
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Agreement</p>
                        <Badge
                          variant={
                            p.agreementStatus === "SIGNED"
                              ? "success"
                              : p.agreementStatus === "SENT"
                              ? "warning"
                              : "default"
                          }
                        >
                          {p.agreementStatus && p.tenancyStatus !== "vacant" ? p.agreementStatus : "N/A"}
                        </Badge>
                        <p className="text-[11px] text-slate-500 mt-1">
                          Send agreement once references are done.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-start md:items-end gap-2 mt-4 md:mt-0">
                    <p className="font-medium text-slate-700">{p.rent}</p>

                    <div className="flex flex-wrap gap-2">
                      <Link href={`/landlord/properties/${p.id}/edit`}>
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                      </Link>

                      <Link href={`/landlord/properties/${p.id}`}>
                        <Button size="sm" variant="ghost">
                          View
                        </Button>
                      </Link>

                      {p.tenancyStatus === "vacant" && (
                        <Button size="sm" onClick={() => handleStartTenancy(p.id)}>
                          Start tenancy
                        </Button>
                      )}

                      {p.tenancyStatus === "pending" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleMarkActive(p.id, p.tenancyId)}
                        >
                          Mark tenant active (demo)
                        </Button>
                      )}
                      {p.tenancyStatus === "active" && (
                        <Button size="sm" onClick={() => handleSendAgreement(p.tenancyId)}>
                          Send tenancy agreement (demo)
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {showModalFor && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Start tenancy</h2>
                <p className="text-sm text-slate-500">
                  Enter tenant details and send the invite.
                </p>
              </div>
              <button
                onClick={() => {
                  setShowModalFor(null);
                  resetForm();
                }}
                className="text-slate-500 hover:text-slate-900"
              >
                ×
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Tenant name
                </label>
                <Input
                  value={formState.tenantName}
                  onChange={(e) => setFormState((s) => ({ ...s, tenantName: e.target.value }))}
                  placeholder="e.g. Jane Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Tenant email
                </label>
                <Input
                  type="email"
                  value={formState.tenantEmail}
                  onChange={(e) => setFormState((s) => ({ ...s, tenantEmail: e.target.value }))}
                  placeholder="tenant@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Owner email (optional)
                </label>
                <Input
                  type="email"
                  value={formState.ownerEmail}
                  onChange={(e) => setFormState((s) => ({ ...s, ownerEmail: e.target.value }))}
                  placeholder="owner@example.com"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Start date
                  </label>
                  <Input
                    type="date"
                    value={formState.startDate}
                    onChange={(e) => setFormState((s) => ({ ...s, startDate: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Monthly rent (£)
                  </label>
                  <Input
                    type="number"
                    value={formState.monthlyRent}
                    onChange={(e) => setFormState((s) => ({ ...s, monthlyRent: e.target.value }))}
                    placeholder="2000"
                  />
                </div>
              </div>
              {error && <p className="text-xs text-amber-700">{error}</p>}
              {inviteMessage && <p className="text-xs text-slate-600">{inviteMessage}</p>}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowModalFor(null);
                  resetForm();
                }}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button onClick={submitTenancy} disabled={submitting}>
                {submitting ? "Sending invite..." : "Send invite"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {showAddProperty && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Add property</h2>
                <p className="text-sm text-slate-500">
                  Add a property to your account. £50.00/mo per property. You can skip payment for now.
                </p>
              </div>
              <button
                onClick={() => {
                  setShowAddProperty(false);
                  setAddError(null);
                }}
                className="text-slate-500 hover:text-slate-900"
              >
                ×
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Property name
                </label>
                <Input
                  value={newProperty.name}
                  onChange={(e) => setNewProperty((s) => ({ ...s, name: e.target.value }))}
                  placeholder="e.g. 22 Anthony House"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Address
                </label>
                <Input
                  value={newProperty.address}
                  onChange={(e) => setNewProperty((s) => ({ ...s, address: e.target.value }))}
                  placeholder="Street and number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Postcode
                </label>
                <Input
                  value={newProperty.postcode}
                  onChange={(e) => setNewProperty((s) => ({ ...s, postcode: e.target.value }))}
                  placeholder="Postcode"
                />
              </div>
              {addError && <p className="text-xs text-amber-700">{addError}</p>}
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button
                className="w-full"
                disabled={adding}
                onClick={submitNewProperty}
                disabled={adding || !newProperty.name}
              >
                {adding ? "Saving..." : "Add property"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </LandlordLayout>
  );
}
