# CareLink Platform Architecture (MVP)

This MVP implements the **Privacy-First Continuity Architecture** described in the CareLink concept docs.

## Core design commitments
- **Minimum necessary data** (collect only what's needed for next steps)
- **Patient ownership & consent** (access, revocation, deletion)
- **Separation of identity from care content** (two-layer model)
- **Least privilege** (role-based, time-limited access)
- **Auditability** (every view/edit/share logged)
- **No default sharing** (esp. law enforcement or unrelated partners)
- **Offline-first** (best-effort IndexedDB persistence)

## Components
1) **Web app (this repo)**
   - Guided intake
   - Record viewer
   - Share-token summary page (patient-held)

2) **Firestore**
   - Collections:
     - `continuityRecords/{careLinkId}`
     - `identityVault/{careLinkId}`
     - `shareTokens/{token}`
     - `auditLogs/{autoId}`

3) **RBAC**
   - Custom claims: `{ role: 'student'|'advocate'|'supervisor'|'admin' }`
   - Identity Vault readable only by Advocate/Admin

## Data model: two-layer split
- **Continuity record**: pseudonymized narrative + tasks
- **Identity vault**: optional name/contact info, stored separately

## Patient-held summary
- Public read-only page by token
- Token is:
  - time-bound
  - revocable
  - not tied to name

## Known MVP simplifications
- Audit logs are client-written (production should use server-side writes)
- Share token creation not restricted to Advocate/Admin at rules level (recommended tightening)
- No server-side PDF export yet

