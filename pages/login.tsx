import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const StackSignIn = dynamic(
  async () => (await import("@stackframe/stack")).SignIn,
  { ssr: false }
);

export default function LoginPage() {
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
              <p>Create an account with the built-in auth flow.</p>
              <Link
                href="/handler/sign-up"
                className="inline-flex items-center gap-1 text-slate-700 hover:text-slate-900 text-sm"
              >
                Go to sign up <ArrowRight size={14} />
              </Link>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-lg">
            <CardContent className="pt-6">
              <StackSignIn fullPage={false} automaticRedirect />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
