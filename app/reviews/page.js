import StructuredData from '@/components/StructuredData';
import { SEO_PAGES, buildMetadata, pageSchema } from '@/lib/seo';
import ClientEffects from '@/components/ClientEffects';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Testimonials from '@/components/Testimonials';

const seo = SEO_PAGES.find(page => page.path === '/reviews');
export const metadata = buildMetadata(seo);

export default function ReviewsPage() {
  return (
    <>
      <StructuredData data={pageSchema({ ...seo, type: 'WebPage' })} />
      <ClientEffects />
      <Header />
      <main id="main-content">
        <Testimonials headingLevel="h1" />
      </main>
      <Footer />
    </>
  );
}
