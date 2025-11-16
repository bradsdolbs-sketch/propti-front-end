import Link from "next/link";
import { Bell } from "lucide-react";
import { notifications } from "../../lib/notifications";
import { useState } from "react";

export default function NotificationBell({ role }: { role: string }) {
  const userNotifications = notifications.filter((n) => n.role === role);

  const unread = userNotifications.some((n) => !n.read);

  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Bell button */}
      <button
        className="relative p-2 rounded-full hover:bg-slate-200 transition"
        onClick={() => setOpen(!open)}
      >
        <Bell className="w-5 h-5 text-slate-700" />
        {unread && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg border border-slate-200 rounded-lg z-20">
          <div className="p-3 border-b">
            <p className="font-medium text-sm">Notifications</p>
          </div>

          <div className="max-h-72 overflow-y-auto p-3 space-y-3">
            {userNotifications.length === 0 && (
              <p className="text-sm text-slate-500">No notifications</p>
            )}

            {userNotifications.map((n) => (
              <div
                key={n.id}
                className="p-3 bg-slate-100 rounded-lg hover:bg-slate-200 transition"
              >
                <p className="text-sm font-medium">{n.title}</p>
                <p className="text-xs text-slate-600">{n.message}</p>
                <span className="text-[10px] text-slate-500">{n.time}</span>
              </div>
            ))}
          </div>

          <div className="border-t p-3 text-center">
            <Link href="/notifications">
              <span className="text-sm text-blue-600 hover:underline">
                View all
              </span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
