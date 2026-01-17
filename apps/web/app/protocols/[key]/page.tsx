"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";

type Tier = "green" | "yellow" | "orange" | "red";

const PROTOCOLS: Record<string, { title: string; questions: string[]; redFlags: string[] }> = {
  chf: {
    title: "CHF Check-In",
    questions: [
      "Any shortness of breath now or worse than baseline?",
      "Any swelling in legs/abdomen?",
      "Any chest pain?",
      "Were you able to get and take your meds?",
      "Any trouble getting to follow-up appointments?",
    ],
    redFlags: [
      "Severe shortness of breath at rest",
      "Chest pain",
      "Fainting",
    ],
  },
  copd: {
    title: "COPD/Asthma Check-In",
    questions: [
      "Any worsening shortness of breath or wheezing?",
      "More cough or sputum? Fever?",
      "Able to access inhalers/nebulizer?",
      "Any triggers or smoke exposure?",
    ],
    redFlags: [
      "Severe breathing difficulty",
      "Blue lips/face",
      "Unable to speak full sentences",
    ],
  },
  diabetes: {
    title: "Diabetes Complications Check-In",
    questions: [
      "Any dizziness, confusion, or fainting?",
      "Any nausea/vomiting or abdominal pain?",
      "Any wounds/ulcers getting worse?",
      "Able to access insulin/meds and food?",
    ],
    redFlags: [
      "Confusion/unresponsiveness",
      "Repeated vomiting / dehydration",
      "Signs of severe infection",
    ],
  },
};

export default function ProtocolDetailPage() {
  const params = useParams<{ key?: string }>();
  const key = Array.isArray(params?.key) ? params.key[0] : params?.key ?? "";
  const proto = PROTOCOLS[key];

  if (!proto) return <div className="card">Unknown protocol.</div>;

  return <ProtocolUI title={proto.title} questions={proto.questions} redFlags={proto.redFlags} />;
}

function ProtocolUI({ title, questions, redFlags }: { title: string; questions: string[]; redFlags: string[] }) {
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [notes, setNotes] = useState("");

  const tier: Tier = useMemo(() => {
    // Simple rules:
    // - If any red flag (q marked yes) -> red
    // - If 3+ questions yes -> orange
    // - If 1-2 yes -> yellow
    // - Else green
    const yes = Object.values(answers).filter(Boolean).length;
    if (yes >= 3) return "orange";
    if (yes >= 1) return "yellow";
    return "green";
  }, [answers]);

  const tierLabel = {
    green: "Green: stable — continue plan",
    yellow: "Yellow: early warning — outreach & coordination",
    orange: "Orange: urgent — same-day action (clinic call / RN escalation)",
    red: "Red: emergency signs — ED/911 guidance",
  }[tier];

  return (
    <div className="stack">
      <div className="card">
        <h1 style={{ marginTop: 0 }}>{title}</h1>
        <p className="muted">
          This is a **coordination script** (not diagnostic). Use partner clinical oversight for Yellow/Orange/Red.
        </p>
        <div className="tag">{tierLabel}</div>
      </div>

      <div className="card">
        <h2 style={{ marginTop: 0 }}>Questions</h2>
        <div className="stack">
          {questions.map((q, idx) => (
            <label key={idx} style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <input
                type="checkbox"
                checked={Boolean(answers[idx])}
                onChange={(e) => setAnswers((p) => ({ ...p, [idx]: e.target.checked }))}
              />
              <span className="muted">{q}</span>
            </label>
          ))}
        </div>

        <hr />
        <h2>Notes</h2>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Barriers, meds access, transportation, follow-up details…" />
      </div>

      <div className="card">
        <h2 style={{ marginTop: 0 }}>Emergency red flags (always escalate)</h2>
        <ul className="muted">
          {redFlags.map((rf, i) => (
            <li key={i}>{rf}</li>
          ))}
        </ul>
      </div>

      <a className="button secondary" href="/protocols">Back</a>
    </div>
  );
}
