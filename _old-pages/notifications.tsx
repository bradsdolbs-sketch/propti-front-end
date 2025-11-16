import { notifications } from "../lib/notifications";

export default function NotificationsPage() {
  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-semibold mb-6">All Notifications</h1>

      <div className="space-y-4">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="p-4 border border-slate-200 rounded-lg bg-white"
          >
            <p className="font-medium">{n.title}</p>
            <p className="text-sm text-slate-600">{n.message}</p>
            <p className="text-xs text-slate-500 mt-1">{n.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
