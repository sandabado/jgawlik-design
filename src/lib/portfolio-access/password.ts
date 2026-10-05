import 'server-only';
import { scrypt, timingSafeEqual } from 'node:crypto';
import { isPortfolioMode, portfolioAccessConfiguration } from './session';

export async function verifyPortfolioPassword(password: string): Promise<boolean> {
  const configuration = portfolioAccessConfiguration();
  if (!isPortfolioMode() || !configuration || password.length === 0 || password.length > 256) return false;
  const fields = configuration.hash.split(':');
  const salt = Buffer.from(fields[4], 'base64url');
  const expected = Buffer.from(fields[5], 'base64url');
  const actual = await new Promise<Buffer>((resolve, reject) => {
    scrypt(password, salt, 32, { N: 32768, r: 8, p: 3, maxmem: 64 * 1024 * 1024 }, (error, key) => {
      if (error) reject(new Error('Portfolio access is unavailable.'));
      else resolve(key);
    });
  });
  return timingSafeEqual(actual, expected);
}
