export default function ShareDemoPage() {
  return (
    <div className="stack container">
      <div className="card">
        <h1 style={{ marginTop: 0 }}>Patient-held Summary (Demo)</h1>
        <p className="muted">
          This is a read-only, token-style summary. No login required. No identity details shown.
        </p>
        <div className="tag">Demo token: SH-READONLY-EXAMPLE</div>
      </div>

      <div className="card">
        <h2 style={{ marginTop: 0 }}>Continuity snapshot</h2>
        <div className="kv">
          <div className="k">CareLink ID</div>
          <div className="v">CL-7F3A19C2</div>
          <div className="k">Last encounter</div>
          <div className="v">Street consult, 2 days ago</div>
          <div className="k">Goals</div>
          <div className="v">Shelter placement, primary care connection</div>
          <div className="k">Next steps</div>
          <div className="v">Clinic appointment scheduled, follow-up in 72 hours</div>
        </div>
      </div>

      <div className="card">
        <h2 style={{ marginTop: 0 }}>Notes for partner teams</h2>
        <ul className="muted">
          <li>Consent granted to share this summary with the named clinic only.</li>
          <li>No identity details included; contact through outreach team.</li>
          <li>Escalate urgent concerns via partner clinical oversight.</li>
        </ul>
      </div>
    </div>
  );
}
