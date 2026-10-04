// Umami (https://umami.is): anonymous visit and click statistics, no cookies.
// Paste the "Website ID" from Umami here (or set NEXT_PUBLIC_UMAMI_WEBSITE_ID).
// Empty means statistics are off and no script is loaded.
const WEBSITE_ID = "a4295d4a-7f79-4a81-8420-d32e1086a85c";

export const ANALYTICS = {
  websiteId: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || WEBSITE_ID,
  scriptUrl: "https://cloud.umami.is/script.js",
  // Only the real domain is counted, so previews and local tests stay out of the numbers.
  domains: "blogdapriscila.com.br",
} as const;
