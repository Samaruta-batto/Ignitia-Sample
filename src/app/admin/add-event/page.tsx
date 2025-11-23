
import AdminGuard from '@/components/admin/AdminGuard';
import { AddEventPageContent } from "@/components/pages/admin/add-event-page-content";

export default function AddEventPage() {
  return (
    <AdminGuard>
      <AddEventPageContent />
    </AdminGuard>
  );
}
