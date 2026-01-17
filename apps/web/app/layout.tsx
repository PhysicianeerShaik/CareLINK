import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CareLink Street Consult",
  description: "Privacy-first continuity records for pre-clinical and post-discharge care.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="shell">
          <header className="header">
            <div className="brand">
              <span className="brand-mark" aria-hidden="true" />
              CareLink Street Consult
            </div>
            <nav className="nav" aria-label="Primary">
              <a href="/intake">Intake</a>
              <a href="/docs/privacy">Privacy</a>
              <a href="/docs/faq">FAQ</a>
            </nav>
            <a className="button nav-cta" href="/intake">Start Consult</a>
          </header>
          <main className="main">{children}</main>
          <footer className="footer">
            <div className="footer-inner">
              <div className="footer-text">Privacy-first. Patient-controlled. Human-led.</div>
              <div className="footer-links">
                <a href="/docs/privacy">Privacy Architecture</a>
                <a href="/docs/ethics">Ethics</a>
                <a href="/docs/faq">FAQ</a>
                <a href="/contact">Contact CareLink</a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
