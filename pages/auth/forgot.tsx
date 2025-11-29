import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/card";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs tracking-[0.25em] text-slate-400">PROPTI</p>
          <Link
            href="/login"
            className="text-sm text-slate-600 hover:text-slate-900 inline-flex items-center gap-2"
          >
            <ArrowLeft size={14} />
            Back to login
          </Link>
        </div>

        <Card className="shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-900">Reset your password</CardTitle>
            <CardDescription className="text-sm text-slate-600">
              Enter the email you used for your account. We&apos;ll send you a reset link.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Email address</label>
              <input
                type="email"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200"
                placeholder="you@example.com"
              />
            </div>
            <Button className="w-full">Send reset link</Button>
            <p className="text-xs text-slate-500 text-center">
              If you don&apos;t see the email in a few minutes, check your spam folder.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
