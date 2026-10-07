import StructuredData from '@/components/StructuredData';
import { SEO_PAGES, buildMetadata, pageSchema } from '@/lib/seo';
import ClientEffects from '@/components/ClientEffects';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';

const seo = SEO_PAGES.find(page => page.path === '/contact');
export const metadata = buildMetadata(seo);

export default function ContactPage() {
  return (
    <>
      <StructuredData data={pageSchema({ ...seo, type: 'ContactPage' })} />
      <ClientEffects />
      <Header />
      <main id="main-content">
        <Contact headingLevel="h1" />
      </main>
      <Footer />
    </>
  );
}
