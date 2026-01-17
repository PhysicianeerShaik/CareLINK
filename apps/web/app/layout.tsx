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
            <div className="brand">CareLink Street Consult</div>
            <nav className="nav">
              <a href="/intake">New Intake</a>
              <a href="/protocols">Protocols</a>
              <a href="/admin">Admin</a>
            </nav>
          </header>
          <main className="main">{children}</main>
          <footer className="footer">
            <div className="footer-inner">
              <div className="footer-text">Privacy-first. Consent-driven. Human-led.</div>
              <div className="footer-links">
                <a href="/docs/privacy">Privacy Architecture</a>
                <a href="/docs/ethics">Ethics</a>
                <a href="/docs/faq">FAQ</a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
