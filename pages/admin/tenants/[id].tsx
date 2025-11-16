import { useRouter } from "next/router";
import AdminLayout from "../../../layouts/AdminLayout";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";

type TenantStatus = "Active" | "Onboarding" | "Moved out";

interface AdminTenantDetail {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: TenantStatus;
  createdAt: string;
  // Current tenancy snapshot
  propertyLabel: string;
  postcode: string;
  landlordName: string;
  agentName?: string;
  rent: number;
  deposit: number;
  tenancyStart: string;
  tenancyEnd: string;
  // Verification
  idVerified: boolean;
  rightToRentVerified: boolean;
  referencesComplete: boolean;
  guarantorRequired: boolean;
  guarantorProvided: boolean;
}

const tenantDetails: AdminTenantDetail[] = [
  {
    id: "T-1001",
    name: "Danise Fang",
    email: "danise@example.com",
    phone: "+44 7700 900001",
    status: "Active",
    createdAt: "2025-05-20",
    propertyLabel: "22 Anthony House, Pembury Place",
    postcode: "E5 8GZ",
    landlordName: "Bipin Uka",
    agentName: "Central Gate Estates",
    rent: 2000,
    deposit: 2308,
    tenancyStart: "2025-06-12",
    tenancyEnd: "2026-06-11",
    idVerified: true,
    rightToRentVerified: true,
    referencesComplete: true,
    guarantorRequired: false,
    guarantorProvided: false,
  },
  {
    id: "T-1002",
    name: "Phuong Ly",
    email: "phuong@example.com",
    phone: "+44 7700 900002",
    status: "Active",
    createdAt: "2025-05-20",
    propertyLabel: "22 Anthony House, Pembury Place",
    postcode: "E5 8GZ",
    landlordName: "Bipin Uka",
    agentName: "Central Gate Estates",
    rent: 2000,
    deposit: 2308,
    tenancyStart: "2025-06-12",
    tenancyEnd: "2026-06-11",
    idVerified: true,
    rightToRentVerified: true,
    referencesComplete: true,
    guarantorRequired: false,
    guarantorProvided: false,
  },
  {
    id: "T-1003",
    name: "John Smith",
    email: "john@example.com",
    phone: "+44 7700 900003",
    status: "Onboarding",
    createdAt: "2025-11-11",
    propertyLabel: "Central Gate, Commercial Road",
    postcode: "E1 1LN",
    landlordName: "Central Gate Holdings Ltd",
    agentName: "Central Gate Estates",
    rent: 1750,
    deposit: 2000,
    tenancyStart: "2025-12-01",
    tenancyEnd: "2026-11-30",
    idVerified: false,
    rightToRentVerified: false,
    referencesComplete: false,
    guarantorRequired: true,
    guarantorProvided: false,
  },
];

function statusVariant(status: TenantStatus): "success" | "warning" | "default" {
  switch (status) {
    case "Active":
      return "success";
    case "Onboarding":
      return "warning";
    case "Moved out":
      return "default";
  }
}

function formatGBP(value: number): string {
  return `£${value.toFixed(0)}`;
}

export default function AdminTenantDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const tenant = tenantDetails.find((t) => t.id === id);

  if (!tenant) {
    return (
      <AdminLayout>
        <div className="max-w-5xl mx-auto">
          <p className="text-sm text-slate-500">Tenant not found.</p>
        </div>
      </AdminLayout>
    );
  }

  const createdDate = new Date(tenant.createdAt).toLocaleDateString("en-GB");
  const startDate = new Date(tenant.tenancyStart).toLocaleDateString("en-GB");
  const endDate = new Date(tenant.tenancyEnd).toLocaleDateString("en-GB");

  const missingItems: string[] = [];
  if (!tenant.idVerified) missingItems.push("ID");
  if (!tenant.rightToRentVerified) missingItems.push("Right to rent");
  if (!tenant.referencesComplete) missingItems.push("References");
  if (tenant.guarantorRequired && !tenant.guarantorProvided) {
    missingItems.push("Guarantor");
  }

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p
              className="text-xs text-slate-500 cursor-pointer hover:underline"
              onClick={() => router.push("/admin/tenants")}
            >
              ← Back to tenants
            </p>
            <h1 className="text-2xl font-semibold text-slate-900 mt-2">
              {tenant.name}
            </h1>
            <p className="text-sm text-slate-500">
              {tenant.email}
              {tenant.phone && ` · ${tenant.phone}`}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {tenant.id} · Created {createdDate}
            </p>
          </div>

          <div className="text-right space-y-2">
            <Badge variant={statusVariant(tenant.status)}>
              {tenant.status}
            </Badge>
            <p className="text-xs text-slate-500">
              Current tenancy:{" "}
              <span className="font-medium">
                {tenant.propertyLabel} ({tenant.postcode})
              </span>
            </p>
            {missingItems.length > 0 ? (
              <p className="text-[11px] text-amber-600">
                Missing: {missingItems.join(", ")}
              </p>
            ) : (
              <p className="text-[11px] text-emerald-600">
                All core verification items complete.
              </p>
            )}
          </div>
        </div>

        {/* Top row – Profile + tenancy snapshot */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* Profile */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                Basic details used for the tenant portal and referencing.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-3">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-xs text-slate-500">Name</p>
                  <p className="font-medium">{tenant.name}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Status</p>
                  <p className="font-medium">{tenant.status}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Email</p>
                  <p className="font-medium">{tenant.email}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Phone</p>
                  <p className="font-medium">
                    {tenant.phone ?? "Not provided"}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Button size="sm" variant="outline" disabled>
                  Edit profile (demo only)
                </Button>
                <Button size="sm" variant="outline" disabled>
                  Impersonate tenant (demo only)
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tenancy snapshot */}
          <Card>
            <CardHeader>
              <CardTitle>Tenancy</CardTitle>
              <CardDescription>
                Key details for this tenant&apos;s current home.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-3">
              <div>
                <p className="text-xs text-slate-500">Property</p>
                <p className="font-medium">
                  {tenant.propertyLabel}, {tenant.postcode}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Landlord / Agent</p>
                <p className="font-medium">
                  {tenant.landlordName}
                  {tenant.agentName && ` (via ${tenant.agentName})`}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Rent</p>
                <p className="font-medium">{formatGBP(tenant.rent)} / month</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Deposit</p>
                <p className="font-medium">{formatGBP(tenant.deposit)}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Tenancy dates</p>
                <p className="font-medium">
                  {startDate} – {endDate}
                </p>
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                This mirrors what the tenant sees under their Rent / Documents
                tabs, so everyone is looking at the same source of truth.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Verification & docs */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Verification checklist */}
          <Card>
            <CardHeader>
              <CardTitle>Verification checklist</CardTitle>
              <CardDescription>
                Standard onboarding steps for this tenant.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-3">
              <VerifyRow label="ID check" done={tenant.idVerified} />
              <VerifyRow
                label="Right to rent"
                done={tenant.rightToRentVerified}
              />
              <VerifyRow
                label="References / affordability"
                done={tenant.referencesComplete}
              />
              <VerifyRow
                label="Guarantor required"
                done={!tenant.guarantorRequired}
                extra={
                  tenant.guarantorRequired
                    ? tenant.guarantorProvided
                      ? "Guarantor provided"
                      : "Guarantor still outstanding"
                    : "Not required for this tenancy"
                }
              />

              <p className="text-[11px] text-slate-400 mt-2">
                Later you could show which agency handled referencing and
                upload the full reference pack here.
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                <Button size="sm" disabled>
                  Mark all as approved (demo only)
                </Button>
                <Button size="sm" variant="outline" disabled>
                  Request missing items (demo only)
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Documents summary */}
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
              <CardDescription>
                Quick view of what&apos;s on file for this tenant.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-3">
              <div className="space-y-2">
                <DocRow
                  label="AST"
                  description="Signed tenancy agreement"
                  done
                />
                <DocRow
                  label="Deposit certificate"
                  description="Evidence of deposit protection"
                  done
                />
                <DocRow
                  label="Right to rent files"
                  description="Scans / share code used for checks"
                  done={tenant.rightToRentVerified}
                />
                <DocRow
                  label="Reference pack"
                  description="Affordability & previous landlord ref"
                  done={tenant.referencesComplete}
                />
              </div>

              <p className="text-[11px] text-slate-400 mt-2">
                These line up with the files available to the tenant on their
                Documents page – you can think of this as the admin view into
                the same underlying folder.
              </p>

              <div className="mt-3 border border-dashed border-slate-300 rounded-lg p-3 flex flex-col items-center text-center gap-2">
                <p className="text-sm font-medium text-slate-700">
                  Document upload area (demo only)
                </p>
                <p className="text-xs text-slate-500 max-w-xs">
                  In the full product, you&apos;d see the actual PDFs here with
                  upload dates, and could drag-and-drop new versions if needed.
                </p>
                <Button size="sm" variant="outline" disabled>
                  Upload document (demo only)
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}

function VerifyRow({
  label,
  done,
  extra,
}: {
  label: string;
  done: boolean;
  extra?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm text-slate-800">{label}</p>
        {extra && (
          <p className="text-[11px] text-slate-500 mt-0.5">{extra}</p>
        )}
      </div>
      <Badge variant={done ? "success" : "default"}>
        {done ? "Complete" : "Missing"}
      </Badge>
    </div>
  );
}

function DocRow({
  label,
  description,
  done,
}: {
  label: string;
  description: string;
  done: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-slate-900">{label}</p>
        <p className="text-[11px] text-slate-500">{description}</p>
      </div>
      <Badge variant={done ? "success" : "default"}>
        {done ? "On file" : "Missing"}
      </Badge>
    </div>
  );
}
