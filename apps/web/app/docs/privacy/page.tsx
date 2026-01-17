export default function PrivacyPage() {
  return (
    <div className="stack container">
      <div className="card">
        <h1 style={{ marginTop: 0 }}>Privacy-First Architecture</h1>
        <p className="muted">
          CareLink Street Consult is designed to preserve continuity without expanding surveillance.
          It operates before and between institutional systems and complements EHR/HMIS workflows.
        </p>
      </div>

      <div className="card">
        <h2 style={{ marginTop: 0 }}>Core commitments</h2>
        <ul className="muted">
          <li>Minimum necessary data collection, with explicit consent.</li>
          <li>Patient ownership of data with revocation and deletion pathways.</li>
          <li>Separation of identity from care content (two-layer model).</li>
          <li>Role-based, least-privilege access with auditability.</li>
          <li>No passive tracking or real-time location surveillance.</li>
          <li>No law enforcement sharing by default.</li>
        </ul>
      </div>

      <div className="card">
        <h2 style={{ marginTop: 0 }}>Two-layer data model</h2>
        <p className="muted">
          Continuity records are pseudonymized and indexed by CareLink ID. Identity data lives
          in a restricted vault accessible only to advocates/admins.
        </p>
      </div>

      <div className="card">
        <h2 style={{ marginTop: 0 }}>Privacy-by-design principles</h2>
        <ul className="muted">
          <li>HIPAA-aligned / privacy-by-design principles without claiming legal compliance.</li>
          <li>Explicit, time-bound sharing via tokenized summaries.</li>
          <li>Clear consent logging and audit trails for access events.</li>
        </ul>
      </div>
    </div>
  );
}
