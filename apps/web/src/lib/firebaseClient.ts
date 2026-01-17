import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import {
  initializeFirestore,
  enableIndexedDbPersistence,
  Firestore,
} from "firebase/firestore";

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

const firebaseEnv = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export function hasFirebaseEnv(): boolean {
  return Boolean(
    firebaseEnv.apiKey &&
      firebaseEnv.authDomain &&
      firebaseEnv.projectId &&
      firebaseEnv.storageBucket &&
      firebaseEnv.messagingSenderId &&
      firebaseEnv.appId
  );
}

export function getClientApp(): FirebaseApp {
  if (app) return app;
  if (getApps().length) {
    app = getApps()[0]!;
    return app;
  }
  if (!hasFirebaseEnv()) {
    throw new Error("Missing Firebase env vars. Check .env.local in apps/web.");
  }
  app = initializeApp({
    apiKey: firebaseEnv.apiKey!,
    authDomain: firebaseEnv.authDomain!,
    projectId: firebaseEnv.projectId!,
    storageBucket: firebaseEnv.storageBucket!,
    messagingSenderId: firebaseEnv.messagingSenderId!,
    appId: firebaseEnv.appId!,
  });
  return app;
}

export function getClientFirestore(): Firestore {
  if (db) return db;
  const a = getClientApp();
  db = initializeFirestore(a, {
    // Force long polling to avoid hanging requests in restricted networks.
    experimentalForceLongPolling: true,
  });

  // Offline-first (best-effort). If it fails, continue (browser support varies).
  enableIndexedDbPersistence(db).catch(() => void 0);
  return db;
}

export function getClientAuth() {
  const a = getClientApp();
  return getAuth(a);
}

export async function signInGoogle() {
  const auth = getClientAuth();
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}

export async function signOutUser() {
  return signOut(getClientAuth());
}

export function subscribeAuth(cb: (u: User | null) => void) {
  return onAuthStateChanged(getClientAuth(), cb);
}
