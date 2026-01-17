"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { AuthGate } from "@/src/components/AuthGate";
import { createIntake, newCareLinkId } from "@/src/lib/store";
import { canViewIdentity } from "@/src/lib/authz";
import type { ContinuityRecord, IdentityVault, RiskFlag } from "@/src/types/carelink";

function todayYYYYMMDD(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

const RISK_FLAGS: RiskFlag[] = [
  "none",
  "medical_decline",
  "safety_risk",
  "no_shelter",
  "suicidal_ideation_disclosed",
  "substance_use_disclosed",
];

const RISK_LABELS: Record<RiskFlag, string> = {
  none: "None",
  medical_decline: "Medical decline",
  safety_risk: "Safety risk",
  no_shelter: "No shelter",
  suicidal_ideation_disclosed: "Suicidal ideation disclosed",
  substance_use_disclosed: "Substance use disclosed",
};

export default function IntakePage() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const careLinkId = useMemo(() => newCareLinkId(), []);

  const [encounterType, setEncounterType] = useState<
    ContinuityRecord["encounter"]["encounterType"]
  >("street");
  const [encounterDate, setEncounterDate] = useState(todayYYYYMMDD());
  const [approxLoc, setApproxLoc] = useState("");

  // Identity (optional)
  const [preferredName, setPreferredName] = useState("");
  const [streetName, setStreetName] = useState("");
  const [phone, setPhone] = useState("");
  const [backupContact, setBackupContact] = useState("");

  // Context
  const [housingSituation, setHousingSituation] = useState("");
  const [phoneAccess, setPhoneAccess] = useState<"yes" | "sometimes" | "no">("no");
  const [idDocuments, setIdDocuments] = useState<
    "has" | "in_progress" | "none" | "unknown"
  >("unknown");

  const [concernsText, setConcernsText] = useState("");
  const [medsText, setMedsText] = useState("");
  const [goalsText, setGoalsText] = useState("");

  const [riskFlags, setRiskFlags] = useState<RiskFlag[]>(["none"]);

  const [tasksText, setTasksText] = useState("");
  const [nextStepsClientText, setNextStepsClientText] = useState("");
  const [lookupId, setLookupId] = useState("");

  function parseLines(s: string): string[] {
    return s
      .split("\n")
      .map((x) => x.trim())
      .filter(Boolean);
  }

  async function onCreate(uid: string, role: any) {
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      const allowIdentity = canViewIdentity(role);
      const record: Omit<ContinuityRecord, "createdAt" | "updatedAt"> = {
        careLinkId,
        encounter: {
          encounterType,
          encounterDate,
          approximateLocation: approxLoc.trim() || undefined,
        },
        clientContext: {
          housingSituation: housingSituation.trim() || undefined,
          phoneAccess,
          idDocuments,
          benefits: {},
        },
        concerns: parseLines(concernsText),
        meds: parseLines(medsText),
        goals: parseLines(goalsText),
        riskFlags,
        plan: {
          problemList: [],
          tasks: parseLines(tasksText).map((t) => ({
            id: uuidv4(),
            text: t,
            status: "open" as const,
          })),
          nextStepsForClient: parseLines(nextStepsClientText),
        },
      };

      const identity: Omit<IdentityVault, "createdAt" | "updatedAt"> | undefined =
        allowIdentity && (preferredName || streetName || phone || backupContact)
          ? {
              careLinkId,
              preferredName: preferredName.trim() || undefined,
              streetName: streetName.trim() || undefined,
              phone: phone.trim() || undefined,
              backupContact: backupContact.trim() || undefined,
            }
          : undefined;

      await withTimeout(createIntake({ record, identity }, { uid, role }), 12000);
      const nextUrl = `/record/${careLinkId}`;
      router.push(nextUrl);
      // Fallback navigation if the router does not transition.
      setTimeout(() => {
        if (window.location.pathname === "/intake") {
          window.location.assign(nextUrl);
        }
      }, 150);
    } catch (e: any) {
      setError(e?.message ?? "Failed to create intake.");
    } finally {
      setBusy(false);
    }
  }

  function goToRecord() {
    const id = lookupId.trim();
    if (!id) return;
    router.push(`/record/${encodeURIComponent(id)}`);
  }

  return (
    <AuthGate>
      {({ user, role }) => (
        <div className="container stack">
          <div className="card">
            <h1 style={{ marginTop: 0 }}>New Intake</h1>
            <p className="muted">
              Minimum necessary data. Identity is optional. No GPS location.
            </p>
            <div className="tag">CareLink ID: <b>{careLinkId}</b></div>
            {error ? <div className="alert error" role="alert">{error}</div> : null}
          </div>

          <div className="card">
            <h2 style={{ marginTop: 0 }}>Returning patient</h2>
            <p className="muted">Enter a CareLink ID to open an existing record.</p>
            <div className="return-row">
              <input
                className="return-input"
                value={lookupId}
                onChange={(e) => setLookupId(e.target.value)}
                placeholder="Enter CareLink ID"
                aria-label="CareLink ID"
              />
              <button type="button" className="button secondary" onClick={goToRecord}>
                Open record
              </button>
            </div>
          </div>

          <div className="card">
            <h2 style={{ marginTop: 0 }}>Encounter</h2>
            <div className="formGrid">
              <div>
                <label>Encounter type</label>
                <select value={encounterType} onChange={(e) => setEncounterType(e.target.value as any)}>
                  <option value="street">Street</option>
                  <option value="service_day">Service day</option>
                  <option value="post_discharge">Post-discharge</option>
                </select>
              </div>
              <div>
                <label>Date</label>
                <input value={encounterDate} onChange={(e) => setEncounterDate(e.target.value)} />
              </div>
            </div>
            <div style={{ marginTop: 12 }}>
              <label>Approximate location (optional, non-GPS)</label>
              <input value={approxLoc} onChange={(e) => setApproxLoc(e.target.value)} placeholder="e.g., Downtown library area" />
            </div>
          </div>

          {canViewIdentity(role) ? (
            <div className="card">
              <h2 style={{ marginTop: 0 }}>Identity (optional)</h2>
              <p className="muted">Stored separately in the Identity Vault (Advocate/Admin only).</p>
              <div className="formGrid">
                <div>
                  <label>Preferred name</label>
                  <input value={preferredName} onChange={(e) => setPreferredName(e.target.value)} />
                </div>
                <div>
                  <label>Street name / alias</label>
                  <input value={streetName} onChange={(e) => setStreetName(e.target.value)} />
                </div>
                <div>
                  <label>Phone</label>
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div>
                  <label>Backup contact</label>
                  <input value={backupContact} onChange={(e) => setBackupContact(e.target.value)} />
                </div>
              </div>
            </div>
          ) : (
            <div className="card">
              <h2 style={{ marginTop: 0 }}>Identity (optional)</h2>
              <p className="muted">
                Identity Vault fields are available to Advocate/Admin roles only. Ask an advocate to add identity details.
              </p>
            </div>
          )}

          <div className="card">
            <h2 style={{ marginTop: 0 }}>Context</h2>
            <div className="formGrid">
              <div>
                <label>Phone access</label>
                <select value={phoneAccess} onChange={(e) => setPhoneAccess(e.target.value as any)}>
                  <option value="yes">Yes</option>
                  <option value="sometimes">Sometimes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div>
                <label>ID / documents</label>
                <select value={idDocuments} onChange={(e) => setIdDocuments(e.target.value as any)}>
                  <option value="has">Has</option>
                  <option value="in_progress">In progress</option>
                  <option value="none">None</option>
                  <option value="unknown">Unknown</option>
                </select>
              </div>
            </div>
            <div style={{ marginTop: 12 }}>
              <label>Housing situation (optional)</label>
              <input value={housingSituation} onChange={(e) => setHousingSituation(e.target.value)} placeholder="e.g., unsheltered, couch surfing, shelter" />
            </div>
          </div>

          <div className="card">
            <h2 style={{ marginTop: 0 }}>Concerns, meds, goals</h2>
            <p className="muted">One per line.</p>
            <div className="formGrid">
              <div>
                <label>Concerns</label>
                <textarea value={concernsText} onChange={(e) => setConcernsText(e.target.value)} placeholder="Shortness of breath\nFoot wound\nNeeds primary care" />
              </div>
              <div>
                <label>Medications (best-effort)</label>
                <textarea value={medsText} onChange={(e) => setMedsText(e.target.value)} placeholder="Metformin (ran out)\nAlbuterol inhaler" />
              </div>
            </div>
            <div style={{ marginTop: 12 }}>
              <label>Goals</label>
              <textarea value={goalsText} onChange={(e) => setGoalsText(e.target.value)} placeholder="Get an ID\nConnect to a clinic\nGet shelter placement" />
            </div>
          </div>

          <div className="card">
            <h2 style={{ marginTop: 0 }}>Risk flags (non-diagnostic)</h2>
            <div className="grid2 risk-grid">
              {RISK_FLAGS.map((rf) => (
                <label key={rf} className="risk-item">
                  <input
                    type="checkbox"
                    checked={riskFlags.includes(rf)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setRiskFlags((prev) => {
                        const next = new Set(prev);
                        if (checked) next.add(rf);
                        else next.delete(rf);
                        // If any non-none selected, remove "none"
                        if (next.size > 1) next.delete("none");
                        if (next.size === 0) next.add("none");
                        return Array.from(next);
                      });
                    }}
                  />
                  <span className="muted">{RISK_LABELS[rf]}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="card">
            <h2 style={{ marginTop: 0 }}>Plan</h2>
            <p className="muted">CareLink documents follow-through, not just referrals.</p>
            <div className="formGrid">
              <div>
                <label>Tasks (one per line)</label>
                <textarea value={tasksText} onChange={(e) => setTasksText(e.target.value)} placeholder="Schedule clinic appointment\nHelp replace lost ID\nMedication pickup" />
              </div>
              <div>
                <label>Next steps for client (one per line)</label>
                <textarea value={nextStepsClientText} onChange={(e) => setNextStepsClientText(e.target.value)} placeholder="Return here on Tuesday\nBring continuity card to clinic" />
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <button type="button" className="button" disabled={busy} onClick={() => void onCreate(user.uid, role)}>
              {busy ? "Creating…" : "Create continuity record"}
            </button>
            <a className="button secondary" href="/">Cancel</a>
          </div>
        </div>
      )}
    </AuthGate>
  );
}

function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const id = setTimeout(() => reject(new Error("Request timed out. Check Firestore rules or network.")), ms);
    p.then((value) => {
      clearTimeout(id);
      resolve(value);
    }).catch((err) => {
      clearTimeout(id);
      reject(err);
    });
  });
}
