'use client';

import { useEffect, useId, useRef, useState } from 'react';

let apiPromise;

// Load once after a visitor opens a video. A failed load can be retried.
function loadPlayerApi() {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (apiPromise) return apiPromise;

  apiPromise = new Promise((resolve, reject) => {
    const previousReady = window.onYouTubeIframeAPIReady;
    let script = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
    const created = !script;
    if (!script) {
      script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
    }
    let settled = false;
    let timeout;
    const finish = error => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      script.removeEventListener('error', onError);
      if (window.onYouTubeIframeAPIReady === onReady) {
        window.onYouTubeIframeAPIReady = previousReady;
      }
      if (error) {
        if (created) script.remove();
        reject(error);
      } else resolve(window.YT);
    };
    const onError = () => finish(new Error('YouTube player API could not load.'));
    const onReady = () => {
      try { previousReady?.(); } catch { /* Do not let another integration stop this player. */ }
      if (window.YT?.Player) finish();
      else onError();
    };
    window.onYouTubeIframeAPIReady = onReady;
    script.addEventListener('error', onError, { once: true });
    timeout = window.setTimeout(onError, 15000);
    if (created) document.head.appendChild(script);
  }).catch(error => {
    apiPromise = undefined;
    throw error;
  });
  return apiPromise;
}

function errorMessage(code) {
  if (code === 100) return 'This video is unavailable on YouTube.';
  if (code === 101 || code === 150) return 'This video cannot be played on this website. Open it on YouTube.';
  if (code === 153) return 'YouTube could not verify this player. Try again or open it on YouTube.';
  return 'The video could not start. Try again or open it on YouTube.';
}

export default function YouTubePlayer({ videoId, title, frameClassName = 'video-wrap' }) {
  const hostRef = useRef(null);
  const instanceId = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const [attempt, setAttempt] = useState(0);
  const [status, setStatus] = useState({ kind: 'waiting' });

  useEffect(() => {
    const host = hostRef.current;
    let cancelled = false;
    let player;
    setStatus({ kind: 'waiting' });
    const timeout = window.setTimeout(() => {
      if (!cancelled) setStatus(current => current.kind === 'waiting' ? { kind: 'slow' } : current);
    }, 12000);

    // The API owns this iframe, not React. It can remove it safely on cleanup.
    // Rendering it first keeps native playback available even if the API fails.
    const iframe = document.createElement('iframe');
    iframe.id = `yt-${instanceId}-${attempt}`;
    iframe.title = title;
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen';
    iframe.allowFullscreen = true;
    const params = new URLSearchParams({
      autoplay: '1', controls: '1', rel: '0', playsinline: '1', enablejsapi: '1',
      origin: window.location.origin,
    });
    iframe.src = `https://www.youtube.com/embed/${encodeURIComponent(videoId)}?${params}`;
    Object.assign(iframe.style, { position: 'absolute', inset: '0', width: '100%', height: '100%', border: '0', display: 'block' });
    host.appendChild(iframe);

    loadPlayerApi().then(YT => {
      if (cancelled || !iframe.isConnected) return;
      player = new YT.Player(iframe.id, {
        events: {
          onStateChange(event) {
            if (cancelled) return;
            if (event.data === 1) {
              window.clearTimeout(timeout);
              setStatus({ kind: 'playing' });
            } else if (event.data === 0 || event.data === 2) {
              setStatus(current => current.kind === 'error' ? current : { kind: 'paused' });
            }
          },
          onError(event) {
            if (cancelled) return;
            window.clearTimeout(timeout);
            setStatus({ kind: 'error', code: event.data });
          },
          onAutoplayBlocked() {
            if (cancelled) return;
            window.clearTimeout(timeout);
            setStatus(current => current.kind === 'error' ? current : { kind: 'paused' });
          },
        },
      });
    }).catch(() => {
      // API availability is not proof of playback failure; retain the iframe.
    });

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
      try { player?.destroy(); } catch { /* The iframe may already have been removed. */ }
      host.replaceChildren();
    };
  }, [videoId, title, instanceId, attempt]);

  const message = status.kind === 'playing' ? ''
    : status.kind === 'error' ? `${errorMessage(status.code)} (Error ${status.code})`
    : status.kind === 'slow' ? 'Taking longer than expected? Try again or watch on YouTube.'
    : 'If playback doesn’t start, press Play in the video.';

  return (
    <div className="yt-player">
      <div ref={hostRef} className={frameClassName} />
      <div className="yt-player-support">
        <p className="yt-player-status" role="status" aria-live="polite" aria-atomic="true">{message}</p>
        <div className="yt-player-actions">
          <button type="button" className="video-retry" onClick={() => setAttempt(current => current + 1)}>Try again</button>
          <a href={`https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`} target="_blank" rel="noopener noreferrer" aria-label={`Watch ${title} on YouTube`}>Watch on YouTube ↗</a>
        </div>
      </div>
    </div>
  );
}
