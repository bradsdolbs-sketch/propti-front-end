import { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import DemoBanner from "../components/ui/demo-banner";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import {
  LayoutDashboard,
  ClipboardList,
  Wrench,
  ShieldCheck,
  Building2,
  Users,
  UserCheck,
  Briefcase,
  Settings as SettingsIcon,
} from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* FIXED SIDEBAR */}
      <aside className="fixed inset-y-0 left-0 w-72 bg-white shadow-lg border-r border-slate-200 flex flex-col">
        {/* Top: logo + nav, scrollable if needed */}
        <div className="flex-1 overflow-y-auto p-6">
          <h2 className="text-2xl font-bold mb-8">Propti Admin</h2>

          <nav className="space-y-2">
            <NavItem
              icon={<LayoutDashboard size={18} />}
              text="Dashboard"
              href="/admin"
              exact
            />
            <NavItem
              icon={<ClipboardList size={18} />}
              text="Requests"
              href="/admin/requests"
            />
            <NavItem
              icon={<Wrench size={18} />}
              text="Contractors"
              href="/admin/contractors"
            />
            <NavItem
              icon={<ShieldCheck size={18} />}
              text="Verifications"
              href="/admin/verification" // matches pages/admin/verification/index.tsx
            />
            <NavItem
              icon={<Building2 size={18} />}
              text="Properties"
              href="/admin/properties"
            />
            <NavItem
              icon={<Users size={18} />}
              text="Tenants"
              href="/admin/tenants"
            />
            <NavItem
              icon={<UserCheck size={18} />}
              text="Landlords"
              href="/admin/landlords"
            />
            <NavItem
              icon={<Briefcase size={18} />}
              text="Agents"
              href="/admin/agents"
            />
          </nav>
        </div>

        {/* Bottom: pinned settings */}
        <div className="border-t border-slate-200 p-6">
          <NavItem
            icon={<SettingsIcon size={18} />}
            text="Settings"
            href="/admin/settings"
          />
        </div>
      </aside>

      {/* RIGHT CONTENT AREA */}
      <div className="ml-72 min-h-screen flex flex-col">
        <DemoBanner />

        <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6">
          <div>
            <p className="text-sm font-medium text-slate-800">
              Propti – Admin Console
            </p>
            <p className="text-xs text-slate-500">
              Monitor onboarding, compliance and performance across the whole platform.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm text-slate-600">Hello, Admin</p>
            <Button variant="outline">Logout</Button>
          </div>
        </header>

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
