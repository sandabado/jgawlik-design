import UnityHero from '@/components/UnityHero';
import OnePractice from '@/components/OnePractice';
import PillarStrip from '@/components/PillarStrip';
import ArchitectBio from '@/components/ArchitectBio';
import OriginalHome from '@/components/OriginalHome';
import { SeoConfig, architectStructuredData } from '@/lib/seo';

export function generateMetadata() { return process.env.UNITY_CENTER === 'false' ? {} : SeoConfig(); }

export default function Home() {
  if (process.env.UNITY_CENTER === 'false') return <OriginalHome />;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(architectStructuredData).replace(/</g, '\\u003c') }} />
      <UnityHero />
      <OnePractice />
      <PillarStrip />
      <ArchitectBio />
    </>
  );
}
