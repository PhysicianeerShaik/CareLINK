# CareLink Street Consult — Platform (MVP Scaffold)

This repository is an **implementable MVP scaffold** for **CareLink Street Consult**: a **human-led, AI-supported continuity layer** for the **pre-clinical phase of care** and the **48-hour to 30-day post-discharge risk window**.

It is built directly from the CareLink concept docs you uploaded (privacy-by-design, minimum necessary data, consent, and role-limited access).

---

## What this MVP includes

### Core product flows
1. **Street / outreach intake (human-led)**
   - Guided intake to capture goals, concerns, barriers, and next steps
   - “Street name” supported; real identity optional
   - Consent script + granular consent toggles

2. **Living continuity record**
   - Pseudonymized continuity record indexed by a **random CareLink ID**
   - Problem list + tasks + follow-up plan

3. **Identity Vault (restricted)**
   - Separate store for identity/contact fields
   - Accessible only to **Advocate** role (and Admin)

4. **Consent + sharing**
   - Explicit share targets (clinic/hospital, housing partner, named org)
   - **Time-bound** and **revocable** share tokens
   - “Minimum share” mode (share only the summary, not full history)

5. **Patient-held summary**
   - Read-only public page via **token** (not name)
   - Token rotation / deactivation supported

6. **Post-discharge 7–30 day follow-up module**
   - Discharge snapshot + medication changes + appointments
   - Optional **condition-specific check-in templates** (CHF, COPD, diabetes, wound/cellulitis, kidney/dialysis)
   - Simple tiered escalation: **Green / Yellow / Orange / Red**

### Governance + safety primitives
- **RBAC** (Volunteer/Student, Advocate, Supervisor, Admin)
- **Audit logging** for view/edit/share events
- **Time-limited access** for student roles (recommended via custom claims)
- **Data retention hooks** (scheduled deletion after inactivity)

---

## Architecture (recommended)

- **Web app**: Next.js (App Router) + TypeScript (in `apps/web`)
- **Backend**: Firebase (Auth + Firestore) — easy to pilot with nonprofits
- **Security**: Firestore rules enforce:
  - continuity records accessible to permitted roles
  - identity vault only to advocate/admin
  - share tokens only return a minimal summary

> AI note: This repo **does not ship a model integration by default**. There is a stub endpoint where you can later add OpenAI/LLM note-structuring, but it’s intentionally off by default.

---

## Repo layout

```
carelink-platform/
  apps/
    web/                 # Next.js web app (MVP UI)
  firestore/
    firestore.rules      # Firestore security rules
    indexes.json         # Indexes to deploy
  docs/
    data-model.md        # Collections + field definitions
    roles-rbac.md        # Roles, permissions, access expiry
    consent-sharing.md   # Consent model + token sharing
    retention.md         # Retention + deletion policy
```

---

## Quick start (local)

1. Create a Firebase project
2. Enable **Authentication** (Email/Password or Google) and **Firestore**
3. Set web app env vars (copy `.env.example` to `.env.local`):

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

4. Deploy rules / indexes:
- Copy `firestore/firestore.rules` into Firebase Console rules
- Copy `firestore/indexes.json` into Firebase CLI deploy (or console)

5. Assign roles
- Use **custom claims** (`role: 'student'|'advocate'|'supervisor'|'admin'`)
- See `docs/roles-rbac.md` for the exact claim shape

---

## Pilot-ready defaults
- **Minimum necessary data**
- **No location tracking**
- **No law enforcement sharing by default**
- **Patient-held summary** is read-only and tokenized

---

## Next build-outs
- Offline-first mobile wrapper (React Native / Expo)
- SMS/WhatsApp check-ins (Twilio) with explicit consent
- Partner export: secure PDF summary (with consent)
- Analytics dashboard (non-identifying metrics)
