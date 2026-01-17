type Founder = {
  name: string;
  role: string;
  bio: string;
};

const founders: Founder[] = [
  {
    name: "Avery Quinn",
    role: "Community Outreach",
    bio: "Street outreach lead focused on trauma-informed intake and continuity across shelters and encampments.",
  },
  {
    name: "Dr. Samir Patel",
    role: "Care Transitions",
    bio: "Discharge coordinator building safer handoffs during the 48-hour to 30-day risk window.",
  },
  {
    name: "Jordan Reyes",
    role: "Privacy & Systems",
    bio: "Product architect focused on minimum necessary data and consent-driven sharing.",
  },
];

export default function HomePage() {
  return (
    <div className="landing-soft">
      <section className="hero-soft">
        <div className="container hero-soft-inner fade-in">
          <div className="hero-copy">
            <h1 className="hero-title-soft">CareLink Street Consult</h1>
            <p className="hero-sub-soft">
              A human-led continuity tool for people who get lost between outreach, hospitals, and follow-up.
            </p>
            <div className="cta-row" aria-label="Primary actions">
              <a className="button button-soft" href="/intake">Start a Consult</a>
              <a className="link soft-link" href="/docs/privacy">How CareLink protects privacy</a>
            </div>
            <div className="trust-row-soft" role="list" aria-label="Trust signals">
              {["Human-led", "Consent-driven", "No surveillance"].map((item) => (
                <span key={item} className="pill" role="listitem">{item}</span>
              ))}
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="orb orb-one" />
            <div className="orb orb-two" />
            <div className="orb orb-three" />
          </div>
        </div>
      </section>

      <section className="section-soft fade-in" style={{ animationDelay: "0.1s" }}>
        <div className="container">
          <div className="card soft-card">
            <h2 style={{ marginTop: 0 }}>A gentle bridge between systems</h2>
            <p className="muted">
              CareLink keeps a simple continuity record so outreach teams and partners can stay aligned
              without collecting more than necessary. It complements EHR/HMIS workflows but does not replace them.
            </p>
            <div className="steps" aria-label="CareLink steps">
              <div className="step">Meet</div>
              <div className="step">Capture</div>
              <div className="step">Follow through</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-soft fade-in" style={{ animationDelay: "0.2s" }}>
        <div className="container">
          <h2 className="section-title-soft">Built by</h2>
          <div className="founders-soft">
            {founders.map((f) => (
              <div key={f.name} className="card soft-card founder-soft">
                <div className="avatar-soft" aria-hidden="true" />
                <div>
                  <div className="founder-name">{f.name}</div>
                  <div className="muted">{f.role}</div>
                  <p className="muted">{f.bio}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="muted founders-disclaimer">
            CareLink is in development and intended for pilot testing with nonprofit partners.
          </p>
        </div>
      </section>
    </div>
  );
}
