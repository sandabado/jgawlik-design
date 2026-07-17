import BrandSystemGrid from '@/components/BrandSystemGrid';
import Capabilities from '@/components/Capabilities';
import Contact from '@/components/Contact';
import DodecahedronLoader from '@/components/DodecahedronLoader';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Navigation from '@/components/Navigation';
import PublishedWork from '@/components/PublishedWork';
import Timeline from '@/components/Timeline';
import Compass from '@/components/Compass';
import TreeOfLifeProgress from '@/components/TreeOfLifeProgress';
import WorkSection from '@/components/WorkSection';
import SystemsArchitecture from '@/components/SystemsArchitecture';

export default function Home() {
  return (
    <main>
      <DodecahedronLoader />
      <TreeOfLifeProgress />
      <Compass />
      <Navigation />
      <Hero />
      <Marquee />
      <WorkSection />
      <SystemsArchitecture />
      <BrandSystemGrid />
      <PublishedWork />
      <Capabilities />
      <Timeline />
      <Contact />
      <Footer />
    </main>
  );
}
