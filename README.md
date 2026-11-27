# To-Do List App

A task manager built with **React + Vite** by a team of three for the Front-End Development course.
Each user registers an account, then creates tasks with a description, due date and coloured tags, filters and searches them, sees them on a monthly calendar, and switches between light and dark themes.
All data is saved in the browser with `localStorage`, so there is no backend.

**Live demo:** https://todo-list-seven-silk-42.vercel.app.

## Features

- **Accounts:** register and log in; every account only sees its own tasks, tags and settings
- **Tasks:** create, edit, complete and delete tasks (title, description, due date, tags) in a popup on the Tasks page
- **Due date labels:** "Due today", "Due in 3 days", "2 days overdue", "Completed 1 day late"
- **Tags:** create coloured tags, change their colour, delete them (removed from tasks too)
- **Filters:** search by text, filter by status (All / Active / Completed) and by tag
- **Progress counter:** "3 of 8 done" with a progress bar, plus "Clear completed"
- **Calendar:** month view (Monday to Sunday) with each task on its due date, coloured by status (done, overdue, due today, upcoming); previous/next month and Today buttons; "+N more" when a day has more than 3 tasks
- **Empty states:** friendly messages when there are no tasks or no matches
- **Login and Register:** centred card with its own dark mode button; the last theme used is remembered after logging out
- **Settings:** light/dark theme saved per account, clear all data, log out, export/import a full backup (`.json`)
- **Responsive layout:** sidebar on desktop, top bar with a ☰ menu on phones, task table scrolls sideways on small screens
- **404 page** for unknown links

## Getting started

Requires [Node.js](https://nodejs.org/) 20 or newer.

```bash
git clone https://github.com/HeangMapanha/FrontEndDev-ToDoList_Project.git
cd FrontEndDev-ToDoList_Project
npm install
npm run dev
```

## Scripts

| Command           | What it does                           |
| ----------------- | -------------------------------------- |
| `npm run dev`     | Start the dev server with hot reload   |
| `npm run build`   | Build the production site into `dist/` |
| `npm run preview` | Preview the production build locally   |
| `npm run lint`    | Check the code with oxlint             |

## Pages

| Route       | Page                                            | Login needed |
| ----------- | ----------------------------------------------- | ------------ |
| `/login`    | Log in                                          | No           |
| `/register` | Create an account                               | No           |
| `/`         | Redirects to `/tasks`                           | Yes          |
| `/tasks`    | Task table, filters, new/edit task popup, tags  | Yes          |
| `/calendar` | Month calendar of tasks by due date             | Yes          |
| `/settings` | Theme, clear data, log out, backup              | Yes          |
| `*`         | 404 Not Found                                   | Yes          |

## Project structure

```
src/
  component/   Layout, Navbar, Card (task table + form), FilterBar, Modal,
               PickTag, TagChip, TagManager, TimeLabel
  context/     AuthContext, TaskContext, TagContext, SettingsContext
  hook/        useLocalStorage, useAuth, useTask, useTag
  model/       model.jsx: storage keys and createAccount / createTask / createTag
  pages/       Login, Registration, ProtectedRoute, Task, Calendar, Settings, NotFound
               (+ Auth.css, Task.css, Calendar.css, Settings.css)
  index.css    Global styles and light/dark theme variables
```

## Saved data (localStorage keys)

| Key                | Contents                                                                          |
| ------------------ | --------------------------------------------------------------------------------- |
| `accounts`         | Array of `{ id, name, email, password }`                                          |
| `currentAccountId` | Id of the logged-in account (or `null`)                                           |
| `tasks`            | Array of `{ id, accountId, title, description, dueDate, complete, completedAt, tagIds }` |
| `tags`             | Array of `{ id, accountId, name, color }`                                         |
| `settings`         | Object per account: `{ [accountId]: { theme: "light" \| "dark" } }`               |
| `lastTheme`        | Last theme picked (`"light"` or `"dark"`), used on Login/Register when nobody is logged in |

Note: this is a class project. Passwords are stored in plain text in the browser, so do not use a real password.

## Deployment

The app is deployed on Vercel from a fork that mirrors `main`, and it rebuilds automatically on every push.

`vercel.json` and `public/_redirects` send every URL to `index.html`, so refreshing a page such as `/tasks` works on Vercel and Netlify.

## Docs

- [Manual test checklist](docs/TEST_CHECKLIST.md)
- [Project report](docs/REPORT.md)

## Team

| Person                   | Responsibility                                                                                     |
| ------------------------ | -------------------------------------------------------------------------------------------------- |
| Person 1: Heang Mapanha  | Routing, login/register (AuthContext), TaskContext, tags, Tasks page, filters, Calendar, export/import |
| Person 2: Khemro      |                                                                                |
| Person 3: Hor Sovisal| Layout and navbar, SettingsContext and theme, Settings page, Login/Register/Tasks page styling, responsive design, 404, deployment, docs, Readme, report |
