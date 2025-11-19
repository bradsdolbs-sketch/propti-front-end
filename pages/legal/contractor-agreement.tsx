import LegalLayout from "../../layouts/LegalLayout";

export default function ContractorAgreementPage() {
  return (
    <LegalLayout title="Contractor Agreement">
      <div className="space-y-10 text-sm text-slate-700">
        {/* Intro */}
        <header className="space-y-2">
          <p className="text-xs font-medium tracking-[0.18em] text-slate-400">
            LEGAL · CONTRACTOR AGREEMENT
          </p>
          <h1 className="text-2xl font-semibold text-slate-900">
            Contractor Agreement
          </h1>
          <p className="text-xs text-slate-500">
            Last updated: <span className="font-medium">[Add date]</span>
          </p>
          <p className="text-sm text-slate-600 max-w-2xl">
            This Contractor Agreement sets out the terms on which contractors,
            tradespeople and service providers use Propti. Please read it
            carefully before accepting or carrying out any jobs via the
            platform.
          </p>
        </header>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)]">
          {/* MAIN CONTENT */}
          <div className="space-y-8">
            {/* 1. Introduction */}
            <section id="introduction" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                1. Introduction
              </h2>
              <p>
                This Contractor Agreement (“Agreement”) sets out the terms on
                which contractors, tradespeople, or service providers (“you”,
                “your”) access and use the Propti platform (“Propti”, “we”,
                “us”, “our”).
              </p>
              <p>
                By creating a contractor account or accepting jobs through
                Propti, you agree to be bound by this Agreement. If you do not
                agree, you must not use the platform.
              </p>
            </section>

            {/* 2. Nature of relationship */}
            <section id="relationship" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                2. Nature of relationship
              </h2>

              <h3 className="text-sm font-semibold text-slate-900">
                2.1 Independent contractor status
              </h3>
              <p>You acknowledge that you are not:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>An employee of Propti</li>
                <li>An agent or representative acting on Propti’s behalf</li>
                <li>A partner or part of any joint venture with Propti</li>
              </ul>
              <p>
                You act entirely as an independent contractor in your own right.
              </p>

              <h3 className="text-sm font-semibold text-slate-900">
                2.2 No employment rights
              </h3>
              <p>This Agreement does not create:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Employment or worker status</li>
                <li>Any entitlement to holiday pay or sick pay</li>
                <li>Pension, benefits or similar rights</li>
              </ul>
              <p>You are responsible for:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Your own tax and National Insurance</li>
                <li>Your own insurance arrangements</li>
                <li>Your own tools, equipment and transport</li>
              </ul>
            </section>

            {/* 3. What Propti does */}
            <section id="what-propti-does" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                3. What Propti does
              </h2>
              <p>Propti provides a digital platform that allows landlords and tenants to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Report and track maintenance issues</li>
                <li>Book contractors for jobs</li>
                <li>Exchange messages, photos and videos</li>
                <li>View job status and history</li>
              </ul>
              <p>Propti does not:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Supervise or direct your work</li>
                <li>Guarantee any minimum number of jobs</li>
                <li>Guarantee any level of income</li>
                <li>Provide materials, tools or vehicles</li>
              </ul>
              <p>
                Propti is a platform that connects parties; it does not become a
                party to the contract for works between you and the landlord or
                agent.
              </p>
            </section>

            {/* 4. Your responsibilities */}
            <section id="responsibilities" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                4. Your responsibilities as a contractor
              </h2>

              <h3 className="text-sm font-semibold text-slate-900">
                4.1 Professional standards
              </h3>
              <p>You agree to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Carry out all work with reasonable care and skill</li>
                <li>
                  Comply with all applicable UK laws, regulations and industry
                  standards
                </li>
                <li>
                  Hold and maintain any required trade qualifications (e.g.
                  GasSafe, NICEIC)
                </li>
                <li>
                  Attend jobs at the agreed time or give reasonable notice if
                  you cannot
                </li>
                <li>Act politely and professionally towards tenants and landlords</li>
              </ul>

              <h3 className="text-sm font-semibold text-slate-900">
                4.2 Insurance
              </h3>
              <p>You must maintain, at your own cost:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Appropriate public liability insurance</li>
                <li>
                  Any other insurance required by law or industry regulations
                </li>
              </ul>
              <p>
                You may be asked to provide proof of current insurance as a
                condition of remaining on the platform.
              </p>
            </section>

            {/* 5. Platform fees & payments */}
            <section id="fees-payments" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                5. Platform fees &amp; payments
              </h2>

              <h3 className="text-sm font-semibold text-slate-900">
                5.1 Propti commission
              </h3>
              <p>
                Propti charges a commission on jobs booked through the platform.
                Unless otherwise agreed in writing, this is:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>10% per job, including urgent or ASAP callouts.</li>
              </ul>
              <p>
                Details of how this fee is charged (deduction at source or
                separate invoicing) will be set out in your account or onboarding
                documentation.
              </p>

              <h3 className="text-sm font-semibold text-slate-900">
                5.2 No handling of client money
              </h3>
              <p>Propti does not:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Hold or manage client funds on your behalf</li>
                <li>Guarantee payment from landlords or agents</li>
                <li>Act as an escrow or settlement service</li>
              </ul>
              <p>
                You are responsible for invoicing and collecting payment directly
                from landlords or agents.
              </p>

              <h3 className="text-sm font-semibold text-slate-900">
                5.3 Payment disputes
              </h3>
              <p>
                If a landlord or agent fails to pay you, this is a dispute
                between you and them. Propti is not responsible for:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Chasing or enforcing payment</li>
                <li>Compensating you for unpaid invoices</li>
                <li>Acting as a mediator in financial disagreements</li>
              </ul>
            </section>

            {/* 6. Jobs & performance */}
            <section id="jobs" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                6. Job acceptance & performance
              </h2>

              <h3 className="text-sm font-semibold text-slate-900">
                6.1 Acceptance and refusal
              </h3>
              <p>
                You are free to accept or reject any job offered to you on
                Propti. You are under no obligation to accept work.
              </p>

              <h3 className="text-sm font-semibold text-slate-900">
                6.2 Attendance and reliability
              </h3>
              <p>If you accept a job, you agree to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Attend at the agreed time and date</li>
                <li>
                  Notify the landlord or agent promptly if you are delayed or
                  cannot attend
                </li>
                <li>
                  Avoid repeated missed appointments or no-shows, which may lead
                  to removal from the platform
                </li>
              </ul>

              <h3 className="text-sm font-semibold text-slate-900">
                6.3 Safety
              </h3>
              <p>You must:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Follow relevant health and safety regulations</li>
                <li>
                  Use tools and equipment that are safe and properly maintained
                </li>
                <li>Work in a way that does not endanger tenants or others</li>
              </ul>
            </section>

            {/* 7. Communication & conduct */}
            <section id="communication" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                7. Communication & conduct
              </h2>
              <p>Where possible, you should:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Use in-app messaging for communication about jobs</li>
                <li>Keep your messages clear and professional</li>
              </ul>
              <p>You must not:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Harass, abuse or threaten tenants or landlords</li>
                <li>Use discriminatory or offensive language</li>
                <li>Upload illegal, explicit or inappropriate content</li>
              </ul>
            </section>

            {/* 8. Liability & indemnity */}
            <section id="liability" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                8. Liability &amp; indemnity
              </h2>

              <h3 className="text-sm font-semibold text-slate-900">
                8.1 Your liability
              </h3>
              <p>
                You are solely responsible for your work and accept full
                liability for:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Your workmanship and professional decisions</li>
                <li>Damage caused to property during your work</li>
                <li>Injury caused by your actions or omissions</li>
                <li>Use of incorrect or unsafe materials or methods</li>
                <li>
                  Failing to hold or maintain required qualifications or
                  insurance
                </li>
              </ul>

              <h3 className="text-sm font-semibold text-slate-900">
                8.2 Propti’s liability
              </h3>
              <p>
                To the fullest extent permitted by law, Propti will not be liable
                for:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Your conduct, workmanship or professional advice</li>
                <li>Property damage or injury linked to your work</li>
                <li>Loss of earnings or missed job opportunities</li>
                <li>Payment disputes between you and landlords/agents</li>
                <li>Any accidents or incidents on-site</li>
              </ul>

              <h3 className="text-sm font-semibold text-slate-900">
                8.3 Indemnity
              </h3>
              <p>
                You agree to indemnify and hold Propti harmless from any claims,
                losses, damages, costs or expenses (including reasonable legal
                fees) arising from:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Your work or conduct on or off site</li>
                <li>Breach of this Agreement</li>
                <li>Failure to comply with laws, regulations or safety rules</li>
              </ul>
            </section>

            {/* 9. Account termination */}
            <section id="termination" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                9. Account suspension & termination
              </h2>
              <p>
                We may suspend or terminate your Propti account at any time if
                we reasonably believe that you have:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Provided false or misleading information</li>
                <li>Uploaded fraudulent or invalid documentation</li>
                <li>Failed to work safely or professionally</li>
                <li>Received repeated serious complaints</li>
                <li>Missed appointments without notice</li>
                <li>Breached this Agreement</li>
              </ul>
              <p>
                You may close your account at any time by contacting us or, where
                available, via your account settings.
              </p>
            </section>

            {/* 10. Data protection */}
            <section id="data-protection" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                10. Data protection
              </h2>
              <p>
                Your personal data and any data you access via Propti is
                processed in accordance with our{" "}
                <a
                  href="/legal/privacy-policy"
                  className="underline underline-offset-2"
                >
                  Privacy Policy
                </a>
                .
              </p>
              <p>
                You must only access and use tenant or landlord data where
                necessary to complete a job, and you must keep that information
                secure and confidential.
              </p>
            </section>

            {/* 11. Changes & governing law */}
            <section id="changes-law" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                11. Changes &amp; governing law
              </h2>
              <p>
                We may update this Agreement from time to time. If we make
                significant changes, we will take reasonable steps to notify you.
                Continued use of Propti after changes take effect means you
                accept the updated terms.
              </p>
              <p>
                This Agreement is governed by the laws of England &amp; Wales.
                Any disputes will be handled by the courts of England &amp;
                Wales.
              </p>
            </section>

            {/* Contact */}
            <section id="contact" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                Contact
              </h2>
              <p>
                If you have any questions about this Contractor Agreement, you
                can contact us:
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

          {/* SIDE SUMMARY */}
          <aside className="space-y-4">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 mb-2">
                Quick summary (not legal advice)
              </h3>
              <ul className="text-xs space-y-1 text-slate-600">
                <li>• You’re an independent contractor, not our employee.</li>
                <li>• You’re responsible for your work, safety and insurance.</li>
                <li>• Propti charges a 10% platform fee on jobs.</li>
                <li>• Payment disputes are between you and the landlord/agent.</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </LegalLayout>
  );
}
