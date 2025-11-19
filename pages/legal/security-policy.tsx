import LegalLayout from "../../layouts/LegalLayout";

export default function SecurityPolicyPage() {
  return (
    <LegalLayout title="Internal Data Security Policy">
      <div className="space-y-10 text-sm text-slate-700">
        {/* INTRO */}
        <header className="space-y-2">
          <p className="text-xs font-medium tracking-[0.18em] text-slate-400">
            INTERNAL · DATA SECURITY
          </p>
          <h1 className="text-2xl font-semibold text-slate-900">
            Internal Data Security Policy
          </h1>
          <p className="text-xs text-slate-500">
            Last updated: <span className="font-medium">[Add date]</span>
          </p>
          <p className="text-sm text-slate-600 max-w-2xl">
            This Internal Data Security Policy describes how Propti protects
            personal data, platform integrity and infrastructure security across
            all environments. It is designed to align with UK GDPR, the Data
            Protection Act 2018 and ICO expectations.
          </p>
          <p className="text-xs text-slate-500">
            Although primarily for internal use, we make this document
            available publicly to show how we think about security.
          </p>
        </header>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)]">
          {/* MAIN CONTENT */}
          <div className="space-y-8">
            {/* 1. Purpose */}
            <section id="purpose" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                1. Purpose
              </h2>
              <p>
                This policy sets out how Propti Ltd (&quot;Propti&quot;,
                &quot;we&quot;, &quot;our&quot;) protects personal data,
                systems and infrastructure. It underpins how we:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Design and build the platform</li>
                <li>Grant and manage internal access</li>
                <li>Store, process and transmit data securely</li>
                <li>Respond to incidents and breaches</li>
                <li>Manage third-party tools and sub-processors</li>
              </ul>
            </section>

            {/* 2. Scope */}
            <section id="scope" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                2. Scope
              </h2>
              <p>This policy applies to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>All Propti staff, contractors and developers</li>
                <li>All environments (development, staging, production)</li>
                <li>
                  All personal data relating to landlords, tenants, contractors
                  and other users
                </li>
                <li>Internal tools and administration interfaces</li>
              </ul>
            </section>

            {/* 3. Data roles & classification */}
            <section id="roles" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                3. Data roles and classification
              </h2>
              <p>
                For most usage, landlords act as{" "}
                <span className="font-medium">Data Controllers</span> and Propti
                acts as a <span className="font-medium">Data Processor</span>.
                Tenants, contractors and landlords themselves are{" "}
                <span className="font-medium">Data Subjects</span>.
              </p>
              <p>We classify data into three levels:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <span className="font-medium">Level 1 – Public:</span>{" "}
                  marketing copy, generic legal text, blog content.
                </li>
                <li>
                  <span className="font-medium">Level 2 – Internal:</span>{" "}
                  internal documentation, architecture notes, non-personal
                  business information.
                </li>
                <li>
                  <span className="font-medium">
                    Level 3 – Confidential / Personal Data:
                  </span>{" "}
                  names, emails, phone numbers, property details, maintenance
                  photos, contractor documentation, messages.
                </li>
              </ul>
              <p>
                Level 3 data receives the strictest protection, including
                encryption, limited access and monitoring.
              </p>
            </section>

            {/* 4. Access control */}
            <section id="access-control" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                4. Access control
              </h2>
              <p>
                Propti follows a{" "}
                <span className="font-medium">least privilege</span> model:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Each role gets the minimum permissions needed to do their job.
                </li>
                <li>
                  Developers ordinarily work with test data in development and
                  staging, not real production data.
                </li>
                <li>
                  Production access is tightly limited and requires explicit
                  authorisation.
                </li>
                <li>
                  All internal accounts must use multi-factor authentication
                  (MFA) wherever supported.
                </li>
              </ul>
              <p>
                All access to production systems, administration panels and data
                exports is logged and may be periodically reviewed.
              </p>
            </section>

            {/* 5. Authentication & passwords */}
            <section id="auth" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                5. Authentication and password practices
              </h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Internal accounts must use strong, unique passwords.</li>
                <li>
                  A password manager is recommended for all staff with system
                  access.
                </li>
                <li>
                  Passwords must not be shared between individuals or stored in
                  plain text.
                </li>
                <li>
                  Where possible, SSO and MFA are enabled for key systems.
                </li>
              </ul>
            </section>

            {/* 6. Data storage & encryption */}
            <section id="storage" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                6. Data storage and encryption
              </h2>
              <p>We use reputable cloud providers for hosting and storage.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Databases and file storage are encrypted at rest using
                  industry-standard algorithms (e.g. AES-256 or equivalent).
                </li>
                <li>
                  Data in transit is protected using HTTPS/TLS 1.2+ and secure
                  websocket connections where applicable.
                </li>
                <li>
                  Maintenance photos and documents are stored in private
                  buckets, accessed via signed URLs or authenticated requests.
                </li>
              </ul>
            </section>

            {/* 7. Developer & engineering practices */}
            <section id="engineering" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                7. Developer and engineering practices
              </h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>All code changes are peer-reviewed before deployment.</li>
                <li>
                  Secrets (API keys, database credentials) are stored in secure
                  configuration systems, not committed to source control.
                </li>
                <li>
                  Real personal data is not used in development or staging
                  environments except in controlled, audited scenarios.
                </li>
                <li>
                  Only authorised engineers with a valid business need may
                  access production systems.
                </li>
              </ul>
            </section>

            {/* 8. Backups & DR */}
            <section id="backups" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                8. Backups and disaster recovery
              </h2>
              <p>We maintain regular, encrypted backups of key systems.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Databases are backed up on a scheduled basis.</li>
                <li>File storage (e.g. maintenance photos) uses versioning.</li>
                <li>
                  Backups are stored separately from primary systems and tested
                  periodically.
                </li>
                <li>
                  Our aim is to keep recovery time and data loss to a reasonable
                  minimum in the event of a major incident.
                </li>
              </ul>
            </section>

            {/* 9. Data retention & deletion */}
            <section id="retention" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                9. Data retention and deletion
              </h2>
              <p>
                We follow sensible retention periods that balance operational
                needs with privacy:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Inactive tenant and maintenance records are removed or
                  anonymised after a defined period, subject to landlord
                  settings and legal requirements.
                </li>
                <li>
                  Landlord account data is removed after account closure, except
                  where we must retain limited information for legal and
                  accounting purposes.
                </li>
                <li>
                  Contractor records may be retained longer where needed for
                  audit and safety-related history.
                </li>
              </ul>
            </section>

            {/* 10. Incidents & breaches */}
            <section id="incidents" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                10. Security incidents and breach response
              </h2>
              <p>
                All staff are required to report suspected security incidents or
                unusual system behaviour immediately.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Incidents are logged and investigated promptly.</li>
                <li>
                  Access may be revoked or rotated while an incident is under
                  review.
                </li>
                <li>
                  Where a personal data breach is confirmed, we will assess
                  impact and, where required, notify controllers and relevant
                  authorities (e.g. ICO) within the applicable timeframes.
                </li>
              </ul>
            </section>

            {/* 11. Sub-processors */}
            <section id="subprocessors" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                11. Sub-processor security
              </h2>
              <p>
                We work only with third-party providers who can demonstrate
                robust security and data protection practices.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  All sub-processors sign appropriate data protection
                  agreements.
                </li>
                <li>
                  We review technical and organisational measures where
                  possible, and monitor for material changes.
                </li>
                <li>
                  International transfers are handled in line with UK GDPR (for
                  example via Standard Contractual Clauses and the UK Addendum).
                </li>
              </ul>
            </section>

            {/* 12. Devices & physical security */}
            <section id="devices" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                12. Devices and physical security
              </h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Devices used to access production systems must be
                  password-protected and use full-disk encryption.
                </li>
                <li>
                  Staff must avoid storing personal data locally unless
                  strictly necessary and appropriately protected.
                </li>
                <li>
                  Shared screens or devices must be locked when unattended.
                </li>
              </ul>
            </section>

            {/* 13. Training & enforcement */}
            <section id="training" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                13. Training, enforcement and review
              </h2>
              <p>
                Team members with access to personal data receive training on
                data protection and security best practice.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Security and privacy training is refreshed periodically or
                  following major changes.
                </li>
                <li>
                  Breaches of this policy may result in access changes,
                  disciplinary action, or termination of contracts.
                </li>
                <li>
                  This policy is reviewed at least annually, or after significant
                  technical or regulatory changes.
                </li>
              </ul>
            </section>

            {/* 14. Contact */}
            <section id="contact" className="space-y-3">
              <h2 className="text-base font-semibold text-slate-900">
                14. Contact
              </h2>
              <p>
                Questions about this policy, security practices or data
                protection can be directed to:
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
                Quick summary (not a contract)
              </h3>
              <ul className="text-xs space-y-1 text-slate-600">
                <li>• Least-privilege access with MFA.</li>
                <li>• Encryption in transit and at rest.</li>
                <li>• No real data in dev/staging.</li>
                <li>• Logged access to production.</li>
                <li>• Backups, DR and incident handling.</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </LegalLayout>
  );
}
