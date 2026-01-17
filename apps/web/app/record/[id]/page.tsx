"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import QRCode from "qrcode";
import { AuthGate } from "@/src/components/AuthGate";
import { canViewIdentity } from "@/src/lib/authz";
import { createShareToken, getContinuityRecord, getIdentityVault, updateContinuityRecord } from "@/src/lib/store";
import type { ContinuityRecord, IdentityVault, Role } from "@/src/types/carelink";

function formatDate(ms: number): string {
  const d = new Date(ms);
  return d.toLocaleString();
}

export default function RecordPage() {
  const params = useParams<{ id: string }>();
  const careLinkId = params.id;

  return (
    <AuthGate>
      {({ user, role }) => (
        <RecordInner careLinkId={careLinkId} uid={user.uid} role={role} />
      )}
    </AuthGate>
  );
}

function RecordInner({ careLinkId, uid, role }: { careLinkId: string; uid: string; role: Role }) {
  const [rec, setRec] = useState<ContinuityRecord | null>(null);
  const [idv, setIdv] = useState<IdentityVault | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setErr(null);
      const r = await getContinuityRecord(careLinkId);
      if (!mounted) return;
      setRec(r);
      if (r && canViewIdentity(role)) {
        const iv = await getIdentityVault(careLinkId);
        if (!mounted) return;
        setIdv(iv);
      } else {
        setIdv(null);
      }
    })().catch((e) => setErr(String(e)));
    return () => {
      mounted = false;
    };
  }, [careLinkId, role]);

  const tasks = rec?.plan.tasks ?? [];

  async function toggleTask(taskId: string) {
    if (!rec) return;
    const next = rec.plan.tasks.map((t) =>
      t.id === taskId ? { ...t, status: t.status === "done" ? "open" : "done" } : t
    );
    const patch: Partial<ContinuityRecord> = {
      plan: { ...rec.plan, tasks: next },
    };
    setRec({ ...rec, plan: { ...rec.plan, tasks: next } });
    await updateContinuityRecord(careLinkId, patch, { uid, role });
  }

  async function makePatientSummaryShare() {
    setBusy(true);
    try {
      const expiresAt = Date.now() + 1000 * 60 * 60 * 24 * 30; // 30 days
      const token = await createShareToken(
        { careLinkId, purpose: "patient_summary", expiresAt },
        { uid, role }
      );
      const url = `${window.location.origin}/share/${token}`;
      setShareUrl(url);
      const png = await QRCode.toDataURL(url, { margin: 1, width: 240 });
      setQrDataUrl(png);
    } finally {
      setBusy(false);
    }
  }

  if (err) return <div className="card">Error: {err}</div>;
  if (!rec) return <div className="card">Record not found or loading…</div>;

  return (
    <div className="container stack">
      <div className="card">
        <h1 style={{ marginTop: 0 }}>{rec.careLinkId}</h1>
        <div className="muted">
          Updated: {formatDate(rec.updatedAt)} · Encounter: {rec.encounter.encounterType} on {rec.encounter.encounterDate}
        </div>
        {rec.encounter.approximateLocation ? (
          <div className="muted">Approx. location: {rec.encounter.approximateLocation}</div>
        ) : null}
      </div>

      {idv && (
        <div className="card">
          <h2 style={{ marginTop: 0 }}>Identity Vault (restricted)</h2>
          <div className="grid2">
            <div><span className="muted">Preferred name:</span> {idv.preferredName ?? "—"}</div>
            <div><span className="muted">Street name:</span> {idv.streetName ?? "—"}</div>
            <div><span className="muted">Phone:</span> {idv.phone ?? "—"}</div>
            <div><span className="muted">Backup contact:</span> {idv.backupContact ?? "—"}</div>
          </div>
          <p className="muted small" style={{ marginBottom: 0 }}>
            Identity is stored separately from care content by design.
          </p>
        </div>
      )}

      <div className="card">
        <h2 style={{ marginTop: 0 }}>Concerns</h2>
        <ul className="muted">
          {(rec.concerns.length ? rec.concerns : ["—"]).map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
        <h2>Meds</h2>
        <ul className="muted">
          {(rec.meds.length ? rec.meds : ["—"]).map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
        <h2>Goals</h2>
        <ul className="muted">
          {(rec.goals.length ? rec.goals : ["—"]).map((g, i) => (
            <li key={i}>{g}</li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h2 style={{ marginTop: 0 }}>Tasks</h2>
        <p className="muted">Tap to mark done. (This should write an audit trail in production.)</p>
        <div className="stack">
          {tasks.length === 0 ? <div className="muted">—</div> : null}
          {tasks.map((t) => (
            <button
              key={t.id}
              className="button secondary"
              onClick={() => void toggleTask(t.id)}
              style={{ justifyContent: "flex-start" }}
            >
              <span style={{ width: 18, display: "inline-block" }}>
                {t.status === "done" ? "✅" : "⬜"}
              </span>
              {t.text}
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 style={{ marginTop: 0 }}>Patient-held summary link</h2>
        <p className="muted">
          Generates a time-bound, revocable token. This is the safest way to preserve continuity without building a surveillance database.
        </p>
        <button className="button" disabled={busy} onClick={() => void makePatientSummaryShare()}>
          {busy ? "Generating…" : "Create 30-day summary link"}
        </button>

        {shareUrl && (
          <div style={{ marginTop: 12 }}>
            <div className="tag">Share URL: <a href={shareUrl} target="_blank" rel="noreferrer">{shareUrl}</a></div>
            {qrDataUrl ? (
              <div style={{ marginTop: 12 }}>
                <img src={qrDataUrl} alt="QR" style={{ borderRadius: 12, border: "1px solid var(--line)" }} />
                <div className="muted small">Print or write the short code onto a wallet card.</div>
              </div>
            ) : null}
          </div>
        )}
      </div>

      <a className="button secondary" href="/">Back</a>
    </div>
  );
}
