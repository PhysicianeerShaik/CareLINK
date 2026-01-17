# Roles & RBAC

CareLink's access model is designed around **least privilege**.

## Roles
- **Student/Volunteer**
  - Create intakes
  - View continuity record content
  - **Cannot** access Identity Vault
  - Should be time-limited (recommended)

- **Advocate/Case Lead**
  - Everything Student can do
  - Access Identity Vault
  - Generate and revoke share tokens

- **Supervisor/Clinician**
  - Review continuity content
  - Provide oversight for Yellow/Orange/Red escalations
  - Default: no Identity Vault access (can be changed by policy)

- **Admin**
  - System management
  - Recommended: *separate admin vs content-access roles* (reduce temptation to browse)

## Custom claims (Firebase Auth)

Assign a `role` claim:
```json
{ "role": "student" }
```

Optional recommended claims:
```json
{ "role": "student", "accessUntil": 1767225600000 }
```

## Tightening rules for production
- Only allow Advocate/Admin to create share tokens
- Deny student access after `accessUntil`
- Add per-organization allowlists
- Require audit log creation for record reads (server-side)
