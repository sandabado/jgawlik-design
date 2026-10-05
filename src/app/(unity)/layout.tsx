import UnityShell from '@/components/UnityShell';
import { requirePublicAccess } from '@/lib/gating/server';

export default async function UnityLayout({ children }: { children: React.ReactNode }) {
  await requirePublicAccess();
  if (process.env.UNITY_CENTER === 'false') return children;
  return <UnityShell>{children}</UnityShell>;
}
