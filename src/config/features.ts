// Static site: the runtime admin panel (/admin, Supabase) stays disabled because
// GitHub Pages cannot run a server. Content can still come from Sanity at build
// time; editing happens in the hosted Sanity Studio (see docs/PLANO-AREA-ADMIN.md).
export function isCmsEnabled(env: Record<string, string | undefined>) {
  return env.SITE_CMS_ENABLED?.trim().toLowerCase() === "true";
}

export const cmsEnabled = isCmsEnabled(process.env);
export const adminEnabled = false;
