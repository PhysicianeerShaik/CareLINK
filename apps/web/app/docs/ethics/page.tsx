export default function EthicsPage() {
  return (
    <div className="stack container">
      <div className="card">
        <h1 style={{ marginTop: 0 }}>Ethics & Boundaries</h1>
        <p className="muted">
          CareLink is human-led. AI assists with documentation and summaries only.
          It never makes clinical decisions or operates as a chatbot.
        </p>
      </div>

      <div className="card">
        <h2 style={{ marginTop: 0 }}>What CareLink is</h2>
        <ul className="muted">
          <li>A continuity layer for outreach, discharge, and re-engagement.</li>
          <li>A shared memory for follow-through that protects dignity.</li>
          <li>A privacy-first bridge between street teams and clinical partners.</li>
          <li>A complement to EHR/HMIS systems, not a replacement.</li>
        </ul>
      </div>

      <div className="card">
        <h2 style={{ marginTop: 0 }}>What CareLink is not</h2>
        <ul className="muted">
          <li>Not an EHR or HMIS replacement.</li>
          <li>Not a surveillance or tracking system.</li>
          <li>Not an autonomous decision-maker.</li>
        </ul>
      </div>

      <div className="card">
        <h2 style={{ marginTop: 0 }}>Ethical safeguards</h2>
        <ul className="muted">
          <li>Minimum necessary data, with explicit consent and revocation.</li>
          <li>Separation of identity vault vs continuity record.</li>
          <li>Role-based access with auditing and time-limited permissions.</li>
          <li>No default sharing with law enforcement or unrelated systems.</li>
          <li>No passive tracking or real-time location collection.</li>
        </ul>
      </div>
    </div>
  );
}
