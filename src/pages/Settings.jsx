import { useRef } from "react";
import { useTag } from "../hook/useTag";
import { useTask } from "../hook/useTask";
import { STORAGE_KEYS } from "../model/model";
import { useAuth } from "../hook/useAuth";
import { useSettings } from "../context/SettingsContext";
import "./Settings.css";

// const PRIORITIES = ["Low", "Medium", "High"];

// function for import
const read = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

// Main settings page
export default function Settings() {
  const fileRef = useRef(null);
  const { settings,updateSetting, toggleTheme } = useSettings();
  const { currentAccount, logout } = useAuth();
  const { clearAllTasks } = useTask();
  const { clearAllTags } = useTag();

  const handleClearAll = () => {
    if (!window.confirm("Delete all your tasks and tags? This cannot be undone.")) return;
    clearAllTasks();
    clearAllTags();
};

  // Export .json file
  const handleExport = () => {
    const data = {
      app: "todo-app",
      version: 2,
      exportedAt: new Date().toISOString(),
      accounts: read(STORAGE_KEYS.accounts, []),
      tasks: read(STORAGE_KEYS.tasks, []),
      tags: read(STORAGE_KEYS.tags, []),
      settings: read(STORAGE_KEYS.settings, {}),
    };

    // Download the .json
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = `todo-full-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  //Read the LocalStorage and save it to .json
  const handleImport = async (e) => {
    const file = e.target.files[0];
    e.target.value = ""; // lets you pick the same file again later
    if (!file) return;

    try {
      // Data require accounts
      const data = JSON.parse(await file.text());
      const valid =
        data.app === "todo-app" &&
        Array.isArray(data.accounts) &&
        Array.isArray(data.tasks) &&
        Array.isArray(data.tags) &&
        data.settings && typeof data.settings === "object";
      if (!valid) throw new Error("wrong shape");

      const ok = window.confirm(
        `Import ${data.accounts.length} account(s), ${data.tasks.length} tasks and ${data.tags.length} tags? ` +
        "This replaces ALL accounts and data in this browser."
      );
      if (!ok) return;

      localStorage.setItem(STORAGE_KEYS.accounts, JSON.stringify(data.accounts));
      localStorage.setItem(STORAGE_KEYS.tasks, JSON.stringify(data.tasks));
      localStorage.setItem(STORAGE_KEYS.tags, JSON.stringify(data.tags));
      localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(data.settings));

      // stay logged in only if this account exists in the imported file
      const stillExists = data.accounts.some((a) => a.id === currentAccount?.id);
      if (!stillExists) localStorage.removeItem(STORAGE_KEYS.currentAccountId);

      window.location.reload(); // contexts re-read localStorage on load
    } catch {
      window.alert("That file isn't a valid full backup.");
    }
  };

  return (
    <div className="page settings">
      <h1>Settings</h1>

      {/* <section className="card">
        <h2>Profile</h2>
        <label className="field">
          <span>Your name</span>
          <input
            type="text"
            placeholder="e.g. Sovisal"
            value={settings.userName}
            onChange={(e) => updateSetting("userName", e.target.value)}
          />
        </label>
      </section> */}

      <section className="card">
        <h2>Appearance</h2>
        <div className="field row">
          <span>Dark mode</span>
          <button
            type="button"
            className={`switch ${settings.theme === "dark" ? "on" : ""}`}
            role="switch"
            aria-checked={settings.theme === "dark"}
            onClick={toggleTheme}
          >
            <span className="knob" />
          </button>
        </div>
      </section>

      {/* <section className="card">
        <h2>Tasks</h2>
        <label className="field">
          <span>Default priority for new tasks</span>
          <select
            value={settings.defaultPriority}
            onChange={(e) => updateSetting("defaultPriority", e.target.value)}
          >
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>
      </section> */}

      {/* Remove Data */}
      <section className="card danger-zone">
        <h2>Danger zone</h2>
        <p>Remove every task, category and setting saved in this browser.</p>
        <button type="button" className="btn btn-danger" onClick={handleClearAll}>
          Clear all data
        </button>

      </section>
        
        {/* Log out */}
            <section className="card">
        <h2>Account</h2>
        <p>
          Signed in as <strong>{currentAccount?.name}</strong>
          <br />
          <small>{currentAccount?.email}</small>
        </p>
        <button type="button" onClick={logout}>Log out</button>
      </section>

    <section className="card">
      <h2>Backup</h2>
      <p>Export every account, task, tag and setting to one file, or restore from one.</p>
      <button type="button" onClick={handleExport}>Export all data</button>
      <button type="button" onClick={() => fileRef.current.click()}>Import all data</button>
      <input
        ref={fileRef}
        type="file"
        accept=".json,application/json"
        hidden
        onChange={handleImport}
      />
    </section>
    </div>
  );
}