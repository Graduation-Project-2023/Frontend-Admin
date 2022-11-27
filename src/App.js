import { Routes, Route } from "react-router-dom";
import { LoginRoute } from "./routes/PrivateRoutes";
////////// Styles //////////
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "./main.scss";
////////// Shared Components //////////
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Admission } from "./pages/Admission";
import { Footer } from "./common/Footer";
import { Redirecting } from "./pages/Redirecting";
import { Unauthorized } from "./pages/Unauthorized";
import { NotFound } from "./pages/NotFound";
import { ForgetPwd } from "./pages/ForgetPwd";
import { ResetPwd } from "./pages/ResetPwd";
////////// Private Routes //////////
import { StudentRoutes } from "./roles/student/StudentRoutes";
import { AdminRoutes } from "./roles/admin/AdminRoutes";
import { StaffRoutes } from "./roles/staff/StaffRoutes";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="" element={<Home />} exact />
        <Route path="home" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="admission" element={<Admission />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="redirecting" element={<Redirecting />} />
        <Route path="forgetpwd" element={<ForgetPwd />} />
        <Route path="resetpwd/:token" element={<ResetPwd />} />

        {/* Student Routes (Private) */}
        <Route element={<LoginRoute allowedRoles={"STUDENT"} />}>
          <Route path="student_portal/*" element={<StudentRoutes />} />
        </Route>

        {/* Professor Routes (Private) */}
        <Route element={<LoginRoute allowedRoles={"STAFF"} />}>
          <Route path="staff_portal/*" element={<StaffRoutes />} />
        </Route>

        {/* Admin Routes (Private) */}
        <Route element={<LoginRoute allowedRoles={"ADMIN"} />}>
          <Route path="admin_portal/*" element={<AdminRoutes />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
