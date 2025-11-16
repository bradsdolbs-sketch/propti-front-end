import TenantLayout from "../../layouts/TenantLayout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

export default function TenantPropertyPage() {
  return (
    <TenantLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">Your property</h1>
        <p className="text-slate-500 text-sm">
          Key details about your home, who manages it, and how it’s set up.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        {/* Left column – property & tenancy */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Property details</CardTitle>
              <CardDescription>
                The address and basic information for your tenancy.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-700">
              <div>
                <p className="font-medium">
                  22 Anthony House, Pembury Place, London E5 8GZ
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Development: Anthony House · Area: Hackney
                </p>
              </div>

              <div className="grid gap-3 md:grid-cols-2 mt-2">
                <div>
                  <p className="text-xs text-slate-500">Bedrooms</p>
                  <p className="font-medium">2</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Property type</p>
                  <p className="font-medium">Flat · Purpose built</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Heating</p>
                  <p className="font-medium">Gas boiler & radiators</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Hot water</p>
                  <p className="font-medium">Combi boiler</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tenancy details</CardTitle>
              <CardDescription>
                High-level view of your agreement (not a legal copy).
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-700">
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <p className="text-xs text-slate-500">Tenants</p>
                  <p className="font-medium">
                    Danise Wen Zhe Fang, Phuong Ly Thi Nguyen
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Managed by</p>
                  <p className="font-medium">Central Gate Estates</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Tenancy start</p>
                  <p className="font-medium">12 June 2025</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Tenancy end</p>
                  <p className="font-medium">11 June 2026</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Monthly rent</p>
                  <p className="font-medium">£2,000</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Deposit</p>
                  <p className="font-medium">£2,308 (protected)</p>
                </div>
              </div>

              <p className="text-xs text-slate-500 mt-2">
                For legal details always refer to your signed tenancy agreement
                and deposit protection certificate.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Building & access</CardTitle>
              <CardDescription>
                Useful information for contractors and emergencies.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-700">
              <div className="flex items-center justify-between">
                <span>Main entrance</span>
                <span className="font-medium">Fob required · Block A</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Floor</span>
                <span className="font-medium">3rd floor (lift available)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Boiler location</span>
                <span className="font-medium">Hallway cupboard</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Stopcock</span>
                <span className="font-medium">Under kitchen sink</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                In a full build, this information could be visible to contractors
                when they receive a job for your property.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right column – manager & status */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Who manages your home</CardTitle>
              <CardDescription>Agency / landlord details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-700">
              <p className="font-medium">Central Gate Estates</p>
              <p>4th Floor, Silverstream House</p>
              <p>45 Fitzroy Street, Fitzrovia, London, W1T 6EB</p>
              <p className="text-xs text-slate-500 mt-2">
                For emergencies use the contact details provided in your
                welcome pack or tenancy agreement.
              </p>
              <div className="mt-3">
                <Badge variant="default">Fully managed</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Compliance overview</CardTitle>
              <CardDescription>
                High-level status of key safety documents.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-700">
              <div className="flex items-center justify-between">
                <span>Gas safety certificate</span>
                <Badge variant="success">Valid</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>EICR</span>
                <Badge variant="success">Valid</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>EPC</span>
                <Badge variant="default">Rating C</Badge>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                In a future version, you could download each document from
                here.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </TenantLayout>
  );
}
