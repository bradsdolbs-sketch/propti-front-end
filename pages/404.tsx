import Link from "next/link";
import { Button } from "../components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-slate-400 mb-2">
          PROPTI
        </p>
        <h1 className="text-3xl font-semibold text-slate-900 mb-2">
          Page not found
        </h1>
        <p className="text-sm text-slate-500 mb-6">
          We couldn&apos;t find the page you were looking for. It might have been
          moved, renamed, or never existed.
        </p>

        <div className="flex flex-col items-center gap-3">
          <Link href="/">
            <Button className="w-full">Back to portal selection</Button>
          </Link>
          <div className="flex justify-center gap-3 text-xs text-slate-500">
            <Link href="/tenant" className="hover:underline">
              Tenant portal
            </Link>
            <span>·</span>
            <Link href="/landlord" className="hover:underline">
              Landlord portal
            </Link>
            <span>·</span>
            <Link href="/contractor" className="hover:underline">
              Contractor portal
            </Link>
            <span>·</span>
            <Link href="/admin" className="hover:underline">
              Admin console
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
