"use client";

import { useCallback, useState } from "react";

const FLAGS: Record<string, string> = {
  pt: "🇧🇷",
  en: "🇺🇸",
  es: "🇪🇸",
};

function translateUrl(lang: string) {
  if (typeof window === "undefined") return "#";
  const pageUrl = encodeURIComponent(window.location.href);
  return `https://translate.google.com/translate?hl=${lang}&sl=pt&tl=${lang}&u=${pageUrl}`;
}

export function LanguageSwitcher() {
  const [language, setLanguage] = useState("pt");

  const applyLanguage = useCallback((lang: string) => {
    setLanguage(lang);

    if (lang === "pt") return;

    window.open(translateUrl(lang), "_blank", "noopener,noreferrer");
  }, []);

  return (
    <div className="language-switcher">
      <span className="language-flag" aria-hidden="true">{FLAGS[language]}</span>
      <label>
        <span className="sr-only">Selecionar idioma</span>
        <select
          value={language}
          onChange={(e) => applyLanguage(e.target.value)}
          aria-label="Selecionar idioma"
        >
          <option value="pt">🇧🇷 PT-BR</option>
          <option value="en">🇺🇸 English</option>
          <option value="es">🇪🇸 Español</option>
        </select>
      </label>
    </div>
  );
}
