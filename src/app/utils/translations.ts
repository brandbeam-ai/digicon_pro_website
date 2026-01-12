// Translation utility functions

export function getTranslation(
  translations: { [key: string]: string } | null,
  key: string,
  fallback: string
): string {
  if (!translations) {
    return fallback;
  }
  return translations[key] || fallback;
}

