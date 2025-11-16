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

type LandlordStatus = "Active" | "Onboarding" | "Paused";

interface AdminLandlordDetail {
  id: string;
  name: string;
  email: string;
  phone?: string;
  type: "Individual" | "Company";
  status: LandlordStatus;
  createdAt: string;
  // Portfolio snapshot
  propertiesCount: number;
  activeTenancies: number;
  openRequests: number;
  // Verification
  idVerified: boolean;
  ownershipVerified: boolean;
  bankDetailsVerified: boolean;
  amlCheckComplete: boolean;
}

interface LandlordPropertyRow {
  id: string;
  label: string;
  postcode: string;
  tenanciesCount: number;
  docsSummary: string; // e.g. "AST, Gas, EICR, EPC"
  missingDocs: number;
}

const landlordDetails: AdminLandlordDetail[] = [
  {
    id: "LL-1001",
    name: "Bipin Uka",
    email: "bipin@example.com",
    phone: "+44 20 0000 1001",
    type: "Individual",
    status: "Active",
    createdAt: "2025-05-01",
    propertiesCount: 2,
    activeTenancies: 2,
    openRequests: 1,
    idVerified: true,
    ownershipVerified: true,
    bankDetailsVerified: true,
    amlCheckComplete: true,
  },
  {
    id: "LL-1002",
    name: "Central Gate Holdings Ltd",
    email: "accounts@centralgate.example.com",
    phone: "+44 20 0000 2002",
    type: "Company",
    status: "Active",
    createdAt: "2025-04-15",
    propertiesCount: 5,
    activeTenancies: 4,
    openRequests: 3,
    idVerified: true,
    ownershipVerified: true,
    bankDetailsVerified: true,
    amlCheckComplete: true,
  },
  {
    id: "LL-1003",
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "+44 20 0000 3003",
    type: "Individual",
    status: "Onboarding",
    createdAt: "2025-11-12",
    propertiesCount: 1,
    activeTenancies: 0,
    openRequests: 0,
    idVerified: false,
    ownershipVerified: false,
    bankDetailsVerified: false,
    amlCheckComplete: false,
  },
];

const landlordProperties: Record<string, LandlordPropertyRow[]> = {
  "LL-1001": [
    {
      id: "PROP-2001",
      label: "22 Anthony House, Pembury Place",
      postcode: "E5 8GZ",
      tenanciesCount: 1,
      docsSummary: "AST, Gas, EICR, EPC",
      missingDocs: 0,
    },
    {
      id: "PROP-2002",
      label: "Central Gate, Commercial Road",
      postcode: "E1 1LN",
      tenanciesCount: 1,
      docsSummary: "AST, EICR, EPC",
      missingDocs: 1, // e.g. gas cert missing
    },
  ],
  "LL-1002": [
    {
      id: "PROP-3001",
      label: "Building A, Central Gate",
      postcode: "E1 1LN",
      tenanciesCount: 2,
      docsSummary: "AST, Gas, EICR, EPC",
      missingDocs: 0,
    },
  ],
  "LL-1003": [
    {
      id: "PROP-4001",
      label: "Flat 2, New Build Example",
      postcode: "N1 1AA",
      tenanciesCount: 0,
      docsSummary: "No docs uploaded",
      missingDocs: 4,
    },
  ],
};

function statusVariant(status: LandlordStatus): "success" | "warning" | "default" {
  switch (status) {
    case "Active":
      return "success";
    case "Onboarding":
      return "warning";
    case "Paused":
      return "default";
  }
}

export default function AdminLandlordDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const landlord = landlordDetails.find((l) => l.id === id);

  if (!landlord) {
    return (
      <AdminLayout>
        <div className="max-w-5xl mx-auto">
          <p className="text-sm text-slate-500">Landlord not found.</p>
        </div>
      </AdminLayout>
    );
  }

  const props = landlordProperties[landlord.id] ?? [];
  const createdDate = new Date(landlord.createdAt).toLocaleDateString("en-GB");

  const missingItems: string[] = [];
  if (!landlord.idVerified) missingItems.push("ID");
  if (!landlord.ownershipVerified) missingItems.push("Proof of ownership");
  if (!landlord.bankDetailsVerified) missingItems.push("Bank details");
  if (!landlord.amlCheckComplete) missingItems.push("AML check");

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p
              className="text-xs text-slate-500 cursor-pointer hover:underline"
              onClick={() => router.push("/admin/landlords")}
            >
              ← Back to landlords
            </p>
            <h1 className="text-2xl font-semibold text-slate-900 mt-2">
              {landlord.name}
            </h1>
            <p className="text-sm text-slate-500">
              {landlord.email}
              {landlord.phone && ` · ${landlord.phone}`}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {landlord.id} · {landlord.type} · Joined {createdDate}
            </p>
          </div>

          <div className="text-right space-y-2">
            <Badge variant={statusVariant(landlord.status)}>
              {landlord.status}
            </Badge>
            <p className="text-xs text-slate-500">
              Properties:{" "}
              <span className="font-medium">
                {landlord.propertiesCount}
              </span>{" "}
              · Active tenancies:{" "}
              <span className="font-medium">
                {landlord.activeTenancies}
              </span>
            </p>
            <p className="text-xs text-slate-500">
              Open maintenance requests:{" "}
              <span className="font-medium">
                {landlord.openRequests}
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

        {/* Top row – Profile + portfolio snapshot */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* Profile */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                Core landlord details used on the landlord manager / agent portals.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-3">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-xs text-slate-500">Name</p>
                  <p className="font-medium">{landlord.name}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Type</p>
                  <p className="font-medium">{landlord.type}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Email</p>
                  <p className="font-medium">{landlord.email}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Phone</p>
                  <p className="font-medium">
                    {landlord.phone ?? "Not provided"}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Button size="sm" variant="outline" disabled>
                  Edit profile (demo only)
                </Button>
                <Button size="sm" variant="outline" disabled>
                  Impersonate landlord (demo only)
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Portfolio snapshot */}
          <Card>
            <CardHeader>
              <CardTitle>Portfolio</CardTitle>
              <CardDescription>
                Quick view across their units in Propti.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-3">
              <div>
                <p className="text-xs text-slate-500">Properties</p>
                <p className="font-medium">{landlord.propertiesCount}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Active tenancies</p>
                <p className="font-medium">{landlord.activeTenancies}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">
                  Open maintenance requests
                </p>
                <p className="font-medium">{landlord.openRequests}</p>
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                In the full build this could link into the landlord manager
                portal, showing each tenancy and its current status.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Verification & properties */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Verification checklist */}
          <Card>
            <CardHeader>
              <CardTitle>Verification checklist</CardTitle>
              <CardDescription>
                Core compliance items you want before paying out rent or starting works.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-3">
              <VerifyRow label="ID check" done={landlord.idVerified} />
              <VerifyRow
                label="Proof of ownership"
                done={landlord.ownershipVerified}
              />
              <VerifyRow
                label="Bank details"
                done={landlord.bankDetailsVerified}
              />
              <VerifyRow
                label="AML check"
                done={landlord.amlCheckComplete}
              />

              <p className="text-[11px] text-slate-400 mt-2">
                In your real version, each item could show who verified it and
                when, plus links to uploaded documents.
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                <Button size="sm" disabled>
                  Mark all as approved (demo only)
                </Button>
                <Button size="sm" variant="outline" disabled>
                  Request missing documents (demo only)
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Property list + docs summary */}
          <Card>
            <CardHeader>
              <CardTitle>Properties & documents</CardTitle>
              <CardDescription>
                At-a-glance view of docs per property (AST, gas, EICR, EPC).
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-3">
              {props.length === 0 ? (
                <p className="text-sm text-slate-500">
                  No properties linked in this demo. Once this landlord is live,
                  any properties and their compliance status will appear here.
                </p>
              ) : (
                <div className="space-y-3">
                  {props.map((p) => (
                    <div
                      key={p.id}
                      className="border border-slate-200 rounded-lg px-3 py-2"
                    >
                      <p className="text-sm font-medium text-slate-900">
                        {p.label}
                      </p>
                      <p className="text-xs text-slate-500">{p.postcode}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        Tenancies:{" "}
                        <span className="font-medium">
                          {p.tenanciesCount}
                        </span>
                      </p>
                      <p className="text-xs text-slate-500">
                        Docs:{" "}
                        <span className="font-medium">{p.docsSummary}</span>
                      </p>
                      <p className="text-xs text-slate-500">
                        Missing docs:{" "}
                        <span
                          className={
                            p.missingDocs > 0
                              ? "font-medium text-amber-600"
                              : "font-medium text-emerald-600"
                          }
                        >
                          {p.missingDocs}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <p className="text-[11px] text-slate-400 mt-2">
                This view lines up with the landlord portal&apos;s own
                compliance page and the agent documents dashboard you already
                built.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Documents placeholder (for IDs / ownership proofs etc.) */}
        <Card>
          <CardHeader>
            <CardTitle>Landlord documents</CardTitle>
            <CardDescription>
              ID, ownership, AML and banking paperwork attached to this
              landlord.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm space-y-3">
            <div className="border border-dashed border-slate-300 rounded-lg p-4 flex flex-col items-center justify-center text-center gap-2">
              <p className="text-sm font-medium text-slate-700">
                Document upload area (demo only)
              </p>
              <p className="text-xs text-slate-500 max-w-xs">
                In a real build you&apos;d list uploaded files here (ID, proof
                of ownership, AML checks, bank letters) with expiry dates and a
                simple audit trail.
              </p>
              <Button size="sm" variant="outline" disabled>
                Upload document (demo only)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

function VerifyRow({ label, done }: { label: string; done: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-slate-800">{label}</p>
      <Badge variant={done ? "success" : "default"}>
        {done ? "Complete" : "Missing"}
      </Badge>
    </div>
  );
}
