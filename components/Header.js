'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/process', label: 'Process' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const close = () => setOpen(false);

  return (
    <header id="hdr">
      <div className="c">
        <nav aria-label="Primary navigation">
          <Link href="/" className="logo" onClick={close}>
            <span className="logo-pip" aria-hidden="true" />
            Niraj<em>Sharma</em>
          </Link>
          <ul className={`nav-links${open ? ' open' : ''}`} id="navL" role="list">
            {NAV.map(n => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  onClick={close}
                  className={pathname === n.href ? 'active' : undefined}
                  aria-current={pathname === n.href ? 'page' : undefined}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/contact" className="btn btn-primary nav-cta" onClick={close}>
            Hire Me
          </Link>
          <button
            className="menu-toggle"
            id="mTog"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={open}
            aria-controls="navL"
            onClick={() => setOpen(v => !v)}
          >
            <i className={`fas ${open ? 'fa-times' : 'fa-bars'}`} aria-hidden="true" />
          </button>
        </nav>
      </div>
    </header>
  );
}
