const faqs = [
  {
    q: "Do I need an identity to start an intake?",
    a: "No. A street name or no name is acceptable. Identity details are optional and stored separately.",
  },
  {
    q: "Is this a chatbot or automated triage?",
    a: "No. CareLink is human-led. AI can assist with documentation or summaries but never makes decisions.",
  },
  {
    q: "Can data be shared without consent?",
    a: "No. Sharing is explicit, time-bound, and revocable. There is no default sharing with law enforcement.",
  },
  {
    q: "How is identity protected?",
    a: "Identity data is kept in a restricted vault, separate from continuity records and accessed only by authorized roles.",
  },
  {
    q: "Does CareLink track location?",
    a: "No. The platform avoids passive tracking and only allows non-GPS, optional notes when needed.",
  },
  {
    q: "Does this replace EHR or HMIS systems?",
    a: "No. CareLink complements existing systems by bridging the pre-clinical and transition-of-care gaps.",
  },
  {
    q: "Is it HIPAA compliant?",
    a: "CareLink follows HIPAA-aligned, privacy-by-design principles without claiming legal compliance.",
  },
];

export default function FAQPage() {
  return (
    <div className="stack container">
      <div className="card">
        <h1 style={{ marginTop: 0 }}>FAQ</h1>
        <p className="muted">
          Common questions about privacy, scope, and how CareLink supports continuity.
        </p>
      </div>

      {faqs.map((f) => (
        <div key={f.q} className="card">
          <h3 style={{ marginTop: 0 }}>{f.q}</h3>
          <p className="muted">{f.a}</p>
        </div>
      ))}
    </div>
  );
}
