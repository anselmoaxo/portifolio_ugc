export function assetPath(path: string): string {
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('//') ||
    path.startsWith('mailto:') ||
    path.startsWith('tel:')
  ) {
    return path;
  }

  return path.startsWith('/') ? path : '/' + path;
}

export function resolveMediaPath(path: string): string {
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('//')
  ) {
    return path;
  }
  return assetPath(path);
}
