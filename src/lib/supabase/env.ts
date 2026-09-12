export const supabaseEnv = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "",
  publishableKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ?? "",
};

export const isSupabaseConfigured = Boolean(
  supabaseEnv.url && supabaseEnv.publishableKey,
);

