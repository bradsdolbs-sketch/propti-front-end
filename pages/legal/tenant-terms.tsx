import LegalLayout from "../../layouts/LegalLayout";

export default function TenantTermsPage() {
  return (
    <LegalLayout title="Tenant Terms of Use">
      <p className="text-sm text-slate-500 mb-4">
        Last updated: [Add date]
      </p>

      <h2>1. Introduction</h2>
      <p>
        These Tenant Terms of Use (&quot;Terms&quot;) apply to all tenants who
        access or use Propti (&quot;the Platform&quot;, &quot;we&quot;,
        &quot;us&quot;). Propti provides a digital tool for tenants to report
        maintenance issues and communicate with their landlord. By using Propti,
        you agree to these Terms. If you do not accept them, you must stop using
        Propti immediately.
      </p>

      <h2>2. What Propti Is</h2>
      <p>
        Propti is a software platform used for reporting maintenance issues,
        uploading photos or videos, tracking repair progress and communicating
        with your landlord or their contractors.
      </p>
      <p>
        Propti is not your landlord, a letting agent, a property manager, a
        contractor, a legal advisor or an emergency service. Propti does not
        provide or guarantee repairs. Your tenancy agreement remains strictly
        between you and your landlord.
      </p>

      <h2>3. What Propti Is Not Responsible For</h2>
      <h3>3.1 Repairs or Maintenance</h3>
      <p>
        Propti does not schedule or complete repairs, guarantee contractor work,
        or control landlord decisions. Propti does not manage or supervise
        repairs.
      </p>

      <h3>3.2 Tenancy Management</h3>
      <p>
        Propti is not involved in rent payments, deposits, tenancy contracts,
        inspections, renewals, evictions, notices or disputes. These must be
        handled directly with your landlord.
      </p>

      <h3>3.3 Emergency Issues</h3>
      <p>
        Propti is not an emergency reporting tool. In case of gas leaks, power
        loss, serious water leaks, fire or other urgent safety issues, contact
        emergency services or your landlord directly.
      </p>

      <h3>3.4 AI Limitations</h3>
      <p>
        Any AI triage or help provided in the platform may be inaccurate or
        misinterpret photos. It is not professional advice. You must use your
        own judgement when reporting issues.
      </p>

      <h2>4. Your Responsibilities as a Tenant</h2>
      <h3>4.1 Accurate Reporting</h3>
      <p>
        You agree to report issues honestly, upload accurate photos/videos and
        provide truthful descriptions. You are legally liable for damage you
        cause, in line with your tenancy agreement.
      </p>

      <h3>4.2 Appropriate Use</h3>
      <p>
        You must not upload abusive, discriminatory, explicit or illegal
        content, harass landlords or contractors, or use Propti for fraudulent
        claims.
      </p>

      <h3>4.3 Communication</h3>
      <p>
        Messages you send through Propti may be visible to your landlord,
        authorised contractors and Propti support where legally required.
      </p>

      <h2>5. Platform Availability</h2>
      <p>
        Propti aims for reliable uptime but may occasionally be unavailable.
        Message delivery is not guaranteed as instant. For urgent matters, you
        must contact your landlord directly.
      </p>

      <h2>6. Limitation of Liability</h2>
      <p>
        To the fullest extent allowed by law, Propti is not liable for delayed
        repairs, missed appointments, personal injury caused by contractors,
        damage to your belongings, loss arising from inaccurate AI suggestions
        or conflicts between you and your landlord. Your tenancy agreement
        controls your rights, not the Propti platform.
      </p>

      <h2>7. Termination</h2>
      <p>
        We may suspend or terminate your access if you misuse the platform,
        upload illegal or harmful content, or breach these Terms. You may stop
        using Propti at any time.
      </p>

      <h2>8. Data Protection</h2>
      <p>
        Your personal data is handled according to our Privacy Policy and our
        legal obligations under UK GDPR. You may request access, correction or
        deletion of your data by emailing{" "}
        <a href="mailto:enquiries@propti.com">enquiries@propti.com</a>.
      </p>

      <h2>9. Changes to These Terms</h2>
      <p>
        We may update these Terms from time to time. Continued use of Propti
        means you accept the updated Terms.
      </p>

      <h2>10. Governing Law</h2>
      <p>
        These Terms are governed by English law. Disputes will be handled by the
        courts of England &amp; Wales.
      </p>
    </LegalLayout>
  );
}
