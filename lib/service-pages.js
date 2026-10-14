export const SERVICE_PAGES = [
  {
    slug: 'meta-ads-video-editing',
    name: 'Meta ads video editing',
    title: 'Meta Ads Video Editing for D2C Brands | Niraj Kumar Sharma',
    description: 'Meta ads video editing for D2C brands and agencies: product demos, offer-led creatives and hook variations, with a clear brief and organised handoff.',
    eyebrow: 'D2C brands · Performance agencies',
    intro: 'Turn product footage, creator clips and a clear brief into video ads built around one message. I’m Niraj Kumar Sharma, a Video Editor Executive at BeastLife, based in Delhi NCR and working with brands and agencies internationally.',
    exampleProjectIds: ['_-4noehZq8I', 'hJQpDCiOeAE', 'DwVaIbKH3oo'],
    sections: [
      {
        title: 'Give each ad a clear job',
        paragraphs: [
          'An offer announcement, product demonstration and objection-handling ad need different structures. Before editing, we agree on the audience, the main benefit and the action you want a viewer to take. That gives the hook, supporting footage and final call to action a common purpose.',
          'I edit the creative; your team keeps control of campaign setup, media buying and budget. When you share feedback from a campaign, we can use it to plan the next edit without treating any single result as a guarantee.',
        ],
      },
      {
        title: 'What an editing scope can include',
        items: [
          'A main cut using your product footage, creator clips or supplied assets.',
          'Alternative opening hooks, benefit sequences or calls to action for creative testing.',
          'Captions, on-screen product information, sound design and motion elements where useful.',
          'Placement versions and clearly named exports, agreed before production starts.',
        ],
      },
      {
        title: 'What to send before we start',
        paragraphs: [
          'Share your product page, audience, approved claims, current offer, brand assets and source footage. Include examples of the tone you want, any required disclaimers and the placements you plan to use. If you have existing ads, explain what you want to keep or change.',
          'We then agree on the number of concepts, variations, formats, review rounds and delivery dates. A short written brief helps keep feedback specific and avoids discovering missing footage halfway through an edit.',
        ],
      },
      {
        title: 'From first cut to the next test',
        paragraphs: [
          'The first cut establishes the story and visual direction. Send consolidated feedback with timestamps so revisions stay clear. Once the main cut is approved, I prepare the agreed variants and exports. For recurring work, we can organise batches around your creative calendar and document what changed between versions.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can you make several ads from the same footage?',
        answer: 'Yes, when the footage supports different messages. We can change hooks, sequence, emphasis or CTAs. The number of versions is part of the agreed scope.',
      },
      {
        question: 'Do you manage Meta ad campaigns?',
        answer: 'This service covers video editing and creative variations. Campaign management and media buying stay with your team or agency.',
      },
      {
        question: 'Can we start with one project?',
        answer: 'Yes. Send the brief and available assets so we can define a paid project scope before considering ongoing editing support.',
      },
    ],
    relatedSlug: 'ugc-video-editing',
    relatedLabel: 'Explore UGC video editing',
  },
  {
    slug: 'ugc-video-editing',
    name: 'UGC video editing',
    title: 'UGC Video Editing for Brands & Agencies | Niraj Kumar Sharma',
    description: 'UGC video editing for brands and agencies: shape supplied creator footage into clear stories with captions, supporting footage and creative variations.',
    eyebrow: 'Creator footage · Brand stories',
    intro: 'Make your creator footage easier to follow while keeping the speaker’s natural voice. I’m Niraj Kumar Sharma, a Video Editor Executive at BeastLife. I edit UGC and short-form brand content for teams in India and internationally.',
    exampleProjectIds: [],
    sections: [
      {
        title: 'Build the story around the speaker',
        paragraphs: [
          'Creator footage often includes several takes, pauses and useful details scattered across clips. I select and arrange the material around a clear story: the situation, the product experience and the next step. Supporting shots can explain a feature without covering every moment with graphics.',
          'A testimonial should still mean what the speaker originally said. Edits should preserve that meaning, and any product claims or offer information need your approval. Supplied footage and music also need the appropriate usage rights for the planned use.',
        ],
      },
      {
        title: 'What we can create from your footage',
        items: [
          'A coherent main edit from talking-head clips, demonstrations or unboxing footage.',
          'Readable captions, audio cleanup and supporting product shots where available.',
          'Different opening selections or story structures for an agreed set of variations.',
          'Platform-ready exports with framing and on-screen text suited to the agreed placements.',
        ],
      },
      {
        title: 'Prepare a useful creator handoff',
        paragraphs: [
          'Send the original video files, all usable takes, product footage, the script or talking points and your brand assets. Explain who the video is for, where it will run and which message matters most. Include correct product names, approved claims and any words the captions must preserve.',
          'Tell me whether you want a conversational creator reel, a demonstration or a paid ad. References help communicate pacing and tone, but the edit should fit the footage you actually have. We agree on deliverables, review rounds and deadlines before work begins.',
        ],
      },
      {
        title: 'Review once, then develop variations',
        paragraphs: [
          'We establish the main story in the first cut, then use timestamped feedback to refine it. Approving that direction before making variants helps keep the batch consistent. For ongoing work, label clips by creator and concept, and share one consolidated feedback note so the next batch builds on clear decisions.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Do you find creators or film the UGC?',
        answer: 'This service focuses on editing footage supplied by you or your creators. Creator sourcing and filming are not included in this editing scope.',
      },
      {
        question: 'Can you edit footage recorded on a phone?',
        answer: 'Yes. Share the original files rather than compressed messaging-app copies where possible. Clear audio, steady framing and a few supporting product shots give the edit more options.',
      },
      {
        question: 'Can one creator video become multiple versions?',
        answer: 'Yes, if the material supports it. We can select alternative hooks or reorder a story while preserving the speaker’s meaning and approved claims.',
      },
    ],
    relatedSlug: 'meta-ads-video-editing',
    relatedLabel: 'Explore Meta ads video editing',
  },
];

export function getServicePage(slug) {
  return SERVICE_PAGES.find((service) => service.slug === slug);
}
