import LegalLayout from "../../layouts/LegalLayout";

export default function CookiePolicyPage() {
  return (
    <LegalLayout title="Cookie Policy">
      <div className="space-y-10 text-sm text-slate-700">
        {/* Intro */}
        <header className="space-y-2">
          <p className="text-xs font-medium tracking-[0.18em] text-slate-400">
            LEGAL · COOKIE POLICY
          </p>
          <h1 className="text-2xl font-semibold text-slate-900">
            Cookie Policy
          </h1>
          <p className="text-xs text-slate-500">
            Last updated: <span className="font-medium">[Add date]</span>
          </p>
          <p className="text-sm text-slate-600 max-w-2xl">
            This Cookie Policy explains how Propti uses cookies and similar
            tracking technologies to operate and improve our platform. This
            policy should be read alongside our{" "}
            <a
              href="/legal/privacy-policy"
              className="underline underline-offset-2"
            >
              Privacy Policy
            </a>
            .
          </p>
        </header>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)]">
          {/* MAIN CONTENT */}
          <div className="space-y-8">
            {/* 1. What cookies are */}
            <section id="what-are-cookies" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                1. What are cookies?
              </h2>
              <p>
                Cookies are small text files placed on your device when you use
                our platform. They allow us to recognise your device, remember
                your preferences, and understand how users interact with Propti.
              </p>
              <p>Cookies can be:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Session cookies (deleted when you close your browser)</li>
                <li>Persistent cookies (stored until deleted or expired)</li>
                <li>First-party cookies (set by Propti)</li>
                <li>Third-party cookies (set by service providers)</li>
              </ul>
            </section>

            {/* 2. Types of cookies */}
            <section id="types-cookies" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                2. Cookies we use
              </h2>
              <p>Propti uses the following categories of cookies:</p>

              <h3 className="text-sm font-semibold text-slate-900">
                A. Strictly necessary (always active)
              </h3>
              <p>
                These cookies are essential for the platform to function and do
                not require consent under UK law. They enable:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Login sessions &amp; authentication</li>
                <li>Security and page navigation</li>
                <li>Form submissions and load balancing</li>
              </ul>

              <h3 className="text-sm font-semibold text-slate-900">
                B. Performance &amp; analytics (optional)
              </h3>
              <p>These cookies help us improve the platform by collecting:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Pages visited and session duration</li>
                <li>Device and browser type</li>
                <li>Errors and performance metrics</li>
              </ul>
              <p>
                Analytics cookies are only enabled with user consent (via our
                cookie banner).
              </p>

              <h3 className="text-sm font-semibold text-slate-900">
                C. Functional cookies (optional)
              </h3>
              <p>These remember your preferences, such as:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Notification settings</li>
                <li>Language or display preferences</li>
              </ul>

              <h3 className="text-sm font-semibold text-slate-900">
                D. Advertising / marketing cookies (none currently used)
              </h3>
              <p>
                Propti does not currently use advertising or marketing cookies.
                If this changes, this policy will be updated and consent will be
                requested.
              </p>
            </section>

            {/* 3. Examples */}
            <section id="cookie-examples" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                3. Examples of cookies Propti may use
              </h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>auth_token:</strong> used to keep you securely logged
                  in
                </li>
                <li>
                  <strong>csrf_token:</strong> protects against security attacks
                </li>
                <li>
                  <strong>mixpanel_id / _ga:</strong> analytics identifiers
                  (optional)
                </li>
              </ul>
            </section>

            {/* 4. Third parties */}
            <section id="third-parties" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                4. Third-party cookies
              </h2>
              <p>Propti uses trusted partners that may set cookies, including:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Stripe (payments)</li>
                <li>Firebase/Auth0 (authentication)</li>
                <li>AWS (hosting)</li>
                <li>Analytics providers (if consented)</li>
              </ul>
              <p>
                These providers are required to follow UK data protection laws.
              </p>
            </section>

            {/* 5. Consent */}
            <section id="consent" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                5. Cookie consent
              </h2>
              <p>
                Users can manage cookie preferences at any time through our
                cookie banner or browser settings. Strictly necessary cookies
                are always active, while optional cookies require consent.
              </p>
            </section>

            {/* 6. Control cookies */}
            <section id="control" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                6. How to control cookies
              </h2>
              <p>You can control cookies by:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Using our cookie banner settings</li>
                <li>Adjusting browser privacy settings</li>
                <li>Blocking or clearing cookies manually</li>
              </ul>
              <p className="text-xs text-slate-500">
                Note: Blocking essential cookies may stop the platform from
                working.
              </p>
            </section>

            {/* 7. Updates */}
            <section id="updates" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                7. Changes to this Cookie Policy
              </h2>
              <p>
                We may update this policy to reflect changes in cookies we use,
                legal requirements, or platform improvements. Updates will be
                posted on this page.
              </p>
            </section>

            {/* 8. Contact */}
            <section id="contact" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                8. Contact
              </h2>
              <p>If you have questions about cookies or privacy:</p>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs">
                <p>
                  📧{" "}
                  <a
                    href="mailto:enquiries@propti.com"
                    className="underline underline-offset-2"
                  >
                    enquiries@propti.com
                  </a>
                </p>
                <p>📮 Address: [Insert company address]</p>
              </div>
            </section>
          </div>

          {/* SIDE SUMMARY */}
          <aside className="space-y-4">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 mb-2">
                Quick summary (not legal)
              </h3>
              <ul className="text-xs space-y-1 text-slate-600">
                <li>• We use cookies to secure accounts and improve the app.</li>
                <li>• You can manage analytics &amp; functional cookies.</li>
                <li>• We don’t currently use advertising cookies.</li>
                <li>• Strictly necessary cookies always run.</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </LegalLayout>
  );
}
