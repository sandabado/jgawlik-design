import { ArrowUpRight } from 'lucide-react';
import { publications } from '@/lib/data/publications';

export default function PublishedWork() {
  return <section className="site-section published-section" id="published"><header className="section-heading"><p className="section-kicker">PUBLISHED WORK</p><h2>Systems take more than<br /><em>one form.</em></h2></header><div className="publication-grid">{publications.map((publication, index) => <article className={`publication-card publication-card--${publication.format}`} key={publication.id}><div className="publication-cover"><span>{String(index + 1).padStart(2, '0')}</span><b>{publication.title.split(' ').slice(0, 2).join('\n')}</b><i /></div><h3>{publication.title}</h3><p>{publication.subtitle}</p><small>{publication.role}</small><span className="publication-price">{publication.price}</span><a href={publication.linkUrl} target="_blank" rel="noreferrer">EXPLORE <ArrowUpRight size={15} /></a></article>)}</div></section>;
}
