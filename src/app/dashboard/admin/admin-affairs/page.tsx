import { redirect } from 'next/navigation';

export default function AdminAffairsPage() {
  // Redirect to executive leadership for now
  redirect('/dashboard/admin/executive-leadership');
}
