import AdminLayout from "../../../layouts/AdminLayout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Input } from "../../../components/ui/input";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "../../../components/ui/table";

type PropertyStatus = "Active" | "Onboarding" | "Archived";

interface AdminPropertyRow {
  id: string;
  name: string;
  address: string;
  postcode: string;
  landlordOrg: string;
  units: number;
  openRequests: number;
  totalRequests: number;
  status: PropertyStatus;
}

const mockProperties: AdminPropertyRow[] = [
  {
    id: "PROP-2001",
    name: "22 Anthony House",
    address: "Pembury Place",
    postcode: "E5 8GZ",
    landlordOrg: "Central Gate Estates",
    units: 1,
    openRequests: 2,
    totalRequests: 3,
    status: "Active",
  },
  {
    id: "PROP-2002",
    name: "Central Gate",
    address: "Commercial Road",
    postcode: "E1 1LN",
    landlordOrg: "Central Gate Estates",
    units: 12,
    openRequests: 1,
    totalRequests: 1,
    status: "Active",
  },
  {
    id: "PROP-3001",
    name: "Silverstream House",
    address: "Fitzroy Street",
    postcode: "W1T 6EB",
    landlordOrg: "Demo Properties Ltd",
    units: 8,
    openRequests: 0,
    totalRequests: 0,
    status: "Onboarding",
  },
];

function statusVariant(
  status: PropertyStatus
): "default" | "success" | "warning" {
  switch (status) {
    case "Active":
      return "success";
    case "Onboarding":
      return "warning";
    case "Archived":
    default:
      return "default";
  }
}

export default function AdminPropertiesPage() {
  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Properties
          </h1>
          <p className="text-slate-500 text-sm">
            All properties managed on Propti across all landlord accounts.
          </p>
        </div>

        <div className="w-full md:max-w-xs">
          <Input placeholder="Search by property, postcode, or landlord..." />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Properties under management</CardTitle>
          <CardDescription>
            Quick view of coverage, current issues, and landlord organisations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <Thead>
                <Tr>
                  <Th>Property</Th>
                  <Th>Landlord org</Th>
                  <Th>Location</Th>
                  <Th className="text-right">Units</Th>
                  <Th className="text-right">Open requests</Th>
                  <Th className="text-right">Total requests</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {mockProperties.map((p) => (
                  <Tr key={p.id}>
                    <Td>
                      <div className="font-medium">{p.name}</div>
                      <div className="text-xs text-slate-500">
                        {p.id}
                      </div>
                    </Td>
                    <Td className="whitespace-nowrap">
                      {p.landlordOrg}
                    </Td>
                    <Td className="whitespace-nowrap">
                      {p.address}, {p.postcode}
                    </Td>
                    <Td className="text-right">{p.units}</Td>
                    <Td className="text-right">{p.openRequests}</Td>
                    <Td className="text-right">{p.totalRequests}</Td>
                    <Td>
                      <Badge variant={statusVariant(p.status)}>
                        {p.status}
                      </Badge>
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
