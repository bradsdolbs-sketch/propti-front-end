import Link from "next/link";
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

type LandlordType = "Agency" | "Individual";

interface LandlordRow {
  id: string;
  name: string;
  type: LandlordType;
  properties: number;
  activeTenancies: number;
  openRequests: number;
}

const mockLandlords: LandlordRow[] = [
  {
    id: "LL-1001",
    name: "Central Gate Estates",
    type: "Agency",
    properties: 4,
    activeTenancies: 6,
    openRequests: 3,
  },
  {
    id: "LL-1002",
    name: "Bipin Uka",
    type: "Individual",
    properties: 1,
    activeTenancies: 1,
    openRequests: 0,
  },
];

function typeBadge(type: LandlordType): "default" | "outline" {
  return type === "Agency" ? "default" : "outline";
}

export default function AdminPeopleListPage() {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">
          Landlords & tenants
        </h1>
        <p className="text-slate-500 text-sm">
          High-level view of who owns what and how many tenants they have.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Landlords</CardTitle>
          <CardDescription>
            Each row represents a landlord or managing agency in the system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Type</Th>
                  <Th>Properties</Th>
                  <Th>Active tenancies</Th>
                  <Th>Open requests</Th>
                  <Th>Details</Th>
                </Tr>
              </Thead>
              <Tbody>
                {mockLandlords.map((ll) => (
                  <Tr key={ll.id}>
                    <Td>
                      <div className="font-medium">{ll.name}</div>
                      <div className="text-xs text-slate-500">{ll.id}</div>
                    </Td>
                    <Td>
                      <Badge variant={typeBadge(ll.type)}>{ll.type}</Badge>
                    </Td>
                    <Td>{ll.properties}</Td>
                    <Td>{ll.activeTenancies}</Td>
                    <Td>{ll.openRequests}</Td>
                    <Td>
                      <Link
                        href={`/admin/people/${ll.id}`}
                        className="text-xs text-blue-600 hover:underline"
                      >
                        View details
                      </Link>
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
