import { useState, FormEvent } from "react";
import LandlordLayout from "../../../layouts/LandlordLayout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

export default function NewPropertyPage() {
  const [saved, setSaved] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // In the real app we’d POST to the API.
    setSaved(true);
  }

  return (
    <LandlordLayout>
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Add new property</CardTitle>
          <CardDescription>
            This is a demo-only form. Submitting won’t actually create a
            property yet.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {saved && (
            <div className="mb-4 rounded-md bg-green-50 border border-green-200 px-3 py-2 text-sm text-green-800">
              Mock save successful. In a real version, this would create a new
              property on your account.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Property name
              </label>
              <Input placeholder="e.g. 22 Anthony House" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Address line
              </label>
              <Input placeholder="e.g. Pembury Place" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Postcode
              </label>
              <Input placeholder="e.g. E5 8GZ" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Monthly rent (£)
              </label>
              <Input type="number" placeholder="2000" min={0} />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" type="button">
                Cancel
              </Button>
              <Button type="submit">Save (demo)</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </LandlordLayout>
  );
}
