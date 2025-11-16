import { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { cn } from "../lib/utils";
import DemoBanner from "../components/ui/demo-banner";
import { Button } from "../components/ui/button";
import {
  Home,
  ClipboardList,
  Building2,
  Users,
  FileText,
  Settings as SettingsIcon,
} from "lucide-react";

interface AgentLayoutProps {
  children: ReactNode;
}

export default function AgentLayout({ children }: AgentLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* FIXED SIDEBAR */}
      <aside className="fixed inset-y-0 left-0 w-72 bg-white shadow-lg border-r border-slate-200 flex flex-col">
        {/* Top: logo + nav (scrollable if needed) */}
        <div className="flex-1 overflow-y-auto p-6">
          <h2 className="text-2xl font-bold mb-8">Propti Agent</h2>

          <nav className="space-y-2">
            <NavItem
              icon={<Home size={18} />}
              text="Dashboard"
              href="/agent"
              exact
            />
            <NavItem
              icon={<ClipboardList size={18} />}
              text="Requests"
              href="/agent/requests"
            />
            <NavItem
              icon={<Building2 size={18} />}
              text="Tenancies"
              href="/agent/tenancies"
            />
            <NavItem
              icon={<Users size={18} />}
              text="Landlords"
              href="/agent/landlords"
            />
            <NavItem
              icon={<Users size={18} />}
              text="Tenants"
              href="/agent/tenants"
            />
            <NavItem
              icon={<FileText size={18} />}
              text="References"
              href="/agent/references"
            />
          </nav>
        </div>

        {/* Bottom: pinned settings */}
        <div className="border-t border-slate-200 p-6">
          <NavItem
            icon={<SettingsIcon size={18} />}
            text="Settings"
            href="/agent/settings"
          />
        </div>
      </aside>

      {/* RIGHT CONTENT AREA (pushed over by sidebar) */}
      <div className="ml-72 flex-1 flex flex-col">
        {/* Shared demo banner, same as landlord */}
        <DemoBanner />

        {/* Top bar */}
        <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6">
          <div>
            <p className="text-sm font-medium text-slate-800">
              Central Gate Estates – Agent Portal
            </p>
            <p className="text-xs text-slate-500">
              Manage tenancies, coordinate maintenance, and keep landlords & tenants happy.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm text-slate-600">Hello, Agent</p>
            <Button variant="outline">Logout</Button>
          </div>
        </header>

        {/* Page body */}
        <main className="p-6 flex-1">{children}</main>
      </div>
    </div>
  );
}

interface NavItemProps {
  icon: ReactNode;
  text: string;
  href: string;
  exact?: boolean;
}

function NavItem({ icon, text, href, exact }: NavItemProps) {
  const router = useRouter();

  const isExactMatch = router.pathname === href;
  const isChild = router.pathname.startsWith(href + "/");
  const isActive = exact ? isExactMatch : isExactMatch || isChild;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition",
        "text-slate-700 hover:bg-slate-100",
        isActive && "bg-slate-900 text-slate-50 hover:bg-slate-900"
      )}
    >
      <span
        className={cn(
          "flex items-center justify-center",
          isActive && "text-slate-50"
        )}
      >
        {icon}
      </span>
      <span>{text}</span>
    </Link>
  );
}
