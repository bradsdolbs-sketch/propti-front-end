import type { AppProps } from "next/app";
import { StackClientApp, StackProvider } from "@stackframe/stack";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Suspense } from "react";
import "../styles/globals.css";

const projectId = process.env.NEXT_PUBLIC_STACK_PROJECT_ID;
const publishableKey = process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY;

const stackApp =
  projectId && publishableKey
    ? new StackClientApp({
        projectId,
        publishableClientKey: publishableKey,
        tokenStore: "cookie",
      })
    : null;

if (!stackApp) {
  // Keep the app running in local/dev even if Stack env vars are missing.
  console.warn(
    "Stack Auth env vars are missing (NEXT_PUBLIC_STACK_PROJECT_ID / NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY). " +
      "StackProvider will be skipped."
  );
}

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Suspense fallback={null}>
      <TooltipProvider>
        {stackApp ? (
          <StackProvider app={stackApp}>
            <Component {...pageProps} />
          </StackProvider>
        ) : (
          <Component {...pageProps} />
        )}
      </TooltipProvider>
    </Suspense>
  );
}
