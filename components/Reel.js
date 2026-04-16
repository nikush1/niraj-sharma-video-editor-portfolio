'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function Reel() {
  const [playing, setPlaying] = useState(false);

  const activate = () => setPlaying(true);

  return (
    <section className="reel" id="demo-reel">
      <div className="c">
        <div className="stitle reveal">
          <span className="tag">Showreel</span>
          <h2>Video Editing Showreel – Best Work of 2025</h2>
          <p>
            A curated showcase of short-form and long-form video editing projects that have collectively
            generated millions of views for D2C brands and creators.
          </p>
        </div>

        {!playing ? (
          <button
            type="button"
            className="reel-poster reveal"
            style={{ animationDelay: '.15s' }}
            aria-label="Play showreel video – Niraj Kumar Sharma Best Work 2025"
            onClick={activate}
          >
            <Image
              src="https://i.ytimg.com/vi/b9DFOfJUSyE/maxresdefault.jpg"
              alt="Niraj Kumar Sharma Video Editing Showreel 2025"
              width={980}
              height={551}
              priority
            />
            <div className="reel-poster-btn">
              <div className="reel-play-circle" aria-hidden="true">
                <i className="fas fa-play" />
              </div>
              <span className="reel-poster-label">Watch Demo Reel</span>
            </div>
          </button>
        ) : (
          <div className="video-wrap">
            <iframe
              src="https://www.youtube.com/embed/b9DFOfJUSyE?controls=1&rel=0&modestbranding=1&autoplay=1"
              title="Niraj Kumar Sharma – Video Editor Showreel 2025"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </div>
    </section>
  );
}
