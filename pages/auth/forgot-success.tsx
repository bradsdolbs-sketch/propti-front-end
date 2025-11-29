import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/card";

export default function ForgotPasswordSuccessPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs tracking-[0.25em] text-slate-400">PROPTI</p>
          <Link
            href="/"
            className="text-sm text-slate-600 hover:text-slate-900 inline-flex items-center gap-2"
          >
            <ArrowLeft size={14} />
            Home
          </Link>
        </div>

        <Card className="shadow-sm border-slate-200">
          <CardHeader className="flex items-start gap-3">
            <CheckCircle2 className="text-green-600 mt-1" />
            <div>
              <CardTitle className="text-2xl text-slate-900">Email sent!</CardTitle>
              <CardDescription className="text-sm text-slate-600">
                If the user with this e-mail address exists, an e-mail was sent to your inbox.
                Make sure to check your spam folder.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/">
              <Button className="w-full">Go home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
