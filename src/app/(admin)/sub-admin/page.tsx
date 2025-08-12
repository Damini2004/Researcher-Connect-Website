// src/app/(admin)/sub-admin/page.tsx
import { redirect } from 'next/navigation';

export default function SubAdminDashboard() {
  redirect('/sub-admin/journal-submissions');
}
