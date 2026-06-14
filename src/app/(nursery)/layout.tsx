import {requireRole} from '@/server/auth';

// Auth guard for every nursery page in this route group. See the seeker layout
// for the rationale; new pages added here are guarded automatically.
export const dynamic = 'force-dynamic';

export default async function NurseryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole(['NURSERY']);
  return <>{children}</>;
}
