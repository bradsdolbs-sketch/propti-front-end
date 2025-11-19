import LegalLayout from "../../layouts/LegalLayout";

export default function DpaPage() {
  return (
    <LegalLayout title="Data Processing Agreement (DPA)">
      <div className="space-y-10 text-sm text-slate-700">
        {/* Intro */}
        <header className="space-y-2">
          <p className="text-xs font-medium tracking-[0.18em] text-slate-400">
            LEGAL · DATA PROCESSING AGREEMENT
          </p>
          <h1 className="text-2xl font-semibold text-slate-900">
            Data Processing Agreement (DPA)
          </h1>
          <p className="text-xs text-slate-500">
            Last updated: <span className="font-medium">[Add date]</span>
          </p>
          <p className="text-sm text-slate-600 max-w-2xl">
            This Data Processing Agreement (&quot;DPA&quot;) forms part of the
            agreement between Propti and landlords who use the platform.
            It sets out how Propti processes personal data on your behalf in
            compliance with UK GDPR.
          </p>
        </header>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)]">
          {/* MAIN CONTENT */}
          <div className="space-y-8">
            {/* 1. Parties & purpose */}
            <section id="parties" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                1. Parties and purpose
              </h2>
              <p>
                This DPA is between:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <span className="font-medium">Controller:</span> the landlord
                  or property owner using Propti to manage maintenance and
                  tenancy-related activity.
                </li>
                <li>
                  <span className="font-medium">Processor:</span> Propti Ltd,
                  which provides the software platform and processes personal
                  data on behalf of the Controller.
                </li>
              </ul>
              <p>
                The purpose of this DPA is to ensure that Propti processes
                personal data in line with the UK General Data Protection
                Regulation (UK GDPR) and the Data Protection Act 2018.
              </p>
            </section>

            {/* 2. Definitions */}
            <section id="definitions" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                2. Definitions
              </h2>
              <p>In this DPA:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <span className="font-medium">Personal Data</span> means any
                  information relating to an identified or identifiable natural
                  person.
                </li>
                <li>
                  <span className="font-medium">Processing</span> means any
                  operation performed on personal data (such as collection,
                  storage, use, disclosure or deletion).
                </li>
                <li>
                  <span className="font-medium">Data Subject</span> means any
                  individual whose personal data is processed (including
                  tenants, landlords, and contractors).
                </li>
                <li>
                  <span className="font-medium">Platform</span> means the Propti
                  software application and related services.
                </li>
              </ul>
            </section>

            {/* 3. Scope of processing */}
            <section id="scope" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                3. Scope of processing
              </h2>
              <p>
                Propti processes personal data only as necessary to provide the
                Platform to the Controller. This includes, for example:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Tenant maintenance reports and related messages</li>
                <li>Photos and videos uploaded to describe an issue</li>
                <li>Property and tenancy information</li>
                <li>Contractor booking details and job logs</li>
                <li>Contact information for landlords, tenants and contractors</li>
              </ul>
              <p>
                Propti will not process personal data for any purpose other than
                those set out in this DPA, the Landlord Terms &amp; Conditions,
                or as otherwise documented by the Controller.
              </p>
            </section>

            {/* 4. Controller responsibilities */}
            <section id="controller" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                4. Controller responsibilities
              </h2>
              <p>The Controller is responsible for:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Ensuring there is a lawful basis for processing personal data
                  within Propti.
                </li>
                <li>
                  Providing accurate, up-to-date personal data for tenants,
                  contractors and other data subjects.
                </li>
                <li>
                  Informing tenants and other data subjects that their data will
                  be processed via Propti.
                </li>
                <li>
                  Ensuring that data uploaded to Propti is lawful and does not
                  infringe rights of third parties.
                </li>
              </ul>
            </section>

            {/* 5. Processor obligations */}
            <section id="processor" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                5. Processor obligations
              </h2>
              <p>Propti, as Processor, agrees to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Process personal data only on documented instructions from the
                  Controller, including those given through use of the Platform.
                </li>
                <li>
                  Ensure that persons authorised to process personal data are
                  subject to confidentiality obligations.
                </li>
                <li>
                  Implement appropriate technical and organisational measures to
                  protect personal data.
                </li>
                <li>
                  Not sell personal data or use it for advertising or unrelated
                  purposes.
                </li>
              </ul>
            </section>

            {/* 6. Security measures */}
            <section id="security" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                6. Security measures
              </h2>
              <p>
                Propti uses appropriate technical and organisational security
                measures, including:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Encryption of data at rest and in transit</li>
                <li>
                  Hosting on reputable cloud infrastructure providers (e.g. AWS)
                </li>
                <li>Role-based access controls and least-privilege access</li>
                <li>Secure authentication and logging of key system actions</li>
                <li>Backups and disaster recovery procedures</li>
              </ul>
              <p className="text-xs text-slate-500">
                A more detailed overview is contained in Propti&apos;s Internal
                Data Security Policy.
              </p>
            </section>

            {/* 7. Sub-processors */}
            <section id="subprocessors" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                7. Sub-processors
              </h2>
              <p>
                Propti uses carefully selected third-party service providers
                (&quot;sub-processors&quot;) to deliver the Platform, such as:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>AWS (hosting and storage)</li>
                <li>Stripe (payments)</li>
                <li>OpenAI (AI triage processing)</li>
                <li>Firebase/Auth0 (authentication)</li>
                <li>Analytics and monitoring tools</li>
              </ul>
              <p>
                Propti ensures that all sub-processors are bound by data
                protection terms that are no less protective than this DPA.
                The Controller authorises Propti to engage these sub-processors
                as reasonably necessary to provide the Platform.
              </p>
            </section>

            {/* 8. International transfers */}
            <section id="transfers" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                8. International data transfers
              </h2>
              <p>
                Where personal data is transferred outside the UK, Propti will
                ensure that appropriate safeguards are in place, such as:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  The UK Addendum to the EU Standard Contractual Clauses (SCCs)
                </li>
                <li>Adequacy regulations approved by the UK government</li>
                <li>Other legally permitted transfer mechanisms</li>
              </ul>
            </section>

            {/* 9. Data subject rights */}
            <section id="dsr" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                9. Assistance with data subject rights
              </h2>
              <p>
                Propti will reasonably assist the Controller in responding to
                data subject requests under UK GDPR, including:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Access to personal data</li>
                <li>Rectification or erasure</li>
                <li>Restriction of processing</li>
                <li>Data portability</li>
                <li>Objections to processing</li>
              </ul>
              <p>
                Requests should be directed to Propti via email, and we will
                support the Controller in fulfilling its obligations.
              </p>
            </section>

            {/* 10. Breach notification */}
            <section id="breach" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                10. Personal data breaches
              </h2>
              <p>
                If Propti becomes aware of a personal data breach affecting
                personal data processed on behalf of the Controller, Propti
                will:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Notify the Controller without undue delay</li>
                <li>
                  Provide information reasonably required for the Controller to
                  meet its regulatory obligations
                </li>
                <li>
                  Take reasonable steps to mitigate the effects of the breach
                </li>
              </ul>
            </section>

            {/* 11. Deletion / return */}
            <section id="deletion" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                11. Deletion or return of data
              </h2>
              <p>
                On termination of the Controller&apos;s account, Propti will:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Delete or anonymise personal data after applicable retention
                  periods; and/or
                </li>
                <li>
                  Provide a data export where reasonably requested within a
                  defined timeframe.
                </li>
              </ul>
              <p>
                Propti may retain limited data where necessary to comply with
                legal, accounting or regulatory obligations.
              </p>
            </section>

            {/* 12. Liability & duration */}
            <section id="liability" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                12. Liability, duration and governing law
              </h2>
              <p>
                This DPA applies for as long as Propti processes personal data
                on behalf of the Controller. Liability provisions are governed
                by the Landlord Terms &amp; Conditions and do not extend
                Propti&apos;s liability beyond those terms.
              </p>
              <p>
                This DPA is governed by the laws of England and Wales. Any
                disputes will be resolved in the courts of England and Wales.
              </p>
            </section>

            {/* 13. Contact */}
            <section id="contact" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                13. Contact
              </h2>
              <p>
                For questions about this DPA or data protection more generally:
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
                <li>• Landlord = Controller, Propti = Processor.</li>
                <li>• We only use data to run the platform.</li>
                <li>• We use secure hosting and vetted sub-processors.</li>
                <li>• You stay in control of tenant and property data.</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </LegalLayout>
  );
}
