type Founder = {
  name: string;
  role: string;
  bio: string;
  image: string;
};

const founders: Founder[] = [
  {
    name: "Joseph Marinick",
    role: "Founder & Community Health Architect",
    bio: "Leads CareLink’s vision and community-first approach, grounded in direct outreach experience and a focus on preserving dignity, trust, and continuity for people navigating care outside formal systems.",
    image: "/founders/joseph.png",
  },
  {
    name: "Sabour Shaik",
    role: "Founding Engineer & Clinical Systems Lead",
    bio: "Designs CareLink’s privacy-first architecture and continuity workflows at the intersection of medicine and engineering, ensuring the platform supports real-world care without replacing human judgment.",
    image: "/founders/sabour.png",
  },
  {
    name: "Musa Salman",
    role: "Founding Partner, Strategy & Partnerships",
    bio: "Guides CareLink’s partnerships and implementation strategy, helping translate on-the-ground needs into sustainable pilots with nonprofits, students, and care organizations.",
    image: "/founders/musa.png",
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
              A warm, human-led way to keep care connected for people who get lost between outreach, hospitals, and follow‑up.
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
            <h2 style={{ marginTop: 0 }}>A gentle bridge between people</h2>
            <p className="muted">
              CareLink helps teams remember what matters, protect dignity, and follow through across handoffs.
              AI assists with organizing notes and next steps; humans lead the care. No surveillance.
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
                <img className="avatar-soft" src={f.image} alt={`${f.name} headshot`} />
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
