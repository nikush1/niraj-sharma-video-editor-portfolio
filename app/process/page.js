import ClientEffects from '@/components/ClientEffects';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Process from '@/components/Process';

export const metadata = {
  title: 'Process – Video Editing Workflow | Niraj Kumar Sharma',
  description: 'Learn about the transparent video editing process I use to deliver polished content on time and aligned with your goals.',
  alternates: { canonical: 'https://nirajvisuals.in/process' },
};

export default function ProcessPage() {
  return (
    <>
      <ClientEffects />
      <Header />
      <main id="main-content">
        <Process />
      </main>
      <Footer />
    </>
  );
}
