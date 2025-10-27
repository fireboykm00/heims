import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import MedicinesPage from "@/pages/MedicinesPage";
import EquipmentPage from "@/pages/EquipmentPage";
import SuppliersPage from "@/pages/SuppliersPage";
import OrdersPage from "@/pages/OrdersPage";
import MaintenancePage from "@/pages/MaintenancePage";
import UsersPage from "@/pages/UsersPage";
import Layout from "@/components/Layout";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? <>{children}</> : <Navigate to="/dashboard" />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      } />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="medicines" element={<MedicinesPage />} />
        <Route path="equipment" element={<EquipmentPage />} />
        <Route path="suppliers" element={<SuppliersPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="maintenance" element={<MaintenancePage />} />
        <Route path="users" element={<UsersPage />} />
      </Route>
    </Routes>
  );
}

export default App;
