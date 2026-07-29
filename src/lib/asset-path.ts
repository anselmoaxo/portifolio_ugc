export const BASE_PATH = process.env.NODE_ENV === "production" ? "/portifolio_ugc" : "";

export function assetPath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${normalized}`;
}

export function resolveMediaPath(path: string): string {
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("//")
  ) {
    return path;
  }
  return assetPath(path);
}
