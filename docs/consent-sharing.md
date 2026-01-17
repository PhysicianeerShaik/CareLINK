# Consent & Sharing

## Principles
- Consent is obtained in plain language during the encounter.
- The individual can choose:
  - what is recorded
  - whether it can be shared
  - who it can be shared with
- Consent can be withdrawn; share links can be revoked.

## MVP implementation
- The MVP implements **patient-held sharing** via `shareTokens/{token}`:
  - a random token (UUID without dashes)
  - an expiry timestamp (`expiresAtTs`)
  - an optional `revokedAt`

## Recommended next steps
- Add a `consents/{careLinkId}` doc storing granular consents and valid-until
- Firestore rules should enforce that only records with valid consent can generate outward-facing exports
- Keep an allowlist of partner orgs for any non-patient sharing
