import { Routes, Route } from "react-router-dom";
import AuthPage from "../Pages/AuthPage/AuthPage";
import ProfilePage from "../Pages/ProfilePage/ProfilePage";
import DashboardPage from "../Pages/DashboardPage/DashboardPage";
import ProtectedRoute from "../Components/ProtectedRoute";
import { User } from "firebase/auth";
import DiagramExample from "../Pages/NodeGraphPage/NodeGraphPage";

export const AppRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/profile/:user_id" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/graph" element={<DiagramExample/>} />
      </Routes>
    );
  };
