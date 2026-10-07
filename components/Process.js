import Link from 'next/link';

const STEPS = [
  {
    number: '01',
    title: 'Find the story.',
    description: 'Tell me about the product, the audience and what you want them to do. We start with the footage, references and approved claims.',
    detail: 'The brief',
  },
  {
    number: '02',
    title: 'Make a plan.',
    description: 'We agree the creative angles, hook variations, deliverables, timeline and budget. Everyone knows what’s coming.',
    detail: 'Scope & concepts',
  },
  {
    number: '03',
    title: 'Into the timeline.',
    description: 'This is where it comes together: the opening, the story, the pacing, the sound and the call to action. Your first cut takes shape.',
    detail: 'The first cut',
  },
  {
    number: '04',
    title: 'Get the details right.',
    description: 'You review. We refine. One consolidated feedback list keeps us moving through the revision rounds we agreed.',
    detail: 'Feedback & refinement',
  },
  {
    number: '05',
    title: 'Out into the world.',
    description: 'Final exports, ready for your placements. Feedback and available campaign data help us decide what to try in the next edit.',
    detail: 'Delivery & iteration',
  },
];

export default function Process({ headingLevel = 'h2' }) {
  const Heading = headingLevel;
  const StepHeading = headingLevel === 'h1' ? 'h2' : 'h3';

  return (
    <section className="process process-scene" id="process" aria-labelledby="process-heading">
      <div className="c">
        <header className="process-header reveal">
          <span className="tag">04 / HOW WE MAKE IT HAPPEN</span>
          <Heading id="process-heading">A little structure.<br />A lot of creativity.</Heading>
          <p>Good work is a conversation. Here’s how we get from your first idea to the final frame.</p>
          <Link className="process-link" href="/resources/video-ad-editing-brief">Start with a useful brief <span aria-hidden="true">↗</span></Link>
          <span className="process-mark" aria-hidden="true">✳</span>
        </header>

        <ol className="process-steps">
          {STEPS.map(step => (
            <li className="process-row" key={step.number}>
              <span className="process-number" aria-hidden="true">{step.number}</span>
              <div className="process-copy">
                <span className="process-detail">{step.detail}</span>
                <StepHeading>{step.title}</StepHeading>
                <p>{step.description}</p>
              </div>
              <span className="process-arrow" aria-hidden="true">↗</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
