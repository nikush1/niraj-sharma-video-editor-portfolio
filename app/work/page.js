import ClientEffects from '@/components/ClientEffects';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Projects from '@/components/Projects';
import Thumbnails from '@/components/Thumbnails';

export const metadata = {
  title: 'Work – Video Editing Portfolio | Niraj Kumar Sharma',
  description: 'Browse my portfolio of editing work for brands, creators and campaigns with strong visual impact.',
  alternates: { canonical: 'https://nirajvisuals.in/work' },
};

export default function WorkPage() {
  return (
    <>
      <ClientEffects />
      <Header />
      <main id="main-content">
        <Projects />
        <Thumbnails />
      </main>
      <Footer />
    </>
  );
}
