import AdminSettings from "@/components/Admin/AdminSettings/AdminSettings";
import { AdminProvider, useAdmin } from "@/contexts/AdminContext";

const SettingsPage = () => {
  return (
    <AdminProvider>
      <AdminSettings />
    </AdminProvider>
  );
};

export default SettingsPage;
