import LandlordLayout from "../../../layouts/LandlordLayout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import Link from "next/link";

// NEW: Empty state + icon
import EmptyState from "../../../components/ui/empty-state";
import { Home } from "lucide-react";

type Status = "Occupied" | "Vacant";

interface PropertyRow {
  id: string;
  name: string;
  address: string;
  postcode: string;
  tenant?: string;
  rent: string;
  status: Status;
}

// TEMPORARY MOCK DATA
const mockProperties: PropertyRow[] = [
  {
    id: "PROP-2001",
    name: "22 Anthony House",
    address: "Pembury Place",
    postcode: "E5 8GZ",
    tenant: "Danise Fang",
    rent: "£2,000/mo",
    status: "Occupied",
  },
  {
    id: "PROP-2002",
    name: "Central Gate",
    address: "Commercial Road",
    postcode: "E1 1LN",
    tenant: undefined,
    rent: "£1,750/mo",
    status: "Vacant",
  },
];

function statusVariant(status: Status): "default" | "success" | "warning" {
  return status === "Occupied" ? "success" : "warning";
}

export default function LandlordPropertiesPage() {
  const hasProperties = mockProperties.length > 0;

  return (
    <LandlordLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Properties</h1>
          <p className="text-slate-500 text-sm">
            Manage and track your owned properties.
          </p>
        </div>

        {/* CHANGED: real button that links to a form page */}
        <Link href="/landlord/properties/new">
          <Button>Add new property</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your properties</CardTitle>
          <CardDescription>
            Overview of all properties linked to your account.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* EMPTY STATE */}
          {!hasProperties ? (
            <EmptyState
              title="No properties yet"
              description="Any properties linked to your account will appear here."
              icon={<Home size={40} />}
              action={<Button disabled>Add property (coming soon)</Button>}
            />
          ) : (
            <div className="space-y-4">
              {mockProperties.map((p) => (
                <div
                  key={p.id}
                  className="flex flex-col md:flex-row md:items-center md:justify-between border border-slate-200 p-4 rounded-lg"
                >
                  <div>
                    <h3 className="text-lg font-semibold">{p.name}</h3>
                    <p className="text-sm text-slate-600">
                      {p.address}, {p.postcode}
                    </p>
                    <p className="text-sm text-slate-500 mt-1">
                      Tenant:{" "}
                      {p.tenant ? (
                        <span className="font-medium">{p.tenant}</span>
                      ) : (
                        <span className="text-slate-400">Vacant</span>
                      )}
                    </p>
                  </div>

                  <div className="flex flex-col items-start md:items-end gap-2 mt-4 md:mt-0">
                    <Badge variant={statusVariant(p.status)}>{p.status}</Badge>
                    <p className="font-medium text-slate-700">{p.rent}</p>

                    <div className="flex gap-2">
                      <Link href={`/landlord/properties/${p.id}`}>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </Link>

                      {/* CHANGED: Edit now links to an edit page */}
                      <Link href={`/landlord/properties/${p.id}/edit`}>
                        <Button size="sm" variant="ghost">
                          Edit
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </LandlordLayout>
  );
}
