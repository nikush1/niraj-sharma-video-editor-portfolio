import ClientEffects from '@/components/ClientEffects';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';

export const metadata = {
  title: 'Contact – Start Your Video Project | Niraj Kumar Sharma',
  description: 'Get in touch to start a video editing project for reels, ads, brand films or social content.',
  alternates: { canonical: 'https://nirajvisuals.in/contact' },
};

export default function ContactPage() {
  return (
    <>
      <ClientEffects />
      <Header />
      <main id="main-content">
        <Contact />
      </main>
      <Footer />
    </>
  );
}
