import { Routes, Route } from "react-router-dom";
import App from "../App";
import { auth } from '../FirebaseConfig';
import AuthPage from "../Pages/AuthPage/AuthPage";
import ProfilePage from "../Pages/ProfilePage/ProfilePage";
import DashboardPage from "../Pages/DashboardPage/DashboardPage";
import ProtectedRoute from "../Components/ProtectedRoute";
import { User } from "firebase/auth";
import DiagramExample from "../Pages/NodeGraphPage/NodeGraphPage";

export const AppRoutes = ({ user }: { user: User | null }) => {
    return (
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/dashboard" element={<ProtectedRoute user={user}><DashboardPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute user={user}><ProfilePage /></ProtectedRoute>} />
        <Route path="/graph" element={<DiagramExample/>} />
      </Routes>
    );
  };
