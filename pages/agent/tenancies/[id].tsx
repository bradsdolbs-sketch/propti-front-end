import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
import { api } from "../../../lib/api";

type TenancyStatus = "Active" | "Ending soon" | "Past" | "Pending activation";

interface AgentTenancyDetail {
  id: string;
  propertyLabel: string;
  postcode: string;
  landlordName: string;
  landlordEmail?: string;
  tenants: string[];
  start: string;
  end: string;
  rent: number;
  deposit: number;
  status: TenancyStatus;
  // Simple flags – think of this as the link to landlord/tenant portals
  tenantPortalEnabled: boolean;
  landlordPortalEnabled: boolean;
}

const tenancies: AgentTenancyDetail[] = [
  {
    id: "TEN-1001",
    propertyLabel: "22 Anthony House, Pembury Place",
    postcode: "E5 8GZ",
    landlordName: "Bipin Uka",
    landlordEmail: "bipin@example.com",
    tenants: ["Danise Fang", "Phuong Ly"],
    start: "2025-06-12",
    end: "2026-06-11",
    rent: 2000,
    deposit: 2308,
    status: "Active",
    tenantPortalEnabled: true,
    landlordPortalEnabled: true,
  },
  {
    id: "TEN-1002",
    propertyLabel: "Central Gate, Commercial Road",
    postcode: "E1 1LN",
    landlordName: "Central Gate Holdings Ltd",
    landlordEmail: "landlord@centralgate.com",
    tenants: ["John Smith"],
    start: "2025-12-01",
    end: "2026-11-30",
    rent: 1750,
    deposit: 2000,
    status: "Pending activation",
    tenantPortalEnabled: false,
    landlordPortalEnabled: true,
  },
];

function statusVariant(status: TenancyStatus): "success" | "warning" | "default" {
  switch (status) {
    case "Active":
      return "success";
    case "Pending activation":
      return "warning";
    case "Ending soon":
      return "warning";
    case "Past":
      return "default";
  }
}

function formatGBP(value: number): string {
  return `£${value.toFixed(0)}`;
}

export default function AgentTenancyDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const tenancy = tenancies.find((t) => t.id === id);

  if (!tenancy) {
    return (
      <AgentLayout>
        <div className="max-w-5xl mx-auto">
          <p className="text-sm text-slate-500">Tenancy not found.</p>
        </div>
      </AgentLayout>
    );
  }

  const startDate = new Date(tenancy.start).toLocaleDateString("en-GB");
  const endDate = new Date(tenancy.end).toLocaleDateString("en-GB");
  const [statusState, setStatusState] = useState<TenancyStatus>(tenancy.status);
  const [tenantPortalEnabled, setTenantPortalEnabled] = useState<boolean>(
    tenancy.tenantPortalEnabled
  );
  const [referenceStatus, setReferenceStatus] = useState<"NOT_STARTED" | "IN_PROGRESS" | "COMPLETED" | null>(null);
  const [agreementStatus, setAgreementStatus] = useState<"NOT_SENT" | "SENT" | "SIGNED" | null>(null);
  const [tenancyId, setTenancyId] = useState<string | null>(null);

  useEffect(() => {
    api
      .getTenancyForTenant("T-1001")
      .then((t) => {
        setTenancyId(t.id);
        setReferenceStatus(t.referenceStatus ?? null);
        setAgreementStatus(t.agreementStatus ?? null);
      })
      .catch(() => {
        /* demo */
      });
  }, []);

  return (
    <AgentLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {statusState === "Pending activation" && (
          <div className="rounded-md border border-amber-200 bg-amber-50 px-3 py-3 text-sm text-amber-800">
            Tenant portal is not activated yet. Add the tenant to this tenancy to switch them from
            “waiting” to “active” in their portal.
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <p
              className="text-xs text-slate-500 cursor-pointer hover:underline"
              onClick={() => router.push("/agent/tenancies")}
            >
              ← Back to tenancies
            </p>
            <h1 className="text-2xl font-semibold text-slate-900 mt-2">
              {tenancy.propertyLabel}
            </h1>
            <p className="text-sm text-slate-500">
              {tenancy.postcode} · {tenancy.id}
            </p>
          </div>
          <div className="text-right space-y-2">
            <Badge variant={statusVariant(statusState)}>
              {statusState}
            </Badge>
            <p className="text-xs text-slate-500">
              Term: <span className="font-medium">{startDate}</span> –{" "}
              <span className="font-medium">{endDate}</span>
            </p>
          </div>
        </div>

        {/* Top row – landlord + tenants + financials */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* Landlord */}
          <Card>
            <CardHeader>
              <CardTitle>Landlord</CardTitle>
              <CardDescription>
                Contact details and portal status.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-3">
              <div>
                <p className="text-xs text-slate-500">Name</p>
                <p className="font-medium">{tenancy.landlordName}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Email</p>
                <p className="font-medium">
                  {tenancy.landlordEmail ?? "Not captured"}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Landlord portal</p>
                <Badge
                  variant={
                    tenancy.landlordPortalEnabled ? "success" : "default"
                  }
                >
                  {tenancy.landlordPortalEnabled ? "Enabled" : "Disabled"}
                </Badge>
              </div>
              <Button size="sm" variant="outline" disabled>
                Manage landlord access (demo)
              </Button>
            </CardContent>
          </Card>

          {/* Tenants */}
          <Card>
            <CardHeader>
              <CardTitle>Tenants</CardTitle>
              <CardDescription>
                Occupiers linked to this tenancy.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-3">
              <div>
                <p className="text-xs text-slate-500">Names</p>
                <p className="font-medium">
                  {tenancy.tenants.join(", ")}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Tenant portal</p>
                <Badge
                  variant={tenantPortalEnabled ? "success" : "default"}
                >
                  {tenantPortalEnabled ? "Enabled" : "Disabled"}
                </Badge>
                {!tenantPortalEnabled && (
                  <p className="text-xs text-amber-700 mt-1">
                    Tenants currently see “We’re setting up your tenancy.”
                  </p>
                )}
              </div>
              <p className="text-[11px] text-slate-400">
                In future this would show which tenants have activated their
                accounts and last login times.
              </p>
              <Button
                size="sm"
                variant={statusState === "Pending activation" ? "default" : "outline"}
                onClick={() => {
                  setTenantPortalEnabled(true);
                  setStatusState("Active");
                }}
              >
                {statusState === "Pending activation"
                  ? "Add tenant to tenancy (demo)"
                  : "Manage tenant access (demo)"}
              </Button>
            </CardContent>
          </Card>

          {/* Financials */}
          <Card>
            <CardHeader>
              <CardTitle>Financials</CardTitle>
              <CardDescription>
                Rent and deposit as per AST.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-3">
              <div>
                <p className="text-xs text-slate-500">Rent</p>
                <p className="font-medium">{formatGBP(tenancy.rent)} / month</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Deposit</p>
                <p className="font-medium">
                  {formatGBP(tenancy.deposit)}
                </p>
              </div>
              <p className="text-[11px] text-slate-400">
                You could later link this to actual rent collection data or a
                client account integration.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Second row – documents + maintenance + references */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
              <CardDescription>
                Tenancy docs shared with landlord & tenants.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>AST · Deposit certificate · Gas safety · EICR · EPC</p>
              <p className="text-[11px] text-slate-400">
                Mirrors what the tenant sees in their Documents tab and what
                the landlord sees in their portal.
              </p>
              <Button size="sm" variant="outline" disabled>
                Open document folder (demo)
              </Button>
            </CardContent>
          </Card>

          {/* Maintenance */}
          <Card>
            <CardHeader>
              <CardTitle>Maintenance</CardTitle>
              <CardDescription>
                Requests & jobs linked to this tenancy.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>
                For now, imagine this showing a list like:
                <br />
                <span className="font-medium">
                  • Boiler not working (In progress) – ABC Plumbing
                  <br />
                  • Leaking sink (Completed) – Central Gate Maintenance
                </span>
              </p>
              <Button size="sm" variant="outline" disabled>
                View maintenance for this tenancy (demo)
              </Button>
            </CardContent>
          </Card>

          {/* References */}
          <Card>
            <CardHeader>
              <CardTitle>References</CardTitle>
              <CardDescription>
                Onboarding status for this tenancy.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>
                ID, right to rent, affordability, guarantor – all centralised
                against this one tenancy.
              </p>
              <p className="text-[11px] text-slate-400">
                Ties into the Admin verification screens you already have and
                could be exposed in a lightweight way to landlords as a
                &quot;tick list&quot;.
              </p>
              <Button size="sm" variant="outline" disabled>
                Open reference pack (demo)
              </Button>
            </CardContent>
          </Card>

          {/* References + Agreement actions */}
          <Card>
            <CardHeader>
              <CardTitle>References & Agreement</CardTitle>
              <CardDescription>
                Move the tenancy forward once checks are done.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">References:</span>
                <Badge variant={referenceStatus === "COMPLETED" ? "success" : "warning"}>
                  {referenceStatus ?? "N/A"}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Agreement:</span>
                <Badge variant={agreementStatus === "SIGNED" ? "success" : "default"}>
                  {agreementStatus ?? "N/A"}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                {tenancyId && referenceStatus !== "COMPLETED" && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={async () => {
                      if (!tenancyId) return;
                      const res = await api.completeReferences(tenancyId);
                      setReferenceStatus(res.referenceStatus ?? null);
                    }}
                  >
                    Mark references complete
                  </Button>
                )}
                {tenancyId && agreementStatus === "NOT_SENT" && (
                  <Button
                    size="sm"
                    onClick={async () => {
                      const res = await api.sendAgreement(tenancyId);
                      setAgreementStatus(res.agreementStatus ?? null);
                    }}
                  >
                    Send agreement
                  </Button>
                )}
                {tenancyId && agreementStatus === "SENT" && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={async () => {
                      const res = await api.signAgreement(tenancyId);
                      setAgreementStatus(res.agreementStatus ?? null);
                    }}
                  >
                    Mark signed
                  </Button>
                )}
              </div>
              <p className="text-[11px] text-slate-400">
                Demo flow only; in production this would trigger emails/signature requests and attach the signed PDF.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AgentLayout>
  );
}
