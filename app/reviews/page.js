import ClientEffects from '@/components/ClientEffects';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Testimonials from '@/components/Testimonials';

export const metadata = {
  title: 'Reviews – Client Testimonials | Niraj Kumar Sharma',
  description: 'Read client reviews from brands and creators who have worked with me for video editing and campaign content.',
  alternates: { canonical: 'https://nirajvisuals.in/reviews' },
};

export default function ReviewsPage() {
  return (
    <>
      <ClientEffects />
      <Header />
      <main id="main-content">
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
