import {redirect} from 'next/navigation';

import {getCurrentUser, landingPathForRole} from '@/server/auth';
import {signIn} from '@/server/auth-actions';

// GET /login hands off straight to Logto's hosted sign-in — no intermediate
// "proceed to sign in" screen. Sign-in must write PKCE/state cookies, which is
// allowed in a Route Handler but not during a Server Component render; that
// constraint is exactly why this is a route, not a page. Already-registered
// users skip to their dashboard.
//
// Reached both by the header's sign-in button and by the auth guards'
// redirect('/login') for unauthenticated access to protected pages.
export async function GET() {
  const user = await getCurrentUser();
  if (user) redirect(landingPathForRole(user.role));

  await signIn();
  // Unreachable: signIn() redirects the browser to Logto.
  return new Response(null, {status: 302});
}
