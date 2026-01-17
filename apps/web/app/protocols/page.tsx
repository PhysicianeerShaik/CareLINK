import Link from "next/link";

const protocols = [
  { key: "chf", title: "Congestive Heart Failure (CHF)", notes: "Weight, dyspnea, edema, meds, red flags" },
  { key: "copd", title: "COPD / Asthma", notes: "Dyspnea, inhalers, triggers, infection symptoms" },
  { key: "diabetes", title: "Diabetes complications", notes: "Symptoms, sugars if available, access to meds/supplies" },
];

export default function ProtocolsPage() {
  return (
    <div className="stack">
      <div className="card">
        <h1 style={{ marginTop: 0 }}>30-Day Continuity Protocols</h1>
        <p className="muted">
          Check-ins are **coordination only** (no diagnosis). Escalate concerns using a simple tier system (Green→Red) and partner clinical oversight.
        </p>
      </div>

      <div className="grid2">
        {protocols.map((p) => (
          <div key={p.key} className="card">
            <h2 style={{ marginTop: 0 }}>{p.title}</h2>
            <p className="muted">{p.notes}</p>
            <Link className="button" href={`/protocols/${p.key}`}>Open checklist</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
