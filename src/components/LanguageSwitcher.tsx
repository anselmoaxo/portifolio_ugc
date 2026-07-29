"use client";

import { Languages } from "lucide-react";
import { useState } from "react";

export function LanguageSwitcher() {
  const [language, setLanguage] = useState("pt");

  function changeLanguage(nextLanguage: string) {
    setLanguage(nextLanguage);
    if (nextLanguage === "pt") return;

    const target = new URL("https://translate.google.com/translate");
    target.searchParams.set("sl", "pt");
    target.searchParams.set("tl", nextLanguage);
    target.searchParams.set("u", window.location.href);
    window.open(target.toString(), "_blank", "noopener,noreferrer");
  }

  return (
    <label className="language-switcher">
      <Languages size={15} aria-hidden="true" />
      <span className="sr-only">Selecionar idioma</span>
      <select
        value={language}
        onChange={(event) => changeLanguage(event.target.value)}
        aria-label="Selecionar idioma"
      >
        <option value="pt">PT-BR</option>
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>
    </label>
  );
}
