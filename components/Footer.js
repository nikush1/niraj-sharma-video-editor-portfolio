import Link from 'next/link';

const NAV = [
  { label: 'Services',    href: '/services' },
  { label: 'Work',        href: '/work' },
  { label: 'Process',     href: '/process' },
  { label: 'Reviews',     href: '/reviews' },
  { label: 'About',       href: '/about' },
  { label: 'Recognition', href: '/#recognition' },
  { label: 'Contact',     href: '/contact' },
];

export default function Footer() {
  return (
    <footer>
      <div className="c">
        <div className="ft-top">
          <Link href="/" className="ft-logo">Niraj<em>Sharma</em></Link>

          <nav className="ft-nav" aria-label="Footer navigation">
            {NAV.map(n => (
              <Link key={n.label} href={n.href}>{n.label}</Link>
            ))}
          </nav>

          <div className="socials">
            <a
              href="https://www.instagram.com/itsnirajsharma/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Niraj Kumar Sharma on Instagram"
            >
              <i className="fab fa-instagram" aria-hidden="true" />
            </a>
            <a
              href="https://www.linkedin.com/in/nirajsharmaeditor"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Niraj Kumar Sharma on LinkedIn"
            >
              <i className="fab fa-linkedin-in" aria-hidden="true" />
            </a>
            <a
              href="https://www.youtube.com/@NikushVlogs"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Niraj Kumar Sharma on YouTube"
            >
              <i className="fab fa-youtube" aria-hidden="true" />
            </a>
            <a
              href="mailto:nirajsharmaeditor@gmail.com"
              aria-label="Email Niraj Kumar Sharma"
            >
              <i className="fas fa-envelope" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="ft-bot">
          <p>© 2026 Niraj Kumar Sharma – Freelance Video Editor, Bhilai, India. All rights reserved.</p>
          <div className="legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
