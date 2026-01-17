import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="stack">
      <div className="card">
        <h1 style={{ marginTop: 0 }}>Admin</h1>
        <p className="muted">
          In the MVP scaffold, role assignment uses Firebase Auth <b>custom claims</b>.
          Production deployments should include:
        </p>
        <ul className="muted">
          <li>Invite-only accounts and organization allowlists</li>
          <li>Time-limited student access (e.g., expires in 72h)</li>
          <li>Audit review and suspicious-activity alerts</li>
        </ul>
        <p className="muted">
          See the RBAC doc for exact claim shape and suggested workflows.
        </p>
        <Link className="button" href="/docs/roles">Open roles & RBAC docs</Link>
      </div>

      <div className="card">
        <h2 style={{ marginTop: 0 }}>Quick links</h2>
        <div className="grid2">
          <Link className="button secondary" href="/intake">New Intake</Link>
          <Link className="button secondary" href="/protocols">Protocols</Link>
        </div>
      </div>
    </div>
  );
}
