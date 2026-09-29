import StructuredData from '@/components/StructuredData';
import { SEO_PAGES, buildMetadata, pageSchema } from '@/lib/seo';
import ClientEffects from '@/components/ClientEffects';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Projects from '@/components/Projects';
import Thumbnails from '@/components/Thumbnails';

const seo = SEO_PAGES.find(page => page.path === '/work');
export const metadata = buildMetadata(seo);

export default function WorkPage() {
  return (
    <>
      <StructuredData data={pageSchema({ ...seo, type: 'CollectionPage' })} />
      <ClientEffects />
      <Header />
      <main id="main-content">
        <Projects headingLevel="h1" />
        <Thumbnails />
      </main>
      <Footer />
    </>
  );
}
