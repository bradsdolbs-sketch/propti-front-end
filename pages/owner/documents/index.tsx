import OwnerLayout from "../../../layouts/OwnerLayout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";

type DocumentType =
  | "AST"
  | "EPC"
  | "Gas Safety"
  | "EICR"
  | "Invoice"
  | "Other";

interface OwnerDocumentRow {
  id: string;
  property: string;
  type: DocumentType;
  name: string;
  period?: string;
  uploadedAt: string;
  status: "Valid" | "Expiring" | "Expired";
}

const mockDocuments: OwnerDocumentRow[] = [
  {
    id: "DOC-001",
    property: "22 Anthony House, E5 8GZ",
    type: "AST",
    name: "AST – 22 Anthony House (2025–2026)",
    period: "12 Jun 2025 – 11 Jun 2026",
    uploadedAt: "2025-05-10",
    status: "Valid",
  },
  {
    id: "DOC-002",
    property: "22 Anthony House, E5 8GZ",
    type: "Gas Safety",
    name: "Gas Safety Certificate",
    period: "Valid until 10 May 2026",
    uploadedAt: "2025-05-10",
    status: "Valid",
  },
  {
    id: "DOC-003",
    property: "22 Anthony House, E5 8GZ",
    type: "EICR",
    name: "Electrical Installation Condition Report",
    period: "Valid until 01 Apr 2030",
    uploadedAt: "2025-04-01",
    status: "Valid",
  },
  {
    id: "DOC-004",
    property: "22 Anthony House, E5 8GZ",
    type: "Invoice",
    name: "Boiler repair invoice",
    period: "Job: JOB-3019",
    uploadedAt: "2025-11-12",
    status: "Valid",
  },
];

function statusVariant(
  status: OwnerDocumentRow["status"]
): "default" | "warning" | "success" | "danger" {
  switch (status) {
    case "Valid":
      return "success";
    case "Expiring":
      return "warning";
    case "Expired":
      return "danger";
    default:
      return "default";
  }
}

export default function OwnerDocumentsPage() {
  return (
    <OwnerLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Documents
          </h1>
          <p className="text-slate-500 text-sm">
            All key tenancy, safety and maintenance documents related to your
            property.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Tenancy documents</CardTitle>
            <CardDescription>ASTs and addendums.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">
              {mockDocuments.filter((d) => d.type === "AST").length}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Latest AST for each tenancy shown below.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Safety certificates</CardTitle>
            <CardDescription>Gas, electrical and EPC.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">
              {
                mockDocuments.filter((d) =>
                  ["Gas Safety", "EICR", "EPC"].includes(d.type)
                ).length
              }
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Expiry tracking coming in a later version.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Invoices</CardTitle>
            <CardDescription>Maintenance spend via Propti.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">
              {mockDocuments.filter((d) => d.type === "Invoice").length}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              This will later link to detailed job and billing history.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main document list */}
      <Card>
        <CardHeader>
          <CardTitle>All documents</CardTitle>
          <CardDescription>
            Download and review the files tied to your tenancy and compliance
            obligations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {mockDocuments.length === 0 ? (
            <p className="text-sm text-slate-500">
              No documents uploaded yet. Your agent can upload ASTs, safety
              certificates and invoices here in the future.
            </p>
          ) : (
            <div className="space-y-3">
              {mockDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="flex flex-col md:flex-row md:items-center md:justify-between border border-slate-200 rounded-lg p-4"
                >
                  <div className="space-y-1">
                    <p className="text-xs text-slate-400">{doc.id}</p>
                    <p className="font-medium text-slate-900">{doc.name}</p>
                    <p className="text-sm text-slate-600">
                      {doc.property}
                    </p>
                    {doc.period && (
                      <p className="text-xs text-slate-500">{doc.period}</p>
                    )}
                    <p className="text-[11px] text-slate-400">
                      Uploaded{" "}
                      {new Date(doc.uploadedAt).toLocaleDateString("en-GB")}
                    </p>
                  </div>

                  <div className="flex flex-col items-start md:items-end gap-2 mt-4 md:mt-0">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{doc.type}</Badge>
                      <Badge variant={statusVariant(doc.status)}>
                        {doc.status}
                      </Badge>
                    </div>
                    <Button size="sm" variant="outline" disabled>
                      Download (demo only)
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </OwnerLayout>
  );
}
