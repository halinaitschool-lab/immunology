"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/locale";
import { LOCALE_STORAGE_KEY } from "@/lib/locale";

export function useLocale(defaultLocale: Locale = "uk") {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null;
    if (stored === "uk" || stored === "en") {
      setLocale(stored);
    }
  }, []);

  const updateLocale = (next: Locale) => {
    setLocale(next);
    localStorage.setItem(LOCALE_STORAGE_KEY, next);
  };

  return [locale, updateLocale] as const;
}
