'use client';
import { useState } from 'react';
import Image from 'next/image';
import YouTubePlayer from './YouTubePlayer';

export default function Reel() {
  const [playing, setPlaying] = useState(false);

  const activate = () => setPlaying(true);

  return (
    <section className="reel" id="demo-reel">
      <div className="c">
        <div className="stitle reveal">
          <span className="tag">Showreel</span>
          <h2>Editing showreel · 2025</h2>
          <p>
            An earlier selection of my short-form and long-form editing. Explore the project gallery for individual videos.
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
              src="/images/reel.jpg"
              alt="Niraj Kumar Sharma Video Editing Showreel 2025"
              width={980}
              height={551}
              loading="lazy"
            />
            <div className="reel-poster-btn">
              <div className="reel-play-circle" aria-hidden="true">
                <i className="fas fa-play" />
              </div>
              <span className="reel-poster-label">Watch Demo Reel</span>
            </div>
          </button>
        ) : (
          <div className="reel-player">
            <YouTubePlayer videoId="b9DFOfJUSyE" frameClassName="video-wrap"
              title="Niraj Kumar Sharma – Video Editor Showreel 2025"
            />
            <button type="button" className="video-stop" onClick={() => setPlaying(false)}>Close showreel</button>
          </div>
        )}
      </div>
    </section>
  );
}
