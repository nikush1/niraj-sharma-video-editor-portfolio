import StructuredData from '@/components/StructuredData';
import { SEO_PAGES, buildMetadata, pageSchema } from '@/lib/seo';
import ClientEffects from '@/components/ClientEffects';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import About from '@/components/About';

const seo = SEO_PAGES.find(page => page.path === '/about');
export const metadata = buildMetadata(seo);

export default function AboutPage() {
  return (
    <>
      <StructuredData data={pageSchema({ ...seo, type: 'AboutPage' })} />
      <ClientEffects />
      <Header />
      <main id="main-content">
        <About headingLevel="h1" />
      </main>
      <Footer />
    </>
  );
}
