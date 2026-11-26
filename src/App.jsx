import './App.css'

import { Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login';
import Registration from './pages/Registration';
import ProtectedRoute from './pages/ProtectedRoute';
import Layout from './component/Layout/Layout';
import Tasks from "./pages/Task";
import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      {/* public */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />

      {/* protected: everything inside needs a logged-in account */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Navigate to="/tasks" replace />} />
        <Route element={<Layout />}>
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
