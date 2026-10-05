import PillarPage from '@/components/PillarPage';
import { SeoConfig } from '@/lib/seo';

export function generateMetadata() { return SeoConfig('music'); }

export default function Page() { return <PillarPage slug="music" />; }
