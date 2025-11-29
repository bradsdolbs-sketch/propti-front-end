import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { api } from "../lib/api";

const hasStackEnv =
  !!process.env.NEXT_PUBLIC_STACK_PROJECT_ID &&
  !!process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY;

const StackSignIn = dynamic(
  async () => (await import("@stackframe/stack")).SignIn,
  { ssr: false }
);

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof document === "undefined") return;
    let cancelled = false;
    const checkSession = async () => {
      try {
        const me = await api.getCurrentUser();
        if (cancelled) return;
        router.replace("/post-auth");
      } catch {
        // ignore; no valid session yet
      }
    };
    checkSession();
    return () => {
      cancelled = true;
    };
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl space-y-8">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-xs tracking-[0.25em] text-slate-400 mb-2">PROPTI</p>
            <h1 className="text-3xl font-semibold text-slate-900">Welcome back</h1>
            <p className="text-sm text-slate-500 max-w-2xl">
              Sign in with Stack Auth to jump into your workspace.
            </p>
          </div>
          <Link
            href="/"
            className="text-sm text-slate-600 hover:text-slate-900 inline-flex items-center gap-2"
          >
            <ArrowLeft size={14} />
            Home
          </Link>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1fr,0.9fr] items-start">
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-slate-900">New here?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600">
              {hasStackEnv ? (
                <>
                  <p>Create an account with the built-in auth flow.</p>
                  <Link
                    href="/signup"
                    className="inline-flex items-center gap-1 text-slate-700 hover:text-slate-900 text-sm"
                  >
                    Go to sign up <ArrowRight size={14} />
                  </Link>
                </>
              ) : (
                <p className="text-slate-500">
                  Auth isn&apos;t configured locally yet. Set
                  NEXT_PUBLIC_STACK_PROJECT_ID and NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY to enable sign up.
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-lg">
            <CardContent className="pt-6">
              {hasStackEnv ? (
                <StackSignIn
                  fullPage={false}
                  automaticRedirect={false}
                />
              ) : (
                <p className="text-sm text-slate-500">
                  Sign-in UI hidden because Stack Auth env vars are missing.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
