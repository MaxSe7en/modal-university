// pages/admin/index.tsx
import AdminDashboard from '@/components/Admin/AdminDashboard/AdminDashboard';
import { useAuth } from '@/contexts/AdminAuthContext';
import { AdminProvider } from '@/contexts/AdminContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const AdminPage = () => {
    const { isAuthenticated }:any = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
        return null; // or a loading spinner
    }

    return (
        <AdminProvider>
            <AdminDashboard />
        </AdminProvider>
    );
};

export default AdminPage;
