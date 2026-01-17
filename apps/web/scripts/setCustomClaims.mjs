import { readFile } from "node:fs/promises";
import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT;
const uid = process.env.FIREBASE_UID;
const role = process.env.FIREBASE_ROLE || "advocate";

if (!serviceAccountPath || !uid) {
  console.error("Missing FIREBASE_SERVICE_ACCOUNT or FIREBASE_UID env vars.");
  process.exit(1);
}

if (!["student", "advocate", "supervisor", "admin"].includes(role)) {
  console.error("FIREBASE_ROLE must be one of: student, advocate, supervisor, admin.");
  process.exit(1);
}

const raw = await readFile(serviceAccountPath, "utf8");
const serviceAccount = JSON.parse(raw);

initializeApp({
  credential: cert(serviceAccount),
});

await getAuth().setCustomUserClaims(uid, { role });

console.log(`Custom claim set for ${uid}: role=${role}`);
