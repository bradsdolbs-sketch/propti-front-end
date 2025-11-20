import type { AppProps } from "next/app";
import { StackClientApp, StackProvider } from "@stackframe/stack";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Suspense } from "react";
import "../styles/globals.css";

const projectId = process.env.NEXT_PUBLIC_STACK_PROJECT_ID;
const publishableKey = process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY;

if (!projectId || !publishableKey) {
  throw new Error("Stack Auth env vars are missing (NEXT_PUBLIC_STACK_PROJECT_ID / NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY)");
}

const stackApp = new StackClientApp({
  projectId,
  publishableClientKey: publishableKey,
  tokenStore: "cookie",
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Suspense fallback={null}>
      <TooltipProvider>
        <StackProvider app={stackApp}>
          <Component {...pageProps} />
        </StackProvider>
      </TooltipProvider>
    </Suspense>
  );
}
