import AdminSettings from "@/components/Admin/AdminSettings/AdminSettings";
import { AdminProvider } from "@/contexts/AdminContext";
import Head from "next/head"; // Import Head from next/head

const SettingsPage = () => {
  return (
    <>
      <Head>
        <title>Admin Settings - Modal University College</title>
      </Head>
      <AdminProvider>
        <AdminSettings />
      </AdminProvider>
    </>
  );
};

export default SettingsPage;
