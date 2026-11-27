import { createContext, useContext, useEffect, useLayoutEffect } from "react";
import { useLocalStorage } from "../hook/useLocalStorage";
import { useAuth } from "../hook/useAuth";
import { STORAGE_KEYS } from "../model/model";

export const DEFAULT_SETTINGS = {
  theme: "light", // "light" | "dark"
};

// The theme used when nobody is logged in (Login / Register pages).
// It remembers the last theme anyone picked, so logging out keeps the same look.
const LAST_THEME_KEY = "lastTheme";

export const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const { currentAccount } = useAuth();
  const accountId = currentAccount?.id;

  // shape: { [accountId]: { theme: "dark" } }
  const [allSettings, setAllSettings] = useLocalStorage(STORAGE_KEYS.settings, {});
  const [lastTheme, setLastTheme] = useLocalStorage(LAST_THEME_KEY, DEFAULT_SETTINGS.theme);

  // logged in: this account's settings (a new account starts with the last theme)
  // logged out: just the last theme
  const settings = {
    ...DEFAULT_SETTINGS,
    theme: lastTheme,
    ...(accountId ? allSettings[accountId] ?? {} : {}),
  };

  // apply the theme before paint to avoid a flash
  useLayoutEffect(() => {
    document.documentElement.dataset.theme = settings.theme;
  }, [settings.theme]);

  // after logging in, remember that account's theme for the next logged-out visit
  useEffect(() => {
    if (accountId && settings.theme !== lastTheme) setLastTheme(settings.theme);
  }, [accountId, settings.theme, lastTheme, setLastTheme]);

  const updateSetting = (key, value) => {
    if (key === "theme") setLastTheme(value);
    if (!accountId) return; // logged out: only the last theme is saved
    setAllSettings((prev) => ({
      ...prev,
      [accountId]: { ...DEFAULT_SETTINGS, ...(prev[accountId] ?? {}), [key]: value },
    }));
  };

  const toggleTheme = () =>
    updateSetting("theme", settings.theme === "dark" ? "light" : "dark");

  const resetSettings = () => {
    if (!accountId) return;
    setAllSettings((prev) => {
      const { [accountId]: _removed, ...rest } = prev;
      return rest;
    });
  };

  const value = { settings, updateSetting, toggleTheme, resetSettings };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used inside SettingsProvider");
  return ctx;
}
