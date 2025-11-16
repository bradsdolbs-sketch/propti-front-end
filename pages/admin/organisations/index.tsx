import AdminLayout from "../../../layouts/AdminLayout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../components/ui/card";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "../../../components/ui/table";
import { Badge } from "../../../components/ui/badge";

export default function AdminOrganisationsPage() {
  const orgs = [
    {
      id: "ORG-1",
      name: "Acme Properties Ltd",
      tier: "Standard",
      status: "active",
      ownerEmail: "sarah@acmeproperties.co.uk",
      createdAt: "2025-10-23",
    },
    {
      id: "ORG-2",
      name: "Prime Estates",
      tier: "Premium",
      status: "active",
      ownerEmail: "john@primeestates.co.uk",
      createdAt: "2025-10-23",
    },
  ];

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">
          Organisations
        </h1>
        <p className="text-sm text-slate-500">
          All landlord organisations on the platform.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Landlord organisations</CardTitle>
          <CardDescription>Accounts that own properties in Propti.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Tier</Th>
                  <Th>Status</Th>
                  <Th>Owner email</Th>
                  <Th>Created</Th>
                </Tr>
              </Thead>
              <Tbody>
                {orgs.map((org) => (
                  <Tr key={org.id}>
                    <Td>{org.name}</Td>
                    <Td>
                      <Badge variant="outline">{org.tier}</Badge>
                    </Td>
                    <Td>
                      <Badge variant="success">active</Badge>
                    </Td>
                    <Td className="text-xs text-slate-600">
                      {org.ownerEmail}
                    </Td>
                    <Td>
                      {new Date(org.createdAt).toLocaleDateString("en-GB")}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
