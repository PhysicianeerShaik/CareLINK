import { getIdTokenResult, User } from "firebase/auth";
import type { Role } from "@/src/types/carelink";

export async function getUserRole(user: User): Promise<Role> {
  const token = await getIdTokenResult(user, true);
  const role = token.claims["role"];
  if (role === "student" || role === "advocate" || role === "supervisor" || role === "admin") {
    return role;
  }
  const devRole = process.env.NEXT_PUBLIC_DEV_ROLE;
  if (devRole === "student" || devRole === "advocate" || devRole === "supervisor" || devRole === "admin") {
    return devRole;
  }
  // Default to student if not assigned; in production you'd likely block instead.
  return "student";
}

export function canViewIdentity(role: Role): boolean {
  return role === "advocate" || role === "admin";
}

export function canEditRecord(role: Role): boolean {
  return role === "student" || role === "advocate" || role === "supervisor" || role === "admin";
}

export function canAdmin(role: Role): boolean {
  return role === "admin";
}
