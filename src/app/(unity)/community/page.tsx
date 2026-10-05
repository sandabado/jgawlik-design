import PillarPage from '@/components/PillarPage';
import { SeoConfig } from '@/lib/seo';

export function generateMetadata() { return SeoConfig('community'); }

export default function Page() { return <PillarPage slug="community" />; }
