import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

import Landing from "./components/LandPage/Landing";
import CheckStatus from "./components/Status/CheckStatus";
import JobF from "./components/JobF/JobForm";
import AddTechnician from "./components/AddTechnicians/AddTechnician";
import AdminDashboard from "./components/admin/AdminDashboard";
import AllJobs from "./components/admin/AllJobs";
import ModifyJobs from "./components/admin/ModifyJobs";
import NotificationPanel from "./components/admin/NotificationPanel";
import RoleSwitcher from "./components/utils/RoleSwitcher"; 

//Role protection wrapper
function ProtectedRoute({ children, allowedRoles }) {
  const role = localStorage.getItem("role");

  if (!allowedRoles.includes(role)) {
    alert("Access denied. You must be an admin to view this page.");
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  const role = localStorage.getItem("role");

  return (
    <div className="pt-[90px]">
      <RoleSwitcher />

      <Routes>
        <Route
          path="/"
          element={
            role === "admin" ? (
              <Navigate to="/admin" replace />
            ) : (
              <Landing />
            )
          }
        />

        <Route path="/check-status" element={<CheckStatus />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="create-job" element={<JobF />} />
          <Route path="add-technician" element={<AddTechnician />} />
          <Route path="all-jobs" element={<AllJobs />} />
          <Route path="modify-jobs" element={<ModifyJobs />} />
          <Route path="/admin/notifications" element={<NotificationPanel />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
