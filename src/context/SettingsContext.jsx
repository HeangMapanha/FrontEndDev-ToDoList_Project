import { createContext, useContext, useLayoutEffect } from "react";
import { useLocalStorage } from "../hook/useLocalStorage";
import { useAuth } from "../hook/useAuth";
import { STORAGE_KEYS } from "../model/model";

export const DEFAULT_SETTINGS = {
  theme: "light", // "light" | "dark"
};

export const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const { currentAccount } = useAuth();
  const accountId = currentAccount?.id;

  // shape: { [accountId]: { theme: "dark" } }
  const [allSettings, setAllSettings] = useLocalStorage(STORAGE_KEYS.settings, {});

  // only this account's settings are exposed; missing keys fall back to defaults
  const settings = { ...DEFAULT_SETTINGS, ...(allSettings[accountId] ?? {}) };

  // apply the theme before paint to avoid a flash
  useLayoutEffect(() => {
    document.documentElement.dataset.theme = settings.theme;
  }, [settings.theme]);

  const updateSetting = (key, value) => {
    if (!accountId) return;
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