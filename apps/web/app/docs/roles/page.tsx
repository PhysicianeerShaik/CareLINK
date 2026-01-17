export default function RolesDocPage() {
  return (
    <div className="stack">
      <div className="card">
        <h1 style={{ marginTop: 0 }}>Roles & RBAC (MVP)</h1>
        <p className="muted">
          CareLink is designed around <b>least privilege</b> and separation of identity from care content.
          Assign roles via Firebase Auth custom claims: <code>{`{"role":"student"|"advocate"|"supervisor"|"admin"}`}</code>
        </p>
      </div>

      <div className="card">
        <h2 style={{ marginTop: 0 }}>Role definitions</h2>
        <ul className="muted">
          <li><b>Student/Volunteer:</b> create intake drafts, view continuity records, cannot view Identity Vault.</li>
          <li><b>Advocate/Case Lead:</b> can view Identity Vault, finalize plans, generate share tokens.</li>
          <li><b>Supervisor/Clinician:</b> review note content; still restricted from sensitive identity fields by default.</li>
          <li><b>Admin:</b> system management; should not access content by default (separate privilege recommended).</li>
        </ul>
      </div>

      <div className="card">
        <h2 style={{ marginTop: 0 }}>Time-limited student access (recommended)</h2>
        <p className="muted">
          Implement an additional claim: <code>accessUntil</code> (epoch ms). Firestore rules can require <code>request.time</code> to be before this timestamp.
        </p>
      </div>

      <a className="button secondary" href="/admin">Back</a>
    </div>
  );
}
