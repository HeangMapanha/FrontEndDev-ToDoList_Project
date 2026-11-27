# To-Do List App: Project Report

**Course:** Front-End Development · **Team:** Person 1 Heang Mapanha, Person 2 TODO name, Person 3 Sovisal Hor
**Live site:** TODO new Vercel link · **Repository:** https://github.com/HeangMapanha/FrontEndDev-ToDoList_Project

## 1. Overview

We built a single-page task manager with **React 19, Vite and React Router 7**. A user registers an account, then creates tasks with a title, description, due date and coloured tags, filters and searches them, sees them on a monthly calendar, and switches between a light and a dark theme. There is no backend: all data lives in the browser's `localStorage`, and every task, tag and setting is linked to the account that created it, so several people can share one browser.

The app has six pages: Login, Register, Tasks, Calendar, Settings and a 404 page. Everything except Login and Register is wrapped in a `ProtectedRoute` that sends logged-out users to `/login`, and in a shared `Layout` with the navbar. Creating and editing tasks happens in a popup on the Tasks page instead of a separate page.

## 2. Team split

| Person | Responsibility |
|--------|----------------|
| Person 1 (Heang Mapanha) | Router, login/register (`AuthContext`), `TaskContext`, `TagContext`, data model, task table and popup, tags, filters, due date labels, Calendar page, export/import |
| Person 2 (TODO name) | TODO: one line on your part |
| Person 3 (Sovisal) | Layout and navbar, `SettingsContext` and light/dark theme, Settings page, global styles, Login/Register and Tasks page styling, responsive design, empty states, counter and progress bar, 404 page, Vercel deployment, test checklist, README, this report |

Each person worked on their own Git branch and merged through pull requests.

## 3. React context and hooks

**Context.** Four providers wrap the app in `main.jsx`. `AuthContext` holds the accounts and the current account and exposes `register`, `login` and `logout`. `TaskContext` and `TagContext` keep one list for all accounts but only expose the current account's items, with actions such as `addTask`, `toggleTask`, `addTag` and `deleteTag`. `SettingsContext` (Person 3) stores settings per account as `{ [accountId]: { theme } }` and exposes `settings`, `updateSetting`, `toggleTheme` and `resetSettings`. Because the navbar's theme button and the Settings switch both use this one context, they always stay in sync. Each context has a small custom hook (`useAuth`, `useTask`, `useTag`, `useSettings`) so components never import the context directly.

**Hooks.** `useLocalStorage` is a custom hook built on `useState` (with a lazy initial value, so storage is read only once) and `useEffect` (saves whenever the value changes). `SettingsContext` uses `useLayoutEffect` to set `<html data-theme="…">` before the browser paints, so there is no flash of the wrong theme; a second `useLocalStorage` value remembers the last theme so the Login and Register pages keep it after logging out. The Tasks page uses `useState` for the filters and the popups, `Modal` and `PickTag` use `useEffect` to close on Escape or an outside click, Settings uses `useRef` to open the hidden file input for importing a backup, and the Calendar uses `useMemo` to group tasks by due date once instead of for every day cell.

TODO (Person 1): one or two sentences on how you designed the auth and task contexts.
TODO (Person 2): one or two sentences on your hooks or components.

## 4. Persistence

Six keys are used: `accounts`, `currentAccountId`, `tasks`, `tags`, `settings` and `lastTheme` (the theme shown on Login/Register when nobody is logged in). Each context reads its key once on start-up and writes it back on every change. If a key holds broken JSON, `useLocalStorage` falls back to the default value, so the app never shows a white screen. Settings merge over `DEFAULT_SETTINGS`, so a setting added later still gets a default. **Clear all data** asks for confirmation, then removes only the current account's tasks, tags and settings. **Export** downloads every key as one `.json` file, and **Import** checks the file's shape before replacing the data.

## 5. Styling, theme and responsive design

All colours are CSS variables in `src/index.css`. Dark mode only redefines them under `:root[data-theme="dark"]`, so no component needs its own dark styles. Above 768px the navbar is a fixed sidebar; at 768px and below it becomes a top bar with a ☰ button. On phones the task table scrolls sideways inside its own box so the page does not. Login and Register use a centred card with their own dark mode button, and the task popup has styled fields and buttons. Polish includes the active-link highlight, a "3 of 8 done" counter with a progress bar, empty states ("No tasks yet", "No tasks match your filters") and the 404 page.

## 6. Deployment

The app is deployed on **Vercel**, connected to GitHub so every push redeploys. React Router handles URLs in the browser, so refreshing a page like `/settings` would normally give a server 404. A rewrite in `vercel.json` (and `public/_redirects` for Netlify) sends every path to `index.html`.

## 7. Challenges and solutions

| Challenge | What we did |
|-----------|-------------|
| Working in parallel on one codebase | Agreed folders, field names and storage keys first; one branch per person |
| Big change to the data model mid-project (accounts, tags instead of categories, no priority) | Merged `main` into the new branch and rewrote Settings to save the theme per account |
| Merge conflicts between branches that started at different times | Merged in small steps and tested the app after each merge |
| Theme colours not showing in teammates' new components | Replaced fixed colours with the shared CSS variables |
| Login/Register always fell back to light mode after logging out | Saved a separate `lastTheme` key used when nobody is logged in |
| Refreshing deep links gave a 404 on Vercel | SPA rewrite in `vercel.json` / `_redirects` |
| TODO (Person 1) | |
| TODO (Person 2) | |

## 8. Results and testing

- Finished: accounts, task CRUD with tags and due labels, filters and search, month calendar, settings with theme, backup and clear data, responsive layout, 404, deployment. TODO: list anything still unfinished at submission.
- `npm run build` succeeds and `npm run lint` reports no errors.
- Manual testing: see `docs/TEST_CHECKLIST.md` (85 checks). TODO: "N of 85 passed on Chrome desktop and a phone."
- Requirements: 5+ routed pages ✔ · React Context ✔ · `useState`/`useEffect` ✔ · localStorage ✔ · live deployment ✔ · responsive with light/dark theme ✔ · 90%+ of features (TODO confirm).

## 9. What we would improve next

Open a task's edit popup straight from the calendar; hash passwords or use a real backend for login (passwords are currently stored in plain text, which is fine only for a class demo); add a confirm before deleting a task; add automated tests.
