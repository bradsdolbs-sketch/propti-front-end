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
import { maintenanceRequests } from "../../../lib/mockData";

export default function AdminAllRequestsPage() {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">
          All Requests
        </h1>
        <p className="text-sm text-slate-500">
          Global view of every maintenance request on the platform.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Requests</CardTitle>
          <CardDescription>Across all landlords and tenants.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Property</Th>
                  <Th>Category</Th>
                  <Th>Priority</Th>
                  <Th>Status</Th>
                  <Th>Created</Th>
                </Tr>
              </Thead>
              <Tbody>
                {maintenanceRequests.map((req) => (
                  <Tr key={req.id}>
                    <Td className="text-xs font-medium text-slate-600">
                      {req.id}
                    </Td>
                    <Td className="whitespace-nowrap">
                      {req.propertyId === "PROP-2001"
                        ? "22 Anthony House, E5"
                        : "Central Gate, E1"}
                    </Td>
                    <Td>{req.category}</Td>
                    <Td>
                      <Badge
                        variant={
                          req.priority === "Urgent" ? "danger" : "outline"
                        }
                      >
                        {req.priority}
                      </Badge>
                    </Td>
                    <Td>
                      <Badge variant="default">{req.status}</Badge>
                    </Td>
                    <Td>
                      {new Date(req.createdAt).toLocaleDateString("en-GB")}
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
