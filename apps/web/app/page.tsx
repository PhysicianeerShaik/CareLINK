type Founder = {
  name: string;
  title: string;
  bio: string;
  email: string;
};

const founders: Founder[] = [
  {
    name: "Avery Quinn",
    title: "Founder, Outreach Operations",
    bio: "Former street outreach lead focused on trauma-informed intake and continuity across encampments and shelters.",
    email: "contact@carelink.example",
  },
  {
    name: "Dr. Samir Patel",
    title: "Founder, Clinical Liaison",
    bio: "Hospital discharge coordinator building safer handoffs for the 48-hour to 30-day post-discharge window.",
    email: "clinical@carelink.example",
  },
  {
    name: "Jordan Reyes",
    title: "Founder, Privacy & Systems",
    bio: "Privacy-first product architect focused on minimum necessary data and consent-driven sharing.",
    email: "privacy@carelink.example",
  },
];

const timeline = [
  {
    step: "1",
    title: "Human-led street consult",
    detail: "Capture concerns, goals, and barriers without forcing identity disclosure.",
  },
  {
    step: "2",
    title: "Continuity record created",
    detail: "Pseudonymized record indexed by CareLink ID, separated from identity vault.",
  },
  {
    step: "3",
    title: "Follow-through planning",
    detail: "Tasks and next steps owned by the outreach team with partner escalation.",
  },
  {
    step: "4",
    title: "Patient-held summary",
    detail: "Tokenized, read-only link shared by consent and revocable anytime.",
  },
];

export default function HomePage() {
  return (
    <div className="landing">
      <section className="hero">
        <div className="container hero-grid fade-in">
          <div>
            <div className="eyebrow">Human-led, AI-supported continuity</div>
            <h1 className="hero-title">CareLink Street Consult</h1>
            <p className="hero-sub">
              Human-led, AI-supported continuity for the pre-clinical phase of care.
              Built for street outreach, discharge transitions, and re-engagement with privacy-first architecture.
            </p>
            <div className="cta-row">
              <a className="button" href="/intake">Start a Street Consult</a>
              <a className="button secondary" href="/docs/privacy">View Privacy-First Architecture</a>
              <a className="link" href="/share/demo">Patient-held Summary Demo</a>
            </div>
            <div className="hero-note">
              Not an EHR or HMIS. Not a chatbot. No surveillance. Consent-driven and minimum necessary.
            </div>
          </div>
          <div className="hero-card">
            <div className="hero-card-header">
              <span className="badge">Continuity snapshot</span>
              <span className="badge">Read-only share</span>
            </div>
            <div className="hero-card-body">
              <div className="hero-kv">
                <div className="k">CareLink ID</div>
                <div className="v">CL-7F3A19C2</div>
                <div className="k">Encounter</div>
                <div className="v">Street consult, 2 days ago</div>
                <div className="k">Top concerns</div>
                <div className="v">Breathing issues, wound care, shelter placement</div>
                <div className="k">Next steps</div>
                <div className="v">Clinic referral + follow-up check-in</div>
              </div>
              <div className="hero-divider" />
              <div className="hero-tags">
                <span className="tag">Identity stored separately</span>
                <span className="tag">Consent required to share</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section fade-in" style={{ animationDelay: "0.08s" }}>
        <div className="container">
          <h2 className="section-title">Why it exists</h2>
          <div className="grid two">
            <div className="card">
              <h3 style={{ marginTop: 0 }}>Pre-clinical blind spot</h3>
              <p className="muted">
                Most care happens before eligibility and outside formal systems. CareLink preserves continuity in that gap.
              </p>
            </div>
            <div className="card">
              <h3 style={{ marginTop: 0 }}>Lost referrals</h3>
              <p className="muted">
                Discharge plans and street referrals disappear without a bridge. CareLink keeps follow-through visible.
              </p>
            </div>
            <div className="card">
              <h3 style={{ marginTop: 0 }}>Follow-through ownership</h3>
              <p className="muted">
                Outreach teams need a shared memory to track tasks without collecting more than necessary.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section fade-in" style={{ animationDelay: "0.16s" }}>
        <div className="container">
          <h2 className="section-title">How it works</h2>
          <div className="timeline">
            {timeline.map((t) => (
              <div key={t.step} className="timeline-item">
                <div className="timeline-step">{t.step}</div>
                <div>
                  <div className="timeline-title">{t.title}</div>
                  <div className="muted">{t.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section fade-in" style={{ animationDelay: "0.24s" }}>
        <div className="container">
          <h2 className="section-title">Founders</h2>
          <div className="grid two founders-grid">
            {founders.map((f) => (
              <div key={f.name} className="card founder-card">
                <div className="founder-avatar" aria-hidden="true" />
                <div>
                  <div className="founder-name">{f.name}</div>
                  <div className="muted">{f.title}</div>
                  <p className="muted">{f.bio}</p>
                  <a className="button secondary" href={`mailto:${f.email}`}>Contact</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
