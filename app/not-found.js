import ClientEffects from '@/components/ClientEffects';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Page Not Found – Niraj Kumar Sharma',
  description: 'The page you were looking for could not be found. Return to the homepage or explore the site navigation.',
};

export default function NotFound() {
  return (
    <>
      <ClientEffects />
      <Header />
      <main id="main-content">
        <section className="faq" style={{ padding: '140px 0' }}>
          <div className="c" style={{ textAlign: 'center' }}>
            <span className="tag">404</span>
            <h1 style={{ fontSize: 'clamp(2.5rem,5vw,4rem)', margin: '18px 0' }}>Page not found</h1>
            <p style={{ color: 'var(--ink3)', maxWidth: '600px', margin: '0 auto 32px', fontSize: '1rem', lineHeight: '1.8' }}>
              The page you are looking for does not exist or may have been moved. Use the menu or return to the homepage to continue browsing.
            </p>
            <Link href="/" className="btn btn-primary">
              Return Home
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
