import { adminEnabled } from "@/config/features";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

function allowedEmails() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isAllowedAdmin(user: User) {
  const allowlist = allowedEmails();
  return Boolean(user.email && allowlist.includes(user.email.toLowerCase()));
}

export async function getAdminUser() {
  if (!adminEnabled) return null;
  const supabase = await createClient();
  if (!supabase) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user || !isAllowedAdmin(data.user)) return null;
  return data.user;
}

