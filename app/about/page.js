import ClientEffects from '@/components/ClientEffects';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import About from '@/components/About';

export const metadata = {
  title: 'About – Freelance Video Editor | Niraj Kumar Sharma',
  description: 'Learn more about my experience editing videos for D2C brands, creators and international campaigns.',
  alternates: { canonical: 'https://nirajvisuals.in/about' },
};

export default function AboutPage() {
  return (
    <>
      <ClientEffects />
      <Header />
      <main id="main-content">
        <About />
      </main>
      <Footer />
    </>
  );
}
