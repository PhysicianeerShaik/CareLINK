import { v4 as uuidv4 } from "uuid";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  orderBy,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { getClientFirestore } from "@/src/lib/firebaseClient";
import type { AuditEvent, ContinuityRecord, IdentityVault, Role, ShareToken } from "@/src/types/carelink";

const COL_CONTINUITY = "continuityRecords";
const COL_IDENTITY = "identityVault";
const COL_SHARE = "shareTokens";
const COL_AUDIT = "auditLogs";

export function newCareLinkId(): string {
  // Short, human-friendly ID; still random enough for internal referencing.
  // Example: CL-2F9A8D1C
  const hex = uuidv4().replace(/-/g, "").slice(0, 8).toUpperCase();
  return `CL-${hex}`;
}

export async function createIntake(
  args: {
    record: Omit<ContinuityRecord, "createdAt" | "updatedAt">;
    identity?: Omit<IdentityVault, "createdAt" | "updatedAt">;
  },
  actor: { uid: string; role: Role }
): Promise<string> {
  const db = getClientFirestore();
  const now = Date.now();

  const rec: ContinuityRecord = {
    ...args.record,
    createdAt: now,
    updatedAt: now,
  };

  await setDoc(doc(db, COL_CONTINUITY, rec.careLinkId), rec);

  if (args.identity) {
    const idv: IdentityVault = {
      ...args.identity,
      careLinkId: rec.careLinkId,
      createdAt: now,
      updatedAt: now,
    };
    await setDoc(doc(db, COL_IDENTITY, rec.careLinkId), idv);
  }

  await writeAudit(
    {
      at: now,
      actorUid: actor.uid,
      actorRole: actor.role,
      action: "create_record",
      careLinkId: rec.careLinkId,
    },
    actor
  );

  return rec.careLinkId;
}

export async function getContinuityRecord(careLinkId: string) {
  const db = getClientFirestore();
  const snap = await getDoc(doc(db, COL_CONTINUITY, careLinkId));
  return snap.exists() ? (snap.data() as ContinuityRecord) : null;
}

export async function getIdentityVault(careLinkId: string) {
  const db = getClientFirestore();
  const snap = await getDoc(doc(db, COL_IDENTITY, careLinkId));
  return snap.exists() ? (snap.data() as IdentityVault) : null;
}

export async function updateContinuityRecord(
  careLinkId: string,
  patch: Partial<ContinuityRecord>,
  actor: { uid: string; role: Role }
) {
  const db = getClientFirestore();
  await updateDoc(doc(db, COL_CONTINUITY, careLinkId), {
    ...patch,
    updatedAt: Date.now(),
  } as any);

  await writeAudit(
    {
      at: Date.now(),
      actorUid: actor.uid,
      actorRole: actor.role,
      action: "update_record",
      careLinkId,
    },
    actor
  );
}

export async function listRecentRecords(n = 25): Promise<ContinuityRecord[]> {
  const db = getClientFirestore();
  const q = query(collection(db, COL_CONTINUITY), orderBy("updatedAt", "desc"), limit(n));
  const snaps = await getDocs(q);
  return snaps.docs.map((d) => d.data() as ContinuityRecord);
}

export async function createShareToken(
  args: {
    careLinkId: string;
    purpose: ShareToken["purpose"];
    expiresAt: number;
  },
  actor: { uid: string; role: Role }
): Promise<string> {
  const db = getClientFirestore();
  const token = uuidv4().replace(/-/g, "");
  const now = Date.now();
  const st: any = {
    token,
    careLinkId: args.careLinkId,
    purpose: args.purpose,
    createdAt: now,
    expiresAt: args.expiresAt,
    expiresAtTs: Timestamp.fromMillis(args.expiresAt),
  };

  await setDoc(doc(db, COL_SHARE, token), {
    ...st,
    expiresAtTs: Timestamp.fromMillis(args.expiresAt),
  } as any);

  await writeAudit(
    {
      at: now,
      actorUid: actor.uid,
      actorRole: actor.role,
      action: "create_share_token",
      careLinkId: args.careLinkId,
      meta: { purpose: args.purpose, expiresAt: args.expiresAt },
    },
    actor
  );

  return token;
}

export async function revokeShareToken(
  token: string,
  actor: { uid: string; role: Role }
) {
  const db = getClientFirestore();
  const now = Date.now();
  await updateDoc(doc(db, COL_SHARE, token), { revokedAt: now } as any);

  await writeAudit(
    {
      at: now,
      actorUid: actor.uid,
      actorRole: actor.role,
      action: "revoke_share_token",
      meta: { token },
    },
    actor
  );
}

export async function getShareToken(token: string): Promise<ShareToken | null> {
  const db = getClientFirestore();
  const snap = await getDoc(doc(db, COL_SHARE, token));
  if (!snap.exists()) return null;
  const data = snap.data() as any;
  const expiresAtTs = data.expiresAtTs?.toMillis ? data.expiresAtTs.toMillis() : null;
  return {
    ...(data as ShareToken),
    expiresAt: typeof data.expiresAt === "number" ? data.expiresAt : (expiresAtTs ?? Date.now()),
  };
}

export async function writeAudit(
  e: Omit<AuditEvent, "id">,
  _actor: { uid: string; role: Role }
) {
  const db = getClientFirestore();
  await addDoc(collection(db, COL_AUDIT), {
    ...e,
    at: e.at ?? Date.now(),
  });
}
