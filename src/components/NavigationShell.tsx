import Link from 'next/link';
import styles from './NavigationShell.module.css';

export type NavigationItem = {
  label: string;
  href: string;
};

type NavigationShellProps = {
  mode?: 'linear' | 'radial';
  visualMode?: 'professional' | 'ethereal';
  items?: readonly NavigationItem[];
  showSignOut?: boolean;
};

const portfolioLinks: readonly NavigationItem[] = [
  { label: 'Work', href: '/portfolio' },
  { label: 'About', href: '/portfolio/about' },
  { label: 'Amex', href: '/portfolio/case-studies/american-express' },
  { label: 'Thermo', href: '/portfolio/case-studies/thermo-fisher' },
  { label: 'TETRA', href: '/portfolio/case-studies/tetra' },
  { label: 'Résumé', href: '/resume' },
];

/** Ordinary links keep both navigation modes usable without browser scripts. */
export default function NavigationShell({
  mode = 'linear',
  visualMode = 'professional',
  items = portfolioLinks,
  showSignOut = true,
}: NavigationShellProps) {
  return (
    <nav
      className={styles.shell}
      data-navigation-mode={mode}
      data-visual-mode={visualMode}
      aria-label="Portfolio navigation"
    >
      <ul className={styles.links}>
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} prefetch={false}>{item.label}</Link>
          </li>
        ))}
      </ul>
      {showSignOut && (
        <form method="post" action="/api/portfolio-access/logout">
          <button type="submit">Sign out</button>
        </form>
      )}
    </nav>
  );
}
