// Integrations are opt-in. Existing credentials alone must not activate them.
export const cmsEnabled = process.env.SITE_CMS_ENABLED === "true";
export const adminEnabled = cmsEnabled && process.env.SITE_ADMIN_ENABLED === "true";
