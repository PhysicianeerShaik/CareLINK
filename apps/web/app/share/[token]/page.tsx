"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getShareToken, writeAudit } from "@/src/lib/store";
import type { ShareToken } from "@/src/types/carelink";

export default function SharePage() {
  const params = useParams<{ token: string }>();
  const token = params.token;

  const [status, setStatus] = useState<"loading" | "error" | "ok" | "expired">("loading");
  const [summary, setSummary] = useState<ShareToken["summary"] | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const st = await getShareToken(token);
      if (!st || st.revokedAt) {
        if (!mounted) return;
        setStatus("error");
        setMsg("This link is invalid or has been revoked.");
        return;
      }
      if (Date.now() > st.expiresAt) {
        if (!mounted) return;
        setStatus("expired");
        setMsg("This link has expired.");
        return;
      }
      setSummary(st.summary ?? null);
      setStatus("ok");

      // Public view audit (anonymous actor); in production capture IP hash / device metadata via server.
      await writeAudit(
        {
          at: Date.now(),
          actorUid: "anonymous",
          actorRole: "student",
          action: "view_shared_summary",
          careLinkId: st.careLinkId,
          meta: { purpose: st.purpose, token: token.slice(0, 8) },
        },
        { uid: "anonymous", role: "student" }
      );
    })().catch((e) => {
      if (!mounted) return;
      setStatus("error");
      setMsg(String(e));
    });
    return () => {
      mounted = false;
    };
  }, [token]);

  if (status === "loading") return <div className="card">Loading…</div>;
  if (status !== "ok") return <div className="card">{msg}</div>;
  if (!summary) return <div className="card">Not found.</div>;

  return (
    <div className="stack">
      <div className="card">
        <h1 style={{ marginTop: 0 }}>CareLink Summary</h1>
        <div className="muted">ID: {token.slice(0, 8).toUpperCase()}</div>
        <div className="muted">
          Encounter: {summary.encounterType ?? "—"} · {summary.encounterDate ?? "—"}
        </div>
        {summary.approximateLocation ? (
          <div className="muted">Approx. location: {summary.approximateLocation}</div>
        ) : null}
        <p className="muted small" style={{ marginBottom: 0 }}>
          This page is read-only and tokenized. It does not display identity details.
        </p>
      </div>

      <div className="card">
        <h2 style={{ marginTop: 0 }}>Goals</h2>
        <ul className="muted">
          {(summary.goals?.length ? summary.goals : ["—"]).map((g, i) => (
            <li key={i}>{g}</li>
          ))}
        </ul>

        <h2>Next steps</h2>
        <ul className="muted">
          {(summary.nextStepsForClient?.length ? summary.nextStepsForClient : ["—"]).map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>

        <h2>Medications (best-effort)</h2>
        <ul className="muted">
          {(summary.meds?.length ? summary.meds : ["—"]).map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h2 style={{ marginTop: 0 }}>Important</h2>
        <ul className="muted">
          <li>If this is an emergency, call 911.</li>
          <li>Bring this summary to the next clinic or hospital visit to avoid repeating the full story.</li>
          <li>Ask the CareLink team to update or rotate the link if it’s lost.</li>
        </ul>
      </div>
    </div>
  );
}
