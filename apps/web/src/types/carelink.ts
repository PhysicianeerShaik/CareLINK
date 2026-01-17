export type Role = "student" | "advocate" | "supervisor" | "admin";

export type ConsentTarget =
  | "followup_only"
  | "share_clinic_hospital"
  | "share_housing_case_mgmt"
  | "share_named_org";

export type RiskFlag =
  | "none"
  | "medical_decline"
  | "safety_risk"
  | "no_shelter"
  | "suicidal_ideation_disclosed"
  | "substance_use_disclosed";

export interface ConsentState {
  // Minimum share: share summary only, not full record.
  minimumShare: boolean;
  // Time bound consent (epoch ms)
  validUntil: number;
  targets: Record<ConsentTarget, boolean>;
  notes?: string;
}

export interface IdentityVault {
  careLinkId: string; // joins to continuity record
  preferredName?: string;
  streetName?: string;
  phone?: string;
  backupContact?: string;
  partialDob?: string; // e.g., "198?-05" or "??-??"
  photoUrl?: string;
  emergencyContact?: string;
  createdAt: number;
  updatedAt: number;
}

export interface ContinuityRecord {
  careLinkId: string;
  createdAt: number;
  updatedAt: number;

  encounter: {
    encounterType: "street" | "service_day" | "post_discharge";
    encounterDate: string; // YYYY-MM-DD
    approximateLocation?: string; // e.g., "Downtown library area" (not GPS)
  };

  clientContext: {
    housingSituation?: string;
    phoneAccess?: "yes" | "sometimes" | "no";
    idDocuments?: "has" | "in_progress" | "none" | "unknown";
    benefits?: {
      snap?: "yes" | "no" | "unknown";
      medicaid?: "yes" | "no" | "unknown";
      ssdiSsi?: "yes" | "no" | "unknown";
    };
  };

  concerns: string[]; // human-entered bullets
  meds: string[]; // best-effort
  goals: string[];

  riskFlags: RiskFlag[];

  plan: {
    problemList: string[];
    tasks: Array<{ id: string; text: string; status: "open" | "done" }>;
    nextStepsForClient: string[];
    escalationNote?: string;
  };

  postDischarge?: {
    dischargeDate?: string;
    reasonForAdmission?: string;
    medChanges?: string[];
    followupAppointments?: Array<{ specialty?: string; when?: string; where?: string }>;
    redFlagsEducation?: string[];
  };

  aiAssists?: {
    generatedNote?: string;
    generatedProblemList?: string[];
    generatedTasks?: string[];
    generatedClientSummary?: string;
    model?: string;
    generatedAt?: number;
  };
}

export interface ShareToken {
  token: string;
  careLinkId: string;
  createdAt: number;
  expiresAt: number;
  revokedAt?: number;
  purpose: "patient_summary" | "clinic_summary" | "housing_summary";
}

export interface AuditEvent {
  id: string;
  at: number;
  actorUid: string;
  actorRole: Role;
  action:
    | "create_record"
    | "update_record"
    | "view_record"
    | "create_share_token"
    | "revoke_share_token"
    | "view_shared_summary";
  careLinkId?: string;
  meta?: Record<string, string | number | boolean | null>;
}
