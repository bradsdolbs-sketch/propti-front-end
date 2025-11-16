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
  PoundSterling,
  Settings as SettingsIcon,
  FileText,
} from "lucide-react";

interface LandlordLayoutProps {
  children: ReactNode;
}

export default function LandlordLayout({ children }: LandlordLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* FIXED SIDEBAR */}
      <aside className="fixed inset-y-0 left-0 w-72 bg-white shadow-lg border-r border-slate-200 flex flex-col">
        {/* Top: logo + nav */}
        <div className="flex-1 overflow-y-auto p-6">
          <h2 className="text-2xl font-bold mb-8">Propti Landlord</h2>

          <nav className="space-y-2">
            <NavItem
              icon={<Home size={18} />}
              text="Dashboard"
              href="/landlord"
              exact
            />
            <NavItem
              icon={<ClipboardList size={18} />}
              text="Requests"
              href="/landlord/requests"
            />
            <NavItem
              icon={<Building2 size={18} />}
              text="Properties"
              href="/landlord/properties"
            />
            <NavItem
              icon={<PoundSterling size={18} />}
              text="Billing"
              href="/landlord/billing"
            />
            <NavItem
              icon={<FileText size={18} />}
              text="Documents"
              href="/landlord/documents"
            />
          </nav>
        </div>

        {/* Bottom: pinned settings */}
        <div className="border-t border-slate-200 p-6">
          <NavItem
            icon={<SettingsIcon size={18} />}
            text="Settings"
            href="/landlord/settings"
          />
        </div>
      </aside>

      {/* RIGHT CONTENT AREA */}
      <div className="ml-72 flex-1 flex flex-col">
	<DemoBanner />
        {/* Top Bar */}
        <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6">
          <div>
            <p className="text-sm font-medium text-slate-800">
              Central Gate Estates – Landlord Portal
            </p>
            <p className="text-xs text-slate-500">
              Track requests, rent & compliance docs across your properties.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm text-slate-600">Hello, Landlord</p>
            <Button variant="outline">Logout</Button>
          </div>
        </header>

        {/* Page Body */}
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
