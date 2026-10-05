import 'server-only';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { hasPortfolioSession, isPortfolioMode, PORTFOLIO_COOKIE } from './session';

export async function hasPortfolioAccess(): Promise<boolean> {
  return hasPortfolioSession((await cookies()).get(PORTFOLIO_COOKIE)?.value);
}

export async function requirePortfolioSession(): Promise<void> {
  if (!isPortfolioMode()) redirect('/coming-soon');
  if (!await hasPortfolioAccess()) redirect('/portfolio-access');
}
