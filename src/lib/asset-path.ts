export const BASE_PATH = process.env.NODE_ENV === "production" ? "/portifolio_ugc" : "";

export function assetPath(path: string) {
  if (path.startsWith("http") || path.startsWith("data:")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${normalized}`;
}
