import StructuredData from '@/components/StructuredData';
import { SEO_PAGES, buildMetadata, pageSchema } from '@/lib/seo';
import ClientEffects from '@/components/ClientEffects';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Services from '@/components/Services';

const seo = SEO_PAGES.find(page => page.path === '/services');
export const metadata = buildMetadata(seo);

export default function ServicesPage() {
  return (
    <>
      <StructuredData data={pageSchema({ ...seo, type: 'WebPage' })} />
      <ClientEffects />
      <Header />
      <main id="main-content">
        <Services headingLevel="h1" />
      </main>
      <Footer />
    </>
  );
}
