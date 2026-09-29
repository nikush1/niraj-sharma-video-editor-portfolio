import Link from 'next/link';
import ClientEffects from '@/components/ClientEffects';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CopyBrief from '@/components/CopyBrief';
import StructuredData from '@/components/StructuredData';
import { buildMetadata, pageSchema } from '@/lib/seo';

const title = 'How to Brief a Video Editor for D2C and UGC Ads';
const description = 'A practical video ad editing brief for D2C brands: audience, approved claims, footage, hooks, deliverables, deadlines and feedback. Includes a copyable template.';
const path = '/resources/video-ad-editing-brief';

export const metadata = buildMetadata({ title, description, path });

const template = `VIDEO AD EDITING BRIEF
Brand and website:
Product and landing page:
Project contact / final approver:

Goal and desired viewer action:
Audience, awareness level and main objection:
Key message and approved product claims:
Offer, expiry date and call to action:

Footage folder and strongest takes / timestamps:
Brand kit, references and what you like about them:
Footage, creator and music usage permissions:

Number of concepts:
Hook variations per concept:
Unique videos and total exports required:
Aspect ratios, duration, language and captions:

First-cut deadline and timezone:
Feedback deadline / launch date:
Budget or budget range:
Revision rounds to agree:
Feedback owner and review link:
Anything that must not appear:`;

export default function VideoAdEditingBriefPage() {
  return (
    <>
      <ClientEffects />
      <Header />
      <StructuredData data={pageSchema({
        path,
        title,
        description,
        type: 'WebPage',
        breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Video ad editing brief', path }],
      })} />
      <main id="main-content" className="detail-page c">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span aria-hidden="true"> / </span><span aria-current="page">Video ad editing brief</span>
        </nav>
        <header className="detail-header">
          <p className="detail-eyebrow">A practical guide for brands and agencies</p>
          <h1>How to brief a video editor for D2C and UGC ads</h1>
          <p className="detail-intro">A useful brief tells your editor what the viewer needs to understand, which assets are ready, and what you need delivered. Use this checklist before sending your next batch of footage.</p>
        </header>

        <section className="detail-section">
          <h2>1. Start with the audience and action</h2>
          <p>Choose one main objective: introduce a product, explain a benefit, answer an objection or promote an offer. Say who the ad is for, what they already know and what they should do next. “Busy first-time buyers comparing options” is more useful than “everyone aged 18–45.”</p>
        </section>

        <section className="detail-section">
          <h2>2. Supply the product, offer and approved claims</h2>
          <p>Link the exact product and landing page. Include the current price, offer dates, exclusions and call to action. Separate approved wording from ideas that need review. Provide evidence or approved source material for product claims, and identify who signs off the final copy.</p>
        </section>

        <section className="detail-section">
          <h2>3. Organise footage and usage permissions</h2>
          <p>Share an accessible folder with original footage, the script, logos, fonts and brand colours. Mark useful takes with filenames and timestamps. Confirm the intended use is covered by permissions for creator footage, customer clips, music and other assets. Flag anything that must stay out of the edit.</p>
        </section>

        <section className="detail-section">
          <h2>4. Define concepts and hook variations separately</h2>
          <p>A concept is the central angle of an ad. A hook variation changes its opening while keeping the main message consistent. Requesting one concept with three openings is a different scope from requesting three separate stories. Specify whether the body and call to action also change.</p>
          <p>For projects focused on creative variations, see my <Link href="/services/meta-ads-video-editing">Meta ads video editing service</Link>. For creator-led footage, see <Link href="/services/ugc-video-editing">UGC video editing</Link>.</p>
        </section>

        <section className="detail-section">
          <h2>5. Count the deliverables</h2>
          <p>List unique edits and exported files separately. Three hook versions in two aspect ratios means six exports. Confirm platforms, ratios, target duration, languages and caption style. Say whether you need clean versions, separate subtitle files, cover images or editable project files.</p>
        </section>

        <section className="detail-section">
          <h2>6. Give dates, times and a timezone</h2>
          <p>Set a footage handover date, first-cut deadline, feedback window and final delivery date. Write “Tuesday, 3 PM IST” instead of “Tuesday afternoon.” If the launch is fixed, say so upfront and leave space for your team to review before the final export.</p>
        </section>

        <section className="detail-section">
          <h2>7. Agree the budget and revision scope</h2>
          <p>Share a budget or range so the scope can be agreed before editing begins. Confirm revision rounds and what happens if the script, footage or direction changes after approval. Include any asset licensing, extra formats or source-file requirements in that discussion.</p>
        </section>

        <section className="detail-section">
          <h2>8. Send one consolidated feedback list</h2>
          <p>Nominate one person to combine feedback from your team. Use timestamps and describe the change: “At 0:06, replace this shot with the product close-up.” Separate required fixes from optional ideas. Resolve conflicting comments before sending the next revision round.</p>
        </section>

        <aside className="detail-callout" aria-labelledby="example-brief-heading">
          <h2 id="example-brief-heading">Example brief</h2>
          <p>A fictional reusable-bottle brand needs one product-demo concept with three hook openings. Deliver three 20–30 second vertical videos, with captions. Use supplied creator footage, an approved leak-test clip and a “Shop the range” CTA. First cut: 3 PM IST on the agreed date; one consolidated revision round.</p>
        </aside>

        <section className="detail-section" aria-labelledby="copy-brief-heading">
          <h2 id="copy-brief-heading">Build your brief</h2>
          <p>Use the template below as a starting point. If something is undecided, mark it “to discuss” instead of guessing.</p>
          <CopyBrief template={template} />
        </section>

        <section className="detail-section">
          <h2>Have footage ready?</h2>
          <p>I’m Niraj Kumar Sharma, a Video Editor at BeastLife working on D2C and UGC creative. Send your brief and I can discuss the scope, timeline and next steps.</p>
          <div className="detail-actions">
            <Link href="/contact" className="btn btn-primary">Discuss your brief</Link>
            <Link href="/work" className="btn btn-outline">View editing work</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
