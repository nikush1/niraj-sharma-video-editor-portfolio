'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PROJ } from '@/lib/data';
import YouTubePlayer from './YouTubePlayer';

export default function Projects({ featured = false, headingLevel = 'h2' }) {
  const Heading = headingLevel;
  const [filter, setFilter] = useState('all');
  const [playingId, setPlayingId] = useState(null);
  const projects = featured ? PROJ.filter(p => p.featured) : PROJ;
  const filtered = projects.filter(p => filter === 'all' || p.c === filter);

  return (
    <section className="projects" id="projects">
      <div className="c">
        <div className="stitle reveal">
          <span className="tag">Selected Work</span>
          <Heading>{featured ? 'A closer look at my edits' : 'Video editing portfolio'}</Heading>
          <p>Brand content, creator reels and longer stories. Pick a video to see the edit.</p>
          <p className="portfolio-count" aria-live="polite">Showing {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}</p>
        </div>
        <div className="filt-row" role="group" aria-label="Filter projects by format">
          {[
            { key: 'all', label: featured ? 'Selected Projects' : 'All Projects' },
            { key: 'sf', label: 'Short Form' },
            { key: 'lf', label: 'Long Form' },
          ].map(f => (
            <button key={f.key} type="button" className={`flt ${f.key}${filter === f.key ? ' on' : ''}`}
              aria-pressed={filter === f.key} onClick={() => { setFilter(f.key); setPlayingId(null); }}>
              {f.label}
            </button>
          ))}
        </div>
        <div className="pg" role="list" aria-label="Portfolio projects">
          {filtered.map(p => (
            <article key={p.y} className={`pc ${p.c}`} role="listitem">
              {playingId === p.y ? (
                <YouTubePlayer key={p.y} videoId={p.y} title={p.t}
                  frameClassName={`pv-thumb ${p.c} pv-playing`} />
              ) : (
                <button type="button" className="pv-thumb-btn" aria-label={`Play video: ${p.t}`} onClick={() => setPlayingId(p.y)}>
                  <div className={`pv-thumb ${p.c}`}>
                    <Image src={`https://i.ytimg.com/vi/${p.y}/hqdefault.jpg`} alt={`${p.t} video preview`}
                      width={480} height={270} loading="lazy" sizes="(max-width: 768px) 92vw, (max-width: 1100px) 45vw, 370px" />
                    <div className="pv-thumb-overlay" aria-hidden="true"><div className="pv-play-btn" /></div>
                    <span className={`pbadge ${p.c === 'sf' ? 'bsf' : 'blf'}`}>{p.c === 'sf' ? 'Short Form' : 'Long Form'}</span>
                  </div>
                </button>
              )}
              <div className="pi">
                <h3>{p.t}</h3>
                <div className="pt">{p.tags.filter(Boolean).map(t => <span key={t}>{t}</span>)}</div>
                {(p.brief || p.contribution || p.result) && <dl className="project-context">
                  {p.brief && <><dt>Brief</dt><dd>{p.brief}</dd></>}
                  {p.contribution && <><dt>My contribution</dt><dd>{p.contribution}</dd></>}
                  {p.result && p.resultVerified && <><dt>Result</dt><dd>{p.result}</dd></>}
                </dl>}
                <div className="pm">
                  {p.v && p.viewsVerified && <span><i className="fas fa-eye" aria-hidden="true" />{p.v} views</span>}
                  {p.d && <span><i className="fas fa-clock" aria-hidden="true" />{p.d}</span>}
                  <a href={`https://www.youtube.com/watch?v=${p.y}`} target="_blank" rel="noopener noreferrer" aria-label={`Watch ${p.t} on YouTube`}>YouTube ↗</a>
                </div>
                {playingId === p.y && <button type="button" className="video-stop" onClick={() => setPlayingId(null)}>Close video</button>}
              </div>
            </article>
          ))}
        </div>
        {featured && <div className="proj-actions"><Link href="/work" className="btn btn-outline">Browse all work →</Link></div>}
      </div>
    </section>
  );
}
