import { Routes, Route } from "react-router-dom";
import { LoginRoute } from "./routes/PrivateRoutes";
import axios from "axios";
////////// Styles //////////
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "./main.scss";
////////// Shared Components //////////
import { Login } from "./pages/Login";
import { Footer } from "./common/Footer";
import { Redirecting } from "./pages/Redirecting";
import { Unauthorized } from "./pages/Unauthorized";
import { NotFound } from "./pages/NotFound";
import { ForgetPwd } from "./pages/ForgetPwd";
import { ResetPwd } from "./pages/ResetPwd";
import { Header } from "./components/header/Header";
////////// Private Routes //////////
import { AdminRoutes } from "./roles/admin/AdminRoutes";
import { StaffRoutes } from "./roles/staff/StaffRoutes";
import { TestingPage } from "./common/TestingPage";
import { TableSkeletonLoader } from "./components/loaders/TableSkeletonLoader";

function App() {
  axios.defaults.withCredentials = true;
  return (
    <div className="App">
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="" element={<Login />} exact />
        <Route path="login" element={<Login />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="redirecting" element={<Redirecting />} />
        <Route path="forgetpwd" element={<ForgetPwd />} />
        <Route path="resetpwd/:token" element={<ResetPwd />} />
        <Route path="testing" element={<TestingPage />} />
        <Route path="table" element={<TableSkeletonLoader />} />

        {/* Staff Routes (Private) */}
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
