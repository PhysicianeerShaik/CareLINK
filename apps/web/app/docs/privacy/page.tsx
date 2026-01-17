export default function PrivacyPage() {
  return (
    <div className="stack container">
      <div className="card">
        <h1 style={{ marginTop: 0 }}>Privacy-First Architecture</h1>
        <p className="muted">
          CareLink Street Consult is designed to preserve continuity without expanding surveillance.
          It operates before and between institutional systems, never replacing them.
        </p>
      </div>

      <div className="card">
        <h2 style={{ marginTop: 0 }}>Core commitments</h2>
        <ul className="muted">
          <li>Minimum necessary data collection, with explicit consent.</li>
          <li>Separation of identity from care content (two-layer model).</li>
          <li>Role-based, least-privilege access with time-limited permissions.</li>
          <li>No passive tracking or location surveillance.</li>
          <li>Patient-held, tokenized summaries with revocation.</li>
        </ul>
      </div>

      <div className="card">
        <h2 style={{ marginTop: 0 }}>Two-layer data model</h2>
        <p className="muted">
          Continuity records are pseudonymized and indexed by CareLink ID. Identity data lives
          in a restricted vault accessible only to advocates/admins.
        </p>
      </div>
    </div>
  );
}
