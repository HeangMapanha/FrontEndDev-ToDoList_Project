
import './App.css'

import { Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Registration from './pages/Registration';
import ProtectedRoute from './pages/ProtectedRoute';
import Layout from './component/Layout/Layout';
import Tasks from "./pages/Task";
import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";

function App() {
  return (
    // <Routes>
    //   <Route element={<Layout />}>
    //     <Route index element={<Dashboard />} />
    //     <Route path="tasks" element={<Tasks />} />
    //     <Route path="tasks/new" element={<EditTask />} />
    //     <Route path="calendar" element={<Calendar />} />
    //     <Route path="settings" element={<Settings />} />
    //   </Route>
    // </Routes>
  <Routes>
  {/* public */}
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Registration />} />

  {/* protected: everything inside needs a logged-in account */}
  <Route element={<ProtectedRoute />}>
    <Route element={<Layout />}>
      {/* <Route path="/" element={<Dashboard />} /> */}
      <Route path="/tasks" element={<Tasks />} />
      {/* <Route path="/tasks/edit" element={<EditTask />} /> */}
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/settings" element={<Settings />} />
    </Route>
  </Route>
</Routes>
  );
}

export default App;