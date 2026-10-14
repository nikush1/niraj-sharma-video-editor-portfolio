'use client';
import { useEffect, useRef, useId } from 'react';
import { createPortal } from 'react-dom';
import YouTubePlayer from './YouTubePlayer';
import { acquireBodyScrollLock } from '@/lib/bodyScrollLock';

export default function VideoModal({ video, onClose }) {
  const ref = useRef(null);
  const titleId = useId();
  useEffect(() => {
    const dialog = ref.current;
    const opener = document.activeElement;
    const onCancel = event => { event.preventDefault(); onClose(); };
    if (dialog && !dialog.open) dialog.showModal();
    dialog?.addEventListener('cancel', onCancel);
    const releaseScrollLock = acquireBodyScrollLock();
    return () => {
      dialog?.removeEventListener('cancel', onCancel);
      if (dialog?.open) dialog.close();
      releaseScrollLock();
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    };
  }, [onClose]);
  return createPortal(
    <dialog ref={ref} className="cinema-dialog" aria-labelledby={titleId}
      onKeyDown={event => { if (event.key === 'Escape') { event.preventDefault(); onClose(); } }}
      onClick={event => { if (event.target === ref.current) { ref.current?.close(); onClose(); } }}>
      <div className="cinema-panel">
        <div className="cinema-top"><span className="eyebrow">NOW PLAYING</span><button autoFocus type="button" onClick={onClose} aria-label="Close video">Close <span aria-hidden="true">×</span></button></div>
        <YouTubePlayer videoId={video.y} title={video.t} frameClassName={video.c === 'sf' ? 'cinema-screen portrait-screen' : 'cinema-screen'} />
        <h2 id={titleId}>{video.t}</h2>
      </div>
    </dialog>, document.body
  );
}
