import { createBrowserClient } from "@supabase/ssr";
import { isSupabaseConfigured, supabaseEnv } from "./env";

export function createClient() {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase ainda não foi configurado.");
  }

  return createBrowserClient(supabaseEnv.url, supabaseEnv.publishableKey);
}

