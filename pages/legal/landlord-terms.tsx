import LegalLayout from "../../layouts/LegalLayout";

export default function LandlordTermsPage() {
  return (
    <LegalLayout title="Landlord Terms & Conditions">
      <div className="space-y-10 text-sm text-slate-700">
        {/* Intro */}
        <header className="space-y-2">
          <p className="text-xs font-medium tracking-[0.18em] text-slate-400">
            LEGAL · LANDLORD TERMS
          </p>
          <h1 className="text-2xl font-semibold text-slate-900">
            Landlord Terms &amp; Conditions
          </h1>
          <p className="text-xs text-slate-500">
            Last updated: <span className="font-medium">[Add date]</span>
          </p>
          <p className="text-sm text-slate-600 max-w-2xl">
            These Terms &amp; Conditions govern your use of the Propti platform
            as a landlord, property owner or authorised manager. Please read
            them carefully before using the service.
          </p>
        </header>

        {/* Layout: main + side */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)]">
          {/* Main content */}
          <div className="space-y-8">
            {/* 1. Introduction */}
            <section id="introduction" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                1. Introduction
              </h2>
              <p>
                These Terms &amp; Conditions (“Terms”) govern your use of the
                Propti platform (“Propti”, “we”, “our”, “us”) as a landlord,
                property owner, or authorised manager (“you”, “your”).
              </p>
              <p>
                By creating an account or using Propti, you agree to be bound by
                these Terms. If you do not agree, you must stop using Propti
                immediately.
              </p>
            </section>

            {/* 2. What Propti is */}
            <section id="what-propti-is" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                2. What Propti is
              </h2>
              <p>
                Propti is a software platform designed to help landlords
                streamline maintenance communication and record-keeping. The
                platform allows you to:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Receive and track maintenance reports from tenants</li>
                <li>Store property and job information in one place</li>
                <li>Share details with contractors</li>
                <li>View AI triage suggestions and classifications</li>
              </ul>
              <p>Propti is not any of the following:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>A letting agency or estate agent</li>
                <li>A property management company</li>
                <li>A legal or compliance advisor</li>
                <li>A contractor or tradesperson</li>
                <li>An emergency response or call-out service</li>
              </ul>
              <p>Propti provides tools and a shared workspace, not management services.</p>
            </section>

            {/* 3. What Propti is not responsible for */}
            <section id="not-responsible" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                3. What Propti is not responsible for
              </h2>
              <p>
                To avoid confusion about roles and legal responsibilities, you
                agree that Propti is not responsible for the following:
              </p>

              <h3 className="text-sm font-semibold text-slate-900">
                3.1 Legal compliance
              </h3>
              <p>You remain fully responsible for complying with all landlord obligations, including but not limited to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Gas Safety Regulations</li>
                <li>Electrical Safety Standards (EICR)</li>
                <li>Fire, smoke and carbon monoxide alarm requirements</li>
                <li>EPC and energy performance obligations</li>
                <li>Landlord licensing and HMO rules</li>
                <li>Deposit protection and prescribed information</li>
                <li>Right-to-Rent checks</li>
                <li>Any local council regulations</li>
              </ul>
              <p>
                Propti may provide reminders or prompts, but these are
                indicative only and do not constitute legal advice or guaranteed
                accuracy.
              </p>

              <h3 className="text-sm font-semibold text-slate-900">
                3.2 Repair outcomes
              </h3>
              <p>Propti does not:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Guarantee the quality or safety of contractor work</li>
                <li>Provide warranties or workmanship guarantees</li>
                <li>Verify contractor qualifications or insurance</li>
                <li>Supervise repairs or attend site</li>
                <li>Accept liability for property damage or missed appointments</li>
              </ul>

              <h3 className="text-sm font-semibold text-slate-900">
                3.3 Tenancy issues
              </h3>
              <p>Propti is not responsible for:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Rent collection, arrears or refunds</li>
                <li>Deposits or deposit schemes</li>
                <li>Issuing or handling possession notices</li>
                <li>Tenancy renewals or terminations</li>
                <li>Evictions or legal disputes</li>
              </ul>

              <h3 className="text-sm font-semibold text-slate-900">
                3.4 AI limitations
              </h3>
              <p>
                If you use Propti’s AI features, you understand that AI outputs
                may:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Be inaccurate or incomplete</li>
                <li>Misinterpret photographs or descriptions</li>
                <li>Suggest incorrect categories, priorities or diagnoses</li>
              </ul>
              <p>
                AI suggestions are informational only. They are not professional
                or legal advice. You are responsible for determining what action
                to take in each case.
              </p>
            </section>

            {/* 4. Your responsibilities */}
            <section id="your-responsibilities" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                4. Your responsibilities as a landlord
              </h2>

              <h3 className="text-sm font-semibold text-slate-900">
                4.1 Data accuracy
              </h3>
              <p>You must ensure that:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Property details are accurate and up to date</li>
                <li>Tenant contact details are correct</li>
                <li>
                  Uploaded documents, certificates and records are genuine and
                  current
                </li>
              </ul>

              <h3 className="text-sm font-semibold text-slate-900">
                4.2 Duty of care
              </h3>
              <p>You remain responsible for:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Maintaining a safe and habitable property</li>
                <li>Responding to urgent repair issues appropriately</li>
                <li>
                  Ensuring any contractors you appoint are suitably qualified
                </li>
                <li>Complying with all legal and regulatory duties</li>
              </ul>

              <h3 className="text-sm font-semibold text-slate-900">
                4.3 Use of contractors
              </h3>
              <p>
                Where you engage contractors via Propti, you acknowledge that:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  The contract for work is between you (or your agent) and the
                  contractor, not Propti
                </li>
                <li>You are responsible for paying contractors</li>
                <li>
                  You must verify qualifications and registrations where
                  required (e.g. GasSafe, NICEIC)
                </li>
              </ul>

              <h3 className="text-sm font-semibold text-slate-900">
                4.4 Account security
              </h3>
              <p>You agree to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Keep login details secure and confidential</li>
                <li>Not share your account with unauthorised users</li>
                <li>
                  Inform us promptly if you suspect unauthorised access or a
                  security breach
                </li>
              </ul>
            </section>

            {/* 5. Subscription & payments */}
            <section id="subscription" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                5. Subscription &amp; payments
              </h2>

              <h3 className="text-sm font-semibold text-slate-900">
                5.1 Subscription fees
              </h3>
              <p>
                If you subscribe to a paid landlord plan (such as Landlord
                Plus), your subscription begins when you create a paid account
                or upgrade your plan. Fees are typically charged:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Monthly or annually</li>
                <li>In advance</li>
                <li>Via our chosen payment provider (e.g. Stripe)</li>
              </ul>
              <p>
                We may adjust pricing from time to time. Where required, we will
                give reasonable notice of any changes.
              </p>

              <h3 className="text-sm font-semibold text-slate-900">
                5.2 Commission
              </h3>
              <p>
                Propti may charge commission on certain job types, such as:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Contractor call-out fees</li>
                <li>Maintenance jobs accepted via the platform</li>
                <li>Urgent or ASAP callouts</li>
              </ul>
              <p>
                Any applicable commission will be stated clearly in the
                platform.
              </p>

              <h3 className="text-sm font-semibold text-slate-900">
                5.3 Non-payment
              </h3>
              <p>If payment fails or is overdue, we may:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Suspend or restrict account access</li>
                <li>Limit certain features or functionality</li>
                <li>
                  Ultimately delete your account and associated data after a
                  defined retention period
                </li>
              </ul>
            </section>

            {/* 6. Content & data */}
            <section id="uploading-content" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                6. Uploading content &amp; user data
              </h2>
              <p>
                You retain ownership of the content and data you upload. By
                using Propti, you grant us a licence to:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Store your content</li>
                <li>Process and display it within the platform</li>
                <li>
                  Transmit it as needed to provide the Propti service (for
                  example to contractors or tenants)
                </li>
              </ul>
              <p>You agree not to upload:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Illegal or infringing content</li>
                <li>Harassing, abusive or discriminatory material</li>
                <li>Explicit or inappropriate images</li>
                <li>Fraudulent certificates or documents</li>
                <li>Malware, scripts or harmful code</li>
              </ul>
            </section>

            {/* 7. Availability */}
            <section id="availability" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                7. Platform availability
              </h2>
              <p>
                We aim to provide a reliable and stable service, but we do not
                guarantee:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Uninterrupted access</li>
                <li>Error-free operation</li>
                <li>Perfect uptime</li>
                <li>Immediate resolution of bugs</li>
              </ul>
              <p>
                Maintenance, updates and outages may occasionally affect
                availability.
              </p>
            </section>

            {/* 8. Liability */}
            <section id="liability" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                8. Limitation of liability
              </h2>
              <p>
                To the fullest extent permitted by law, Propti will not be
                liable for:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Loss of rent or income</li>
                <li>Property damage</li>
                <li>Failed or poor-quality repairs</li>
                <li>Contractor negligence or misconduct</li>
                <li>Delays in maintenance or communication</li>
                <li>Legal claims from tenants or third parties</li>
                <li>Losses arising from inaccurate AI suggestions</li>
                <li>Business interruption or loss of profits</li>
              </ul>
              <p>
                If we are found liable for any loss or damage, our total
                aggregate liability will be limited to the total subscription
                fees you have paid to Propti in the 12 months immediately
                preceding the event giving rise to the claim.
              </p>
            </section>

            {/* 9. Termination */}
            <section id="termination" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                9. Termination
              </h2>
              <p>You may terminate your account at any time by:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Using the in-app settings where available, or</li>
                <li>Contacting us to request account closure</li>
              </ul>
              <p>
                Unless required by law, subscription fees are generally
                non-refundable once billed.
              </p>
              <p>We may suspend or terminate your account if:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>You breach these Terms</li>
                <li>You misuse the platform</li>
                <li>You fail to pay subscription or other fees</li>
                <li>You upload harmful, illegal or abusive content</li>
              </ul>
            </section>

            {/* 10. Data protection */}
            <section id="data-protection" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                10. Data protection
              </h2>
              <p>
                Your personal data and your tenants’ data are processed in line
                with:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Our{" "}
                  <a
                    href="/legal/privacy-policy"
                    className="underline underline-offset-2"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>Our{" "}
                  <a
                    href="/legal/cookie-policy"
                    className="underline underline-offset-2"
                  >
                    Cookie Policy
                  </a>
                </li>
                <li>Our{" "}
                  <a
                    href="/legal/dpa"
                    className="underline underline-offset-2"
                  >
                    Data Processing Agreement (DPA)
                  </a>
                </li>
              </ul>
            </section>

            {/* 11. Changes */}
            <section id="changes" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                11. Changes to these Terms
              </h2>
              <p>
                We may update these Terms from time to time. If we make
                significant changes, we will try to inform you via the platform
                or by email. Continued use of Propti after changes take effect
                will constitute your acceptance of the updated Terms.
              </p>
            </section>

            {/* 12. Governing law */}
            <section id="governing-law" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                12. Governing law
              </h2>
              <p>
                These Terms are governed by the laws of England &amp; Wales. Any
                disputes will be dealt with exclusively by the courts of England
                &amp; Wales.
              </p>
            </section>

            {/* 13. Contact */}
            <section id="contact" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                13. Contact
              </h2>
              <p>
                If you have questions about these Terms or how they apply to
                your use of Propti, you can contact us at:
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
                <p>📮 Registered address: [Insert company address]</p>
              </div>
            </section>
          </div>

          {/* Side info */}
          <aside className="space-y-4">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 mb-2">
                Summary (not a substitute for the full Terms)
              </h3>
              <ul className="text-xs space-y-1 text-slate-600">
                <li>• Propti is a tool, not a letting agent.</li>
                <li>• You stay responsible for legal compliance &amp; repairs.</li>
                <li>• Contractor work is your contract, not ours.</li>
                <li>• Our liability is capped and excludes lost rent.</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </LegalLayout>
  );
}
