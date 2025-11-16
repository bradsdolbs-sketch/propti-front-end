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

type DocStatus = "Available" | "Missing" | "Expiring";

interface TenantDocumentRow {
  id: string;
  name: string;
  type:
    | "Tenancy"
    | "Deposit"
    | "Safety"
    | "Compliance"
    | "Other";
  status: DocStatus;
  uploadedAt?: string;
  validUntil?: string;
  notes?: string;
}

const docs: TenantDocumentRow[] = [
  {
    id: "DOC-AST",
    name: "Assured Shorthold Tenancy (AST)",
    type: "Tenancy",
    status: "Available",
    uploadedAt: "2025-06-01",
    notes: "Signed by all tenants and landlord.",
  },
  {
    id: "DOC-DEPOSIT",
    name: "Deposit protection certificate",
    type: "Deposit",
    status: "Available",
    uploadedAt: "2025-06-05",
    notes: "Protected with DPS (example).",
  },
  {
    id: "DOC-GAS",
    name: "Gas safety certificate",
    type: "Safety",
    status: "Available",
    uploadedAt: "2025-05-20",
    validUntil: "2026-05-20",
  },
  {
    id: "DOC-EICR",
    name: "Electrical Installation Condition Report (EICR)",
    type: "Safety",
    status: "Available",
    uploadedAt: "2024-12-01",
    validUntil: "2029-12-01",
  },
  {
    id: "DOC-EPC",
    name: "Energy Performance Certificate (EPC)",
    type: "Compliance",
    status: "Available",
    uploadedAt: "2023-01-15",
    validUntil: "2033-01-15",
  },
  {
    id: "DOC-RTR",
    name: "Right to rent documents",
    type: "Compliance",
    status: "Available",
    uploadedAt: "2025-05-28",
    notes: "Stored for compliance, not usually downloaded.",
  },
];

function statusVariant(status: DocStatus): "success" | "warning" | "default" {
  switch (status) {
    case "Available":
      return "success";
    case "Expiring":
      return "warning";
    case "Missing":
      return "default";
  }
}

export default function TenantDocumentsPage() {
  return (
    <TenantLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Documents
            </h1>
            <p className="text-sm text-slate-500">
              All the key documents for your tenancy in one place.
            </p>
          </div>
        </div>

        {/* Summary card */}
        <Card>
          <CardHeader>
            <CardTitle>Tenancy at a glance</CardTitle>
            <CardDescription>
              22 Anthony House, Pembury Place, E5 8GZ · Start 12 June 2025 · End 11 June 2026
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3 text-sm">
            <div>
              <p className="text-xs text-slate-500">Landlord / Agent</p>
              <p className="font-medium">Central Gate Estates (on behalf of landlord)</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Deposit</p>
              <p className="font-medium">£2,308 (protected)</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Rent</p>
              <p className="font-medium">£2,000 per month</p>
            </div>
          </CardContent>
        </Card>

        {/* Document list */}
        <Card>
          <CardHeader>
            <CardTitle>Available documents</CardTitle>
            <CardDescription>
              Download copies of your tenancy agreement and compliance documents.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {docs.map((doc) => (
              <div
                key={doc.id}
                className="flex flex-col md:flex-row md:items-center md:justify-between border border-slate-200 rounded-lg px-3 py-2 gap-2"
              >
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {doc.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {doc.type} document
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {doc.uploadedAt && (
                      <>
                        Uploaded{" "}
                        {new Date(doc.uploadedAt).toLocaleDateString("en-GB")}
                      </>
                    )}
                    {doc.validUntil && (
                      <>
                        {" · "}Valid until{" "}
                        {new Date(doc.validUntil).toLocaleDateString("en-GB")}
                      </>
                    )}
                  </p>
                  {doc.notes && (
                    <p className="text-[11px] text-slate-500 mt-1">
                      {doc.notes}
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-start md:items-end gap-2">
                  <Badge variant={statusVariant(doc.status)}>
                    {doc.status}
                  </Badge>
                  <Button size="sm" variant="outline" disabled>
                    Download (demo only)
                  </Button>
                </div>
              </div>
            ))}

            <p className="text-[11px] text-slate-400 mt-2">
              In the live product these buttons would download PDFs stored
              against your tenancy. You could also surface upload dates, who
              provided them (agent vs landlord), and whether anything is
              expiring soon.
            </p>
          </CardContent>
        </Card>
      </div>
    </TenantLayout>
  );
}
