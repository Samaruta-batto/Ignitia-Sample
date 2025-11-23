
import AdminGuard from '@/components/admin/AdminGuard';
import { AdminDashboardContent } from "@/components/pages/admin/admin-dashboard-content";

export default function AdminDashboard() {
  return (
    <AdminGuard>
      <AdminDashboardContent />
    </AdminGuard>
  );
}
