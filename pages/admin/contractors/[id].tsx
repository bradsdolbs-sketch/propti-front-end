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

type ContractorStatus = "Active" | "Onboarding" | "Paused";

interface AdminContractorDetail {
  id: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  trades: string;
  coverage: string;
  status: ContractorStatus;
  rating: number;
  jobsThisWeek: number;
  jobsLifetime: number;
  disputesCount: number;
  cancellationsCount: number;
  createdAt: string;
  // Verification-related fields
  idVerified: boolean;
  companyNumber?: string;
  companyNumberVerified: boolean;
  insuranceProvided: boolean;
  insuranceRenewal?: string;
  bankDetailsVerified: boolean;
}

// For now we duplicate the mock data from the list, but with more detail.
const mockContractorsDetail: AdminContractorDetail[] = [
  {
    id: "CON-001",
    name: "ABC Plumbing",
    company: "ABC Plumbing Ltd",
    email: "hello@abcplumbing.example.com",
    phone: "+44 20 0000 0001",
    trades: "Plumbing, Heating",
    coverage: "E1, E2, EC1, EC2",
    status: "Active",
    rating: 4.8,
    jobsThisWeek: 6,
    jobsLifetime: 132,
    disputesCount: 1,
    cancellationsCount: 3,
    createdAt: "2025-11-01",
    idVerified: true,
    companyNumber: "12345678",
    companyNumberVerified: true,
    insuranceProvided: true,
    insuranceRenewal: "2026-01-10",
    bankDetailsVerified: true,
  },
  {
    id: "CON-002",
    name: "Central Gate Maintenance",
    company: "Central Gate Maintenance",
    email: "ops@cgmaintenance.example.com",
    phone: "+44 20 0000 0002",
    trades: "General maintenance",
    coverage: "E1, E5, N1",
    status: "Active",
    rating: 4.6,
    jobsThisWeek: 3,
    jobsLifetime: 58,
    disputesCount: 0,
    cancellationsCount: 2,
    createdAt: "2025-11-07",
    idVerified: true,
    companyNumber: "87654321",
    companyNumberVerified: true,
    insuranceProvided: false,
    insuranceRenewal: undefined,
    bankDetailsVerified: true,
  },
  {
    id: "CON-003",
    name: "Ventilation Co",
    company: "Ventilation Co",
    email: "admin@ventco.example.com",
    phone: "+44 20 0000 0003",
    trades: "Electrical, Ventilation",
    coverage: "All London",
    status: "Onboarding",
    rating: 4.4,
    jobsThisWeek: 1,
    jobsLifetime: 9,
    disputesCount: 0,
    cancellationsCount: 1,
    createdAt: "2025-11-12",
    idVerified: false,
    companyNumber: undefined,
    companyNumberVerified: false,
    insuranceProvided: false,
    insuranceRenewal: undefined,
    bankDetailsVerified: false,
  },
];

function statusVariant(status: ContractorStatus): "success" | "warning" | "default" {
  switch (status) {
    case "Active":
      return "success";
    case "Onboarding":
      return "warning";
    case "Paused":
      return "default";
  }
}

export default function AdminContractorDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const contractor = mockContractorsDetail.find((c) => c.id === id);

  if (!contractor) {
    return (
      <AdminLayout>
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-slate-500">Contractor not found.</p>
        </div>
      </AdminLayout>
    );
  }

  const {
    name,
    company,
    email,
    phone,
    trades,
    coverage,
    status,
    rating,
    jobsThisWeek,
    jobsLifetime,
    disputesCount,
    cancellationsCount,
    createdAt,
    idVerified,
    companyNumber,
    companyNumberVerified,
    insuranceProvided,
    insuranceRenewal,
    bankDetailsVerified,
  } = contractor;

  const createdDate = new Date(createdAt).toLocaleDateString("en-GB");

  const missingItems: string[] = [];
  if (!idVerified) missingItems.push("ID");
  if (!companyNumberVerified || !companyNumber) missingItems.push("Company number");
  if (!insuranceProvided) missingItems.push("Insurance document");
  if (!bankDetailsVerified) missingItems.push("Bank details");

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p
              className="text-xs text-slate-500 cursor-pointer hover:underline"
              onClick={() => router.push("/admin/contractors")}
            >
              ← Back to contractors
            </p>
            <h1 className="text-2xl font-semibold text-slate-900 mt-2">
              {company}
            </h1>
            <p className="text-sm text-slate-500">
              {name} · {email} {phone && `· ${phone}`}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Contractor ID: {contractor.id} · Joined {createdDate}
            </p>
          </div>

          <div className="text-right space-y-2">
            <Badge variant={statusVariant(status)}>{status}</Badge>
            <p className="text-xs text-slate-500">
              Rating: <span className="font-medium">{rating.toFixed(1)}</span> / 5
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

        {/* Top row – profile + performance */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* Profile */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                Core details used on the contractor portal and for booking jobs.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-3">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-xs text-slate-500">Company</p>
                  <p className="font-medium">{company}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Primary contact</p>
                  <p className="font-medium">{name}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Email</p>
                  <p className="font-medium">{email}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Phone</p>
                  <p className="font-medium">
                    {phone ?? "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Trades</p>
                  <p className="font-medium">{trades}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Coverage areas</p>
                  <p className="font-medium">{coverage}</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Button size="sm" variant="outline" disabled>
                  Edit profile (demo only)
                </Button>
                <Button size="sm" variant="outline" disabled>
                  Impersonate contractor (demo only)
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Performance snapshot */}
          <Card>
            <CardHeader>
              <CardTitle>Performance</CardTitle>
              <CardDescription>
                High-level stats across all jobs.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-3">
              <div>
                <p className="text-xs text-slate-500">Jobs this week</p>
                <p className="font-medium">{jobsThisWeek}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Jobs lifetime</p>
                <p className="font-medium">{jobsLifetime}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Disputes</p>
                <p className="font-medium">{disputesCount}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Cancellations</p>
                <p className="font-medium">{cancellationsCount}</p>
              </div>

              <p className="text-[11px] text-slate-400 mt-2">
                In the full build, this could link through to a full job
                history, feedback breakdown and SLAs by agent/landlord.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Verification & documents */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Verification checklist */}
          <Card>
            <CardHeader>
              <CardTitle>Verification checklist</CardTitle>
              <CardDescription>
                Key items required before this contractor can receive jobs.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-3">
              <VerifyRow label="ID check" done={idVerified} />
              <VerifyRow label="Company number" done={companyNumberVerified && !!companyNumber} extra={companyNumber} />
              <VerifyRow label="Insurance document" done={insuranceProvided} />
              <VerifyRow label="Bank details" done={bankDetailsVerified} />

              {insuranceRenewal && (
                <p className="text-xs text-slate-500 mt-1">
                  Insurance renewal date:{" "}
                  <span className="font-medium">
                    {new Date(insuranceRenewal).toLocaleDateString("en-GB")}
                  </span>
                </p>
              )}

              <p className="text-[11px] text-slate-400 mt-2">
                Later on you could track who approved each item and when, plus
                upload copies of key documents here.
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

          {/* Documents placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
              <CardDescription>
                Insurance, ID and company paperwork attached to this profile.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-3">
              <div className="border border-dashed border-slate-300 rounded-lg p-4 flex flex-col items-center justify-center text-center gap-2">
                <p className="text-sm font-medium text-slate-700">
                  Document upload area (demo only)
                </p>
                <p className="text-xs text-slate-500 max-w-xs">
                  In a real build, you&apos;d see a list of uploaded files here
                  (insurance schedule, ID, company certificate) with expiry
                  dates and quick actions.
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
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-800">{label}</p>
        {extra && (
          <p className="text-[11px] text-slate-500">
            {extra}
          </p>
        )}
      </div>
      <Badge variant={done ? "success" : "default"}>
        {done ? "Complete" : "Missing"}
      </Badge>
    </div>
  );
}
