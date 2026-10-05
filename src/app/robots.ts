import type { MetadataRoute } from 'next';

export const dynamic = 'force-dynamic';

export default function robots(): MetadataRoute.Robots {
  // Allow crawling so bots can observe noindex on formerly indexed URLs.
  // Disallowing / would prevent them from seeing that removal instruction.
  return { rules: { userAgent: '*', allow: '/' } };
}
