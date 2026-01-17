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
  getFirestore,
  enableIndexedDbPersistence,
  Firestore,
} from "firebase/firestore";

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

function mustGetEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var ${name}`);
  return v;
}

export function getClientApp(): FirebaseApp {
  if (app) return app;
  if (getApps().length) {
    app = getApps()[0]!;
    return app;
  }
  app = initializeApp({
    apiKey: mustGetEnv("NEXT_PUBLIC_FIREBASE_API_KEY"),
    authDomain: mustGetEnv("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"),
    projectId: mustGetEnv("NEXT_PUBLIC_FIREBASE_PROJECT_ID"),
    storageBucket: mustGetEnv("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"),
    messagingSenderId: mustGetEnv("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"),
    appId: mustGetEnv("NEXT_PUBLIC_FIREBASE_APP_ID"),
  });
  return app;
}

export function getClientFirestore(): Firestore {
  if (db) return db;
  const a = getClientApp();
  db = getFirestore(a);

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
