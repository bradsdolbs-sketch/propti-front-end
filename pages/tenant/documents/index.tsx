import { useEffect, useState } from "react";
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
import { api } from "../../../lib/api";

type DocStatus = "Available" | "Missing" | "Expiring";

interface TenantDocumentRow {
  id: string;
  name: string;
  type: string;
  status: DocStatus;
  uploadedAt?: string;
  validUntil?: string;
  notes?: string;
}

const fallbackDocs: TenantDocumentRow[] = [
  {
    id: "DOC-AST",
    name: "Assured Shorthold Tenancy (AST)",
    type: "Tenancy",
    status: "Available",
    uploadedAt: "2025-06-01",
    notes: "Signed by all tenants and landlord.",
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
  const [docs, setDocs] = useState<TenantDocumentRow[]>(fallbackDocs);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getTenancyForTenant("T-1001")
      .then(async (tenancy) => {
        const list = await api.listDocuments(tenancy.id);
        if (list.length > 0) {
          setDocs(
            list.map((d) => ({
              id: d.id,
              name: d.name,
              type: d.type,
              status: "Available",
              uploadedAt: d.createdAt,
            }))
          );
        }
      })
      .catch(() => {
        /* fallback */
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <TenantLayout>
      <div className="max-w-5xl mx-auto space-y-6">
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

        <Card>
          <CardHeader>
            <CardTitle>Tenancy at a glance</CardTitle>
            <CardDescription>
              Your latest tenancy details and documents.
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

        <Card>
          <CardHeader>
            <CardTitle>Available documents</CardTitle>
            <CardDescription>
              Download copies of your tenancy agreement and compliance documents.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {loading ? (
              <p className="text-sm text-slate-500">Loading documents...</p>
            ) : (
              docs.map((doc) => (
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
              ))
            )}

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
