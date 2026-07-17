import Link from 'next/link';
import PrintResumeButton from '@/components/PrintResumeButton';
import { capabilities } from '@/lib/data/capabilities';
import { publications } from '@/lib/data/publications';
import { resume } from '@/lib/data/resume';
import styles from './resume.module.css';

export const metadata = { title: 'Jesse Gawlik — Resume' };

export default function ResumePage() {
  return <main className={styles.page}><div className={styles.actions}><Link href="/">← PORTFOLIO</Link><PrintResumeButton /></div><article className={styles.document}><header className={styles.head}><h1>{resume.name}</h1><h2>{resume.title}</h2><div className={styles.contact}><span>{resume.location}</span><span>{resume.phone}</span><a href={`mailto:${resume.email}`}>{resume.email}</a>{resume.links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}</div></header><section className={styles.section}><h2>PROFESSIONAL SUMMARY</h2>{resume.summary.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section><section className={styles.section}><h2>SELECTED WORK</h2><ol className={styles.experience}>{resume.experience.map((entry) => <li key={entry.role}><h3>{entry.role}</h3><time>{entry.period}</time><p>{entry.company}</p><ul>{entry.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></li>)}</ol></section><section className={`${styles.section} ${styles.columns}`}><div><h2>EDUCATION</h2><ul>{resume.education.map((item) => <li key={item}>{item}</li>)}</ul></div><div><h2>CERTIFICATIONS</h2><ul>{resume.certifications.map((item) => <li key={item}>{item}</li>)}</ul></div></section><section className={styles.section}><h2>TECHNICAL CAPABILITIES</h2><table className={styles.capabilities}><thead><tr>{capabilities.map((capability) => <th key={capability.category}>{capability.category}</th>)}</tr></thead><tbody><tr>{capabilities.map((capability) => <td key={capability.category}>{capability.items.map((item) => <div key={item}>{item}</div>)}</td>)}</tr></tbody></table></section><section className={styles.section}><h2>PUBLISHED WORK</h2><ul>{publications.map((publication) => <li key={publication.id}><strong>{publication.title}</strong> — {publication.role} — {publication.linkUrl.replace('https://', '')}</li>)}</ul></section><footer className={styles.footer}>Currently accepting select consulting engagements and senior design roles.</footer></article></main>;
}
