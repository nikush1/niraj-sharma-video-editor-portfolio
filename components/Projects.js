'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PROJ } from '@/lib/data';

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const [playingId, setPlayingId] = useState(null);

  const filtered = PROJ.filter(p => filter === 'all' || p.c === filter);

  return (
    <section className="projects" id="projects">
      <div className="c">
        <div className="stitle reveal">
          <span className="tag">Portfolio</span>
          <h2>Video Editing Portfolio – Featured Projects</h2>
          <p>Real projects for real brands. Click any card to watch the full video.</p>
          <p className="portfolio-count" aria-live="polite">Showing {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}</p>
        </div>

        <div className="filt-row reveal" role="group" aria-label="Filter projects by format">
          {[
            { key: 'all', label: 'All Projects', cls: '' },
            { key: 'sf',  label: 'Short Form',   cls: ' sf' },
            { key: 'lf',  label: 'Long Form',    cls: ' lf' },
          ].map(f => (
            <button
              key={f.key}
              className={`flt${f.cls}${filter === f.key ? ' on' : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="pg" role="list" aria-label="Portfolio projects">
          {filtered.map((p, i) => (
            <div
              key={p.y}
              className={`pc ${p.c} reveal`}
              style={{ animationDelay: `${i * 0.07}s` }}
              role="listitem"
            >
              {playingId === p.y ? (
                <div className={`pv-thumb ${p.c} pv-playing`}>
                  <iframe
                    src={p.short
                      ? `https://www.youtube.com/embed/${p.y}?autoplay=1&rel=0&modestbranding=1`
                      : `https://www.youtube.com/embed/${p.y}?autoplay=1&rel=0&modestbranding=1`}
                    title={p.t}
                    allowFullScreen
                    allow="autoplay; encrypted-media"
                    style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                  />
                </div>
              ) : (
                <button
                  type="button"
                  className="pv-thumb-btn"
                  aria-label={`Play video: ${p.t}`}
                  onClick={() => setPlayingId(p.y)}
                >
                  <div className={`pv-thumb ${p.c}`}>
                    <Image
                      src={`https://i.ytimg.com/vi/${p.y}/hqdefault.jpg`}
                      alt={`${p.t} – ${p.c === 'sf' ? 'Short-form' : 'Long-form'} video editing by Niraj Kumar Sharma`}
                      width={480}
                      height={p.c === 'sf' ? 854 : 270}
                      loading="lazy"
                    />
                    <div className="pv-thumb-overlay" aria-hidden="true">
                      <div className="pv-play-btn" />
                    </div>
                    <span className={`pbadge ${p.c === 'sf' ? 'bsf' : 'blf'}`}>
                      {p.c === 'sf' ? 'Short Form' : 'Long Form'}
                    </span>
                  </div>
                </button>
              )}
              <div className="pi">
                <h3>{p.t}</h3>
                <div className="pt">{p.tags.map(t => <span key={t}>{t}</span>)}</div>
                <div className="pm">
                  <span><i className="fas fa-eye" aria-hidden="true" />{p.v} views</span>
                  <span><i className="fas fa-clock" aria-hidden="true" />{p.d}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="proj-actions reveal">
          <Link href="/work" className="btn btn-outline">
            Browse all work
          </Link>
        </div>
      </div>
    </section>
  );
}
