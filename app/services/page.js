import ClientEffects from '@/components/ClientEffects';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Services from '@/components/Services';

export const metadata = {
  title: 'Services – Video Editing for D2C Brands | Niraj Kumar Sharma',
  description: 'Explore high-converting video editing services for reels, brand films, ads and content creators.',
  alternates: { canonical: 'https://nirajvisuals.in/services' },
};

export default function ServicesPage() {
  return (
    <>
      <ClientEffects />
      <Header />
      <main id="main-content">
        <Services />
      </main>
      <Footer />
    </>
  );
}
