import { projects } from '@/lib/data/projects';
import WorkGallery from './WorkGallery';

export default function WorkSection() {
  return <WorkGallery projects={projects} />;
}
