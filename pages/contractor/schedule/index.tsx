import ContractorLayout from "../../../layouts/ContractorLayout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";

interface ScheduleSlot {
  time: string;
  jobId?: string;
  property?: string;
  status?: "Offer" | "Booked" | "Completed";
}

interface DaySchedule {
  day: string;
  date: string;
  slots: ScheduleSlot[];
}

const mockWeek: DaySchedule[] = [
  {
    day: "Today",
    date: "Mon",
    slots: [
      {
        time: "09:00–11:00",
        jobId: "JOB-3020",
        property: "Central Gate, E1",
        status: "Booked",
      },
      {
        time: "13:00–15:00",
        jobId: "JOB-3022",
        property: "Student House, N1",
        status: "Offer",
      },
    ],
  },
  {
    day: "Tomorrow",
    date: "Tue",
    slots: [
      {
        time: "09:00–11:00",
        jobId: "JOB-3021",
        property: "22 Anthony House, E5",
        status: "Booked",
      },
      {
        time: "14:00–16:00",
        timeLabel: "Available",
      } as any,
    ],
  },
  {
    day: "Wed",
    date: "Wed",
    slots: [
      {
        time: "All day",
        timeLabel: "Available",
      } as any,
    ],
  },
  {
    day: "Thu",
    date: "Thu",
    slots: [
      {
        time: "10:00–12:00",
        timeLabel: "Available",
      } as any,
    ],
  },
  {
    day: "Fri",
    date: "Fri",
    slots: [
      {
        time: "08:00–10:00",
        jobId: "JOB-3019",
        property: "Silverstream House, W1",
        status: "Completed",
      },
    ],
  },
];

function renderStatusBadge(status?: "Offer" | "Booked" | "Completed") {
  if (!status) return null;
  switch (status) {
    case "Offer":
      return <Badge variant="warning">Offer</Badge>;
    case "Booked":
      return <Badge variant="default">Booked</Badge>;
    case "Completed":
      return <Badge variant="success">Completed</Badge>;
  }
}

export default function ContractorSchedulePage() {
  return (
    <ContractorLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Schedule</h1>
          <p className="text-slate-500 text-sm">
            Your jobs and availability for the upcoming days.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>This week</CardTitle>
          <CardDescription>
            In a full build this would be a proper calendar. For now, it shows a
            structured weekly view of jobs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            {mockWeek.map((day, index) => (
              <div
                key={index}
                className="border border-slate-200 rounded-xl bg-white p-3 flex flex-col gap-2"
              >
                <div className="flex items-baseline justify-between mb-1">
                  <p className="font-medium text-slate-800">{day.day}</p>
                  <p className="text-xs text-slate-400">{day.date}</p>
                </div>

                {day.slots.map((slot, i) => {
                  const isAvailable = !slot.jobId;

                  return (
                    <div
                      key={i}
                      className="border border-slate-100 rounded-lg px-2 py-2 text-xs flex flex-col gap-1 bg-slate-50"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-slate-700">
                          {slot.time}
                        </span>
                        {renderStatusBadge(slot.status)}
                      </div>

                      {slot.jobId ? (
                        <>
                          <span className="text-slate-800">
                            {slot.property}
                          </span>
                          <span className="text-slate-400">{slot.jobId}</span>
                        </>
                      ) : (
                        <span className="text-slate-500">Available slot</span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </ContractorLayout>
  );
}
