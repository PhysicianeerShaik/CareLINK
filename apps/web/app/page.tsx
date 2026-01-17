export default function HomePage() {
  return (
    <div className="stack">
      <h1 style={{ margin: 0 }}>CareLink Street Consult</h1>
      <p className="muted" style={{ maxWidth: 760 }}>
        A privacy-first continuity layer for street outreach and transitions, built
        around minimum-necessary data, consent, and role-limited access.
      </p>

      <div className="grid2">
        <div className="card">
          <h2 style={{ marginTop: 0 }}>Start a new intake</h2>
          <p className="muted">
            Human-led, trauma-informed intake. Street name supported. Identity optional.
          </p>
          <a className="button" href="/intake">New Intake</a>
        </div>

        <div className="card">
          <h2 style={{ marginTop: 0 }}>Post-discharge protocols</h2>
          <p className="muted">
            30-day continuity check-ins with escalation tiers (Green → Red).
          </p>
          <a className="button" href="/protocols">Protocols</a>
        </div>

        <div className="card">
          <h2 style={{ marginTop: 0 }}>Share a patient-held summary</h2>
          <p className="muted">
            Tokenized, read-only summary page. Time-bound and revocable.
          </p>
          <p className="muted" style={{ marginBottom: 0 }}>
            Create from a record view.
          </p>
        </div>

        <div className="card">
          <h2 style={{ marginTop: 0 }}>Admin</h2>
          <p className="muted">
            Role-based access (student/volunteer vs advocate vs supervisor vs admin).
          </p>
          <a className="button" href="/admin">Admin</a>
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginTop: 0 }}>Scope & safety</h3>
        <ul className="muted">
          <li>No diagnosis. No autonomous care decisions.</li>
          <li>No location tracking. No sharing by default.</li>
          <li>Identity data is stored separately from continuity content.</li>
          <li>Every record view/edit/share is written to an audit log.</li>
        </ul>
      </div>
    </div>
  );
}
