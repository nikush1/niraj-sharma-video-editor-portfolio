import StructuredData from '@/components/StructuredData';
import { SEO_PAGES, pageSchema } from '@/lib/seo';
import ClientEffects from '@/components/ClientEffects';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Brands from '@/components/Brands';
import Reel from '@/components/Reel';
import Stats from '@/components/Stats';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Process from '@/components/Process';
import Testimonials from '@/components/Testimonials';
import About from '@/components/About';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <StructuredData data={pageSchema(SEO_PAGES[0])} />
      {/* Client-side global effects: scroll progress, back to top, theme toggle and reveal observer */}
      <ClientEffects />

      <Header />

      <main id="main-content">
        <Hero />
        <Brands />
        <Stats />
        <Projects featured />
        <Services />
        <About />
        <Reel />
        <Process />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
