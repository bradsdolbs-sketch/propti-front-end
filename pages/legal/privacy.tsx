import LegalLayout from "../../layouts/LegalLayout";

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy">
      <div className="space-y-10 text-sm text-slate-700">
        {/* Intro block */}
        <header className="space-y-2">
          <p className="text-xs font-medium tracking-[0.18em] text-slate-400">
            LEGAL · PRIVACY
          </p>
          <h1 className="text-2xl font-semibold text-slate-900">
            Propti Privacy Policy
          </h1>
          <p className="text-xs text-slate-500">
            Last updated: <span className="font-medium">[Add date]</span>
          </p>
          <p className="text-sm text-slate-600 max-w-2xl">
            This Privacy Policy explains how Propti Ltd (“Propti”, “we”, “us”,
            “our”) collects, uses, stores and protects your personal data when
            you use our platform as a landlord, tenant, contractor or other
            user. It also explains your rights under UK GDPR.
          </p>
        </header>

        {/* 2-column layout on desktop */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)]">
          {/* Main content */}
          <div className="space-y-8">
            {/* 1. Introduction */}
            <section id="introduction" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                1. Introduction
              </h2>
              <p>
                Propti is a property maintenance and communication platform that
                helps landlords, tenants and contractors manage and track
                maintenance requests more efficiently. We take your privacy
                seriously and are committed to protecting your personal data.
              </p>
              <p>In this Privacy Policy we explain:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>What data we collect</li>
                <li>How and why we use it</li>
                <li>How we store and protect it</li>
                <li>Your rights under UK GDPR</li>
              </ul>
              <p>
                By creating an account or using Propti, you agree to the
                practices described in this Privacy Policy.
              </p>
            </section>

            {/* 2. Who we are */}
            <section id="who-we-are" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                2. Who we are
              </h2>
              <p>
                Propti Ltd is the controller for certain types of processing and
                a processor for others, depending on how our customers use the
                platform.
              </p>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs">
                <p className="font-medium text-slate-800">Propti Ltd</p>
                <p>Registered in England &amp; Wales</p>
                <p>Registered address: [Add your company address]</p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:enquiries@propti.com"
                    className="text-slate-900 underline underline-offset-2"
                  >
                    enquiries@propti.com
                  </a>
                </p>
              </div>
              <p>
                We are registered with the Information Commissioner’s Office
                (ICO) as a data controller.
              </p>
            </section>

            {/* 3. The data we collect */}
            <section id="data-we-collect" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                3. The data we collect
              </h2>

              <h3 className="text-sm font-semibold text-slate-900">
                A. Personal data you provide
              </h3>
              <p>
                The information we collect depends on your role on the platform:
              </p>

              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Landlords
                </h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Full name and contact details</li>
                  <li>Billing details and subscription information</li>
                  <li>Property information and related notes</li>
                  <li>Login and account credentials</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Tenants
                </h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Full name and contact details</li>
                  <li>
                    Photos or videos uploaded to show maintenance issues
                  </li>
                  <li>
                    Descriptions of issues and any other information you submit
                  </li>
                  <li>Tenancy details where provided by your landlord</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Contractors
                </h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Full name and contact details</li>
                  <li>
                    Professional documentation (e.g. insurance, certifications)
                  </li>
                  <li>Profile information and skills/trades</li>
                  <li>Availability, job history and notes</li>
                </ul>
              </div>

              <h3 className="text-sm font-semibold text-slate-900">
                B. Data collected automatically
              </h3>
              <p>
                When you use Propti, we automatically collect certain technical
                and usage data, including:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>IP address and device identifiers</li>
                <li>Browser type and version</li>
                <li>Pages visited and actions taken</li>
                <li>Session duration and timestamps</li>
                <li>Error logs and diagnostic information</li>
              </ul>

              <h3 className="text-sm font-semibold text-slate-900">
                C. Data you upload to the platform
              </h3>
              <p>This may include:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Images or videos relating to maintenance issues</li>
                <li>Messages and comments exchanged via Propti</li>
                <li>Documents and notes relating to properties or jobs</li>
              </ul>
              <p>
                We do not access or use this information beyond what is
                necessary to provide and improve the platform.
              </p>
            </section>

            {/* 4. How we use your data */}
            <section id="how-we-use-data" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                4. How we use your data
              </h2>
              <p>We use your data to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Provide, operate and maintain the Propti platform</li>
                <li>Manage your account and authentication</li>
                <li>Enable communication between landlords, tenants and contractors</li>
                <li>Improve performance, reliability and usability</li>
                <li>Detect, investigate and prevent fraud or misuse</li>
                <li>Respond to support enquiries</li>
              </ul>

              <h3 className="text-sm font-semibold text-slate-900">
                Additional purposes by user type
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <span className="font-medium">Landlords:</span> manage
                  properties, receive reports, approve work, communicate with
                  tenants and contractors, process subscription billing.
                </li>
                <li>
                  <span className="font-medium">Tenants:</span> submit and track
                  maintenance requests, upload evidence, receive updates.
                </li>
                <li>
                  <span className="font-medium">Contractors:</span> receive job
                  details, manage bookings and record completed work.
                </li>
              </ul>

              <h3 className="text-sm font-semibold text-slate-900">
                Lawful bases (UK GDPR)
              </h3>
              <p>We rely on the following lawful bases for processing:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <span className="font-medium">Contract:</span> to provide the
                  Propti service you sign up for.
                </li>
                <li>
                  <span className="font-medium">Legitimate interest:</span> to
                  secure, maintain and improve the platform.
                </li>
                <li>
                  <span className="font-medium">Consent:</span> for optional
                  features such as certain cookies or marketing (where used).
                </li>
                <li>
                  <span className="font-medium">Legal obligation:</span> for
                  accounting, fraud prevention and compliance.
                </li>
              </ul>
            </section>

            {/* 5. Retention */}
            <section id="retention" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                5. How long we keep your data
              </h2>
              <p>
                We retain personal data only for as long as necessary for the
                purposes described in this Policy, or as required by law.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Active account data: kept while your account remains open.</li>
                <li>
                  Inactive accounts: typically deleted after around 24 months of
                  inactivity.
                </li>
                <li>
                  Maintenance and job records: kept for 12–24 months depending
                  on landlord settings.
                </li>
                <li>
                  Contractor job logs: may be retained for up to 5 years to
                  support safety and audit trails.
                </li>
                <li>
                  Financial / billing data: retained for at least 6 years to
                  meet legal accounting requirements.
                </li>
              </ul>
              <p>
                You may request deletion of your data at any time (see{" "}
                <a href="#your-rights" className="underline underline-offset-2">
                  section 10
                </a>
                ).
              </p>
            </section>

            {/* 6. Sharing */}
            <section id="sharing" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                6. How we share your data
              </h2>
              <p>We do not sell your personal data.</p>
              <p>We may share data only with:</p>

              <h3 className="text-sm font-semibold text-slate-900">
                A. Sub-processors (service providers)
              </h3>
              <p>Examples include:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>AWS (hosting and storage)</li>
                <li>Stripe (payments)</li>
                <li>OpenAI (AI-powered triage)</li>
                <li>Authentication providers (e.g. Firebase/Auth0)</li>
                <li>Analytics and monitoring providers</li>
              </ul>
              <p>
                We ensure all sub-processors meet GDPR standards and process
                data only on our instructions.
              </p>

              <h3 className="text-sm font-semibold text-slate-900">
                B. Other users where necessary
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Tenant maintenance reports may be visible to their landlord
                  and relevant contractors.
                </li>
                <li>
                  Landlord instructions about work may be visible to assigned
                  contractors.
                </li>
                <li>
                  Contact details may be shared where needed for a contractor to
                  attend a job or confirm access.
                </li>
              </ul>

              <h3 className="text-sm font-semibold text-slate-900">
                C. Legal requirements
              </h3>
              <p>
                We may disclose data to law enforcement, regulators or courts if
                required by law.
              </p>
            </section>

            {/* 7. Transfers */}
            <section id="transfers" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                7. International data transfers
              </h2>
              <p>
                Some of our service providers may process data outside the UK.
                Where this occurs, we ensure appropriate safeguards are in
                place, such as:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>UK Addendum to EU Standard Contractual Clauses (SCCs)</li>
                <li>Adequacy regulations where available</li>
                <li>Other legally recognised safeguards</li>
              </ul>
            </section>

            {/* 8. Security */}
            <section id="security" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                8. Data security
              </h2>
              <p>We use industry-standard security controls, including:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Encryption at rest and in transit</li>
                <li>Secure authentication and access controls</li>
                <li>Role-based access and least-privilege permissions</li>
                <li>Regular security testing and monitoring</li>
                <li>Firewalling and infrastructure hardening</li>
                <li>Backups and disaster recovery processes</li>
              </ul>
              <p>
                No online service can guarantee 100% security, but we work to
                minimise risk and respond quickly to any issues.
              </p>
            </section>

            {/* 9. Cookies */}
            <section id="cookies" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                9. Cookies and tracking
              </h2>
              <p>
                We use cookies and similar technologies for session management,
                analytics, performance and security. You can learn more in our{" "}
                <a
                  href="/legal/cookie-policy"
                  className="underline underline-offset-2"
                >
                  Cookie Policy
                </a>
                .
              </p>
            </section>

            {/* 10. Rights */}
            <section id="your-rights" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                10. Your rights under UK GDPR
              </h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate or incomplete data</li>
                <li>Request deletion of your data in certain circumstances</li>
                <li>Restrict or object to certain types of processing</li>
                <li>
                  Request data portability (receive your data in a structured,
                  commonly used format)
                </li>
              </ul>
              <p>
                To exercise any of these rights, please email{" "}
                <a
                  href="mailto:enquiries@propti.com"
                  className="underline underline-offset-2"
                >
                  enquiries@propti.com
                </a>
                . We will respond within one month where possible.
              </p>
            </section>

            {/* 11. Children */}
            <section id="children" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                11. Children’s data
              </h2>
              <p>
                Propti is not intended for anyone under 18. We do not knowingly
                collect data from minors.
              </p>
            </section>

            {/* 12. Changes */}
            <section id="changes" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                12. Changes to this Privacy Policy
              </h2>
              <p>
                We may update this Policy from time to time. If we make material
                changes, we will notify you where appropriate. Continued use of
                the platform after changes take effect means you accept the
                updated Policy.
              </p>
            </section>

            {/* 13. Contact */}
            <section id="contact" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                13. Contact us or make a complaint
              </h2>
              <p>
                If you have any questions about this Privacy Policy or how we
                handle your data, you can contact us at:
              </p>
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
                <p>📮 Address: [Insert registered address]</p>
              </div>
              <p className="text-xs text-slate-500">
                You also have the right to complain to the Information
                Commissioner’s Office (ICO) at{" "}
                <a
                  href="https://ico.org.uk"
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-2"
                >
                  ico.org.uk
                </a>
                .
              </p>
            </section>
          </div>

          {/* Side column – simple “summary” box */}
          <aside className="space-y-4">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 mb-2">
                At a glance
              </h3>
              <ul className="text-xs space-y-1 text-slate-600">
                <li>• We don’t sell your data</li>
                <li>• We use it to run and improve Propti</li>
                <li>• You can ask to see or delete it</li>
                <li>• Landlords remain responsible for their legal duties</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </LegalLayout>
  );
}
