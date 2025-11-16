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
import Link from "next/link";

const landlord = {
  id: "LL-1001",
  name: "Central Gate Estates",
  type: "Agency",
  email: "info@centralgateestates.com",
  phone: "+44 (0)20 0000 0000",
  properties: [
    {
      id: "PROP-2001",
      name: "22 Anthony House",
      address: "Pembury Place",
      postcode: "E5 8GZ",
      activeTenancies: 1,
      openRequests: 2,
    },
    {
      id: "PROP-2002",
      name: "Central Gate",
      address: "Commercial Road",
      postcode: "E1 1LN",
      activeTenancies: 0,
      openRequests: 1,
    },
  ],
  tenants: [
    {
      name: "Danise Fang",
      property: "22 Anthony House, E5 8GZ",
      activeRequests: 2,
    },
    {
      name: "Phuong Nguyen",
      property: "22 Anthony House, E5 8GZ",
      activeRequests: 0,
    },
  ],
};

export default function AdminLandlordDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            {landlord.name}
          </h1>
          <p className="text-slate-500 text-sm">
            {landlord.id} • Landlord / Agency profile
          </p>
        </div>
        <Button variant="outline" onClick={() => router.push("/admin/people")}>
          Back to list
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        {/* LEFT – properties & tenants */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Properties</CardTitle>
              <CardDescription>
                Properties managed by this landlord in Propti.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-700">
              {landlord.properties.map((p) => (
                <div
                  key={p.id}
                  className="border border-slate-200 rounded-lg p-3 flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{p.name}</p>
                    <p className="text-xs text-slate-500">
                      {p.address}, {p.postcode}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Active tenancies: {p.activeTenancies}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant={p.openRequests > 0 ? "warning" : "success"}>
                      {p.openRequests > 0
                        ? `${p.openRequests} open`
                        : "No open requests"}
                    </Badge>
                    <Link href={`/landlord/properties/${p.id}`}>
                      <Button size="sm" variant="outline">
                        View as landlord
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tenants</CardTitle>
              <CardDescription>
                Tenants currently linked to this landlord via Propti.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-700">
              {landlord.tenants.map((t, idx) => (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-lg p-3 flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.property}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <Badge variant={t.activeRequests > 0 ? "warning" : "success"}>
                      {t.activeRequests > 0
                        ? `${t.activeRequests} open request(s)`
                        : "No open requests"}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* RIGHT – contact & meta */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact details</CardTitle>
              <CardDescription>
                How to reach this landlord or agency.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-700">
              <p>
                <span className="font-medium">Email: </span>
                {landlord.email}
              </p>
              <p>
                <span className="font-medium">Phone: </span>
                {landlord.phone}
              </p>
              <p className="text-xs text-slate-500 mt-2">
                In a full build, this would also show billing settings, payout
                details, and connected accounts.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System view</CardTitle>
              <CardDescription>
                How Propti sees this landlord overall.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-700">
              <p>
                <span className="font-medium">Total properties: </span>
                {landlord.properties.length}
              </p>
              <p>
                <span className="font-medium">Total tenants: </span>
                {landlord.tenants.length}
              </p>
              <p>
                <span className="font-medium">Open requests: </span>
                {landlord.properties.reduce(
                  (sum, p) => sum + p.openRequests,
                  0
                )}
              </p>
              <Button variant="outline" size="sm" disabled>
                View audit log (coming soon)
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
