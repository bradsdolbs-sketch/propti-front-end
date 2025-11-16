import { useRouter } from "next/router";

export default function AuthPlaceholderPage() {
  const router = useRouter();
  const modeParam = (router.query.mode as string) || "login";
  const mode = modeParam === "signup" ? "Sign up" : "Sign in";

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="bg-white border border-slate-200 rounded-xl px-8 py-10 max-w-md w-full text-center shadow-sm">
        <p className="text-xs tracking-[0.25em] text-slate-400 mb-2">
          PROPTI
        </p>
        <h1 className="text-2xl font-semibold text-slate-900 mb-2">
          {mode} flow coming soon
        </h1>
        <p className="text-sm text-slate-500 mb-4">
          This is where you&apos;ll plug in real authentication and then
          redirect people into the correct portal.
        </p>
        <p className="text-xs text-slate-400">
          For now, use the{" "}
          <a
            href="/portals"
            className="text-blue-600 hover:underline font-medium"
          >
            demo portals page
          </a>{" "}
          to explore the landlord, agent, tenant and contractor views.
        </p>
      </div>
    </div>
  );
}
