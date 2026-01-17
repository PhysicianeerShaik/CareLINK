"use client";

import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { signInGoogle, signOutUser, subscribeAuth } from "@/src/lib/firebaseClient";
import { getUserRole } from "@/src/lib/authz";
import type { Role } from "@/src/types/carelink";

export function AuthGate({
  children,
}: {
  children: (ctx: { user: User; role: Role }) => React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = subscribeAuth(async (u) => {
      setUser(u);
      setRole(null);
      if (u) {
        const r = await getUserRole(u);
        setRole(r);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) return <div className="card">Loading…</div>;

  if (!user) {
    return (
      <div className="card">
        <h2 style={{ marginTop: 0 }}>Sign in</h2>
        <p className="muted">
          CareLink is role-limited. Sign in to start an intake or view records.
        </p>
        <button className="button" onClick={() => void signInGoogle()}>
          Sign in with Google
        </button>
      </div>
    );
  }

  if (!role) return <div className="card">Loading role…</div>;

  return (
    <div className="stack">
      <div className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontWeight: 600 }}>{user.displayName ?? user.email}</div>
          <div className="muted">Role: {role}</div>
        </div>
        <button className="button secondary" onClick={() => void signOutUser()}>
          Sign out
        </button>
      </div>
      {children({ user, role })}
    </div>
  );
}
