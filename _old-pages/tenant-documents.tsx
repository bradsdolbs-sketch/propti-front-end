import TenantLayout from "../layouts/TenantLayout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";

type DocumentStatus = "Available" | "Pending" | "Expired";

interface TenantDocumentRow {
  id: string;
  name: string;
  type: string;
  issued: string;
  expires?: string;
  status: DocumentStatus;
}

const documents: TenantDocumentRow[] = [
  {
    id: "DOC-AST",
    name: "Assured Shorthold Tenancy Agreement",
    type: "AST",
    issued: "2025-06-12",
    status: "Available",
  },
  {
    id: "DOC-DEP",
    name: "Deposit protection certificate",
    type: "Deposit",
    issued: "2025-06-13",
    status: "Available",
  },
  {
    id: "DOC-GAS",
    name: "Gas safety certificate",
    type: "Gas safety",
    issued: "2025-05-30",
    expires: "2026-05-30",
    status: "Available",
  },
  {
    id: "DOC-EICR",
    name: "Electrical installation condition report (EICR)",
    type: "EICR",
    issued: "2025-01-10",
    expires: "2030-01-10",
    status: "Available",
  },
  {
    id: "DOC-EPC",
    name: "Energy performance certificate (EPC)",
    type: "EPC",
    issued: "2024-03-01",
    expires: "2034-03-01",
    status: "Available",
  },
];

function statusVariant(status: DocumentStatus): "success" | "warning" | "default" {
  switch (status) {
    case "Available":
      return "success";
    case "Pending":
      return "warning";
    case "Expired":
      return "default";
  }
}

export default function TenantDocumentsPage() {
  return (
    <TenantLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Documents
          </h1>
          <p className="text-sm text-slate-500">
            Key documents for your tenancy – AST, deposit, and safety
            certificates. This is a visual demo only.
          </p>
        </div>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle>Tenancy documents</CardTitle>
            <CardDescription>
              The same pack your landlord/agent sees in their portal.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <Thead>
                  <Tr>
                    <Th>Document</Th>
                    <Th>Type</Th>
                    <Th>Issued</Th>
                    <Th>Expires</Th>
                    <Th>Status</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {documents.map((doc) => (
                    <Tr key={doc.id}>
                      <Td>
                        <div className="font-medium">{doc.name}</div>
                        <div className="text-[11px] text-slate-400">
                          {doc.id}
                        </div>
                      </Td>
                      <Td>{doc.type}</Td>
                      <Td>
                        {new Date(doc.issued).toLocaleDateString("en-GB")}
                      </Td>
                      <Td>
                        {doc.expires
                          ? new Date(doc.expires).toLocaleDateString("en-GB")
                          : "—"}
                      </Td>
                      <Td>
                        <Badge variant={statusVariant(doc.status)}>
                          {doc.status}
                        </Badge>
                      </Td>
                      <Td>
                        <Button size="sm" variant="outline" disabled>
                          Download (demo)
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </div>
            <p className="text-[11px] text-slate-400 mt-3">
              In a future version, clicking download would open the actual PDF
              your agent uploaded – and you could share this pack for future
              references.
            </p>
          </CardContent>
        </Card>
      </div>
    </TenantLayout>
  );
}
