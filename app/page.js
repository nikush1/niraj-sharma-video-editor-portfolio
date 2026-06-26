import ClientEffects from '@/components/ClientEffects';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Reel from '@/components/Reel';
import Stats from '@/components/Stats';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Thumbnails from '@/components/Thumbnails';
import Process from '@/components/Process';
import Testimonials from '@/components/Testimonials';
import About from '@/components/About';
import Recognition from '@/components/Recognition';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      {/* Client-side global effects: cursor, scroll bar, BTT, theme toggle, reveal observer */}
      <ClientEffects />

      <Header />

      <main id="main-content">
        <Hero />
        <Reel />
        <Stats />
        <Services />
        <Projects />
        <Thumbnails />
        <Process />
        <Testimonials />
        <About />
        <Recognition />
        <FAQ />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
