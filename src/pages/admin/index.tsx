// pages/admin/index.tsx
import AdminDashboard from "@/components/Admin/AdminDashboard/AdminDashboard";
import AdminSettings from "@/components/Admin/AdminSettings/AdminSettings";
import { AdminAuthProvider, useAuth } from "@/contexts/AdminAuthContext";
import { AdminProvider } from "@/contexts/AdminContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import SettingsPage from "./settings";

const AdminPage = () => {
  const { isAuthenticated }: any = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null; // or a loading spinner
  }

  return (
    // <AdminAuthProvider>
    <AdminProvider>
      <AdminDashboard />
      {/* <SettingsPage /> */}
    </AdminProvider>
    // </AdminAuthProvider>
  );
};

export default AdminPage;
