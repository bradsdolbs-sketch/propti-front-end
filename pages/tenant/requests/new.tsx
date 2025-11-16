import { useRouter } from "next/router";
import TenantLayout from "../../../layouts/TenantLayout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Textarea } from "../../../components/ui/textarea";
import { useState } from "react";

type TimeSlot = {
  id: string;
  label: string;
  window: string;
};

const MOCK_TIME_SLOTS: TimeSlot[] = [
  { id: "slot-1", label: "Morning (9–11)", window: "09:00–11:00" },
  { id: "slot-2", label: "Midday (11–14)", window: "11:00–14:00" },
  { id: "slot-3", label: "Afternoon (14–17)", window: "14:00–17:00" },
  { id: "slot-4", label: "Evening (17–19)", window: "17:00–19:00" },
];

export default function TenantNewRequestPage() {
  const router = useRouter();

  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState<"Routine" | "Urgent" | "">("");
  const [description, setDescription] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // Dummy submit handler – just returns to list for now
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Later this will send data to the backend.
    // For now, just go back to the list page.
    router.push("/tenant/requests");
  }

  return (
    <TenantLayout>
      <div className="max-w-3xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p
              className="text-xs text-slate-500 cursor-pointer hover:underline"
              onClick={() => router.push("/tenant/requests")}
            >
              ← Back to requests
            </p>
            <h1 className="text-2xl font-semibold text-slate-900 mt-2">
              Create a new request
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Tell us what’s wrong and when you’ll be available for a contractor.
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Issue details</CardTitle>
            <CardDescription>
              This information will be shared with your landlord/agent and the contractor.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Category + priority */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select a category</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Heating & hot water">
                      Heating & hot water
                    </option>
                    <option value="Electrical">Electrical</option>
                    <option value="Appliance">Appliance</option>
                    <option value="General maintenance">
                      General maintenance
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Priority
                  </label>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant={priority === "Routine" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPriority("Routine")}
                    >
                      Routine
                    </Button>
                    <Button
                      type="button"
                      variant={priority === "Urgent" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPriority("Urgent")}
                    >
                      Urgent
                    </Button>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Use “Urgent” only for issues like no heating, no hot water,
                    major leaks or loss of power.
                  </p>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Describe the issue
                </label>
                <Textarea
                  placeholder="Explain what’s happening, where in the property, and since when..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
                <p className="text-xs text-slate-500 mt-1">
                  Don’t include passwords or very sensitive information here.
                </p>
              </div>

              {/* Photos – placeholder only for now */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Photos (optional)
                </label>
                <Input
                  type="file"
                  multiple
                  className="cursor-pointer"
                  // no actual upload handling yet – purely visual
                />
                <p className="text-xs text-slate-500 mt-1">
                  You can upload a few photos to help the contractor understand the issue.
                </p>
              </div>

              {/* Availability / time slots */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  When are you usually available for a visit?
                </label>
                <p className="text-xs text-slate-500 mb-2">
                  These time windows will be shown to contractors. They can still
                  suggest alternatives if needed.
                </p>

                <div className="flex flex-wrap gap-2">
                  {MOCK_TIME_SLOTS.map((slot) => {
                    const isSelected = selectedSlot === slot.id;
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() =>
                          setSelectedSlot(
                            isSelected ? null : slot.id
                          )
                        }
                        className={[
                          "px-3 py-1.5 rounded-full text-xs border transition",
                          isSelected
                            ? "bg-slate-900 text-white border-slate-900"
                            : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100",
                        ].join(" ")}
                      >
                        {slot.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Access notes */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Access notes (optional)
                </label>
                <Input
                  placeholder="e.g. buzzer code, concierge, pets, preferred days..."
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => router.push("/tenant/requests")}
                >
                  Cancel
                </Button>
                <Button type="submit">Submit request</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </TenantLayout>
  );
}
