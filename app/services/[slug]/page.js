import { notFound } from 'next/navigation';
import ClientEffects from '@/components/ClientEffects';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServiceDetail from '@/components/ServiceDetail';
import StructuredData from '@/components/StructuredData';
import { SERVICE_PAGES, getServicePage } from '@/lib/service-pages';
import { SITE_URL, PERSON_ID, buildMetadata, pageSchema } from '@/lib/seo';

export function generateStaticParams() {
  return SERVICE_PAGES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getServicePage(slug);
  if (!service) notFound();
  return buildMetadata({
    title: service.title,
    description: service.description,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = getServicePage(slug);
  if (!service) notFound();

  const path = `/services/${service.slug}`;
  const schema = pageSchema({
    path,
    title: service.name,
    description: service.description,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: service.name, path },
    ],
  });

  return (
    <>
      <StructuredData data={schema} />
      <StructuredData data={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${SITE_URL}${path}#service`,
        name: service.name,
        serviceType: service.name,
        description: service.intro,
        url: `${SITE_URL}${path}`,
        provider: { '@id': PERSON_ID },
      }} />
      <ClientEffects />
      <Header />
      <main id="main-content">
        <ServiceDetail service={service} />
      </main>
      <Footer />
    </>
  );
}
