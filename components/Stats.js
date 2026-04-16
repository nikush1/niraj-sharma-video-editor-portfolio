'use client';
import { useEffect, useRef, useState } from 'react';

function StatCard({ icon, target, suffix, label, delay = 0 }) {
  const [display, setDisplay] = useState(target ? '0' : null);
  const ref = useRef(null);
  const animated = useRef(false);

  useEffect(() => {
    if (!target) return;
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !animated.current) {
        animated.current = true;
        obs.disconnect();
        let n = 0;
        const inc = target / 60;
        const tm = setInterval(() => {
          n += inc;
          if (n >= target) { clearInterval(tm); setDisplay(target + suffix); }
          else setDisplay(Math.floor(n) + suffix);
        }, 30);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, suffix]);

  return (
    <div className="scard reveal" ref={ref} style={{ animationDelay: `${delay}s` }}>
      <i className={icon} aria-hidden="true" />
      <div className="snum">{target ? display : 'Adobe'}</div>
      <p>{label}</p>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="stats" id="stats" aria-label="Key statistics">
      <div className="c">
        <div className="stats-grid">
          <StatCard icon="fas fa-film"     target={100} suffix="+"   label="Projects Completed"    delay={0} />
          <StatCard icon="fas fa-eye"      target={6}   suffix="M+"  label="Total Views Generated" delay={0.08} />
          <StatCard icon="fas fa-handshake" target={80} suffix="+"   label="Happy Clients"         delay={0.16} />
          <StatCard icon="fas fa-trophy"   target={null} suffix=""   label="Certified Editor"      delay={0.24} />
        </div>
      </div>
    </section>
  );
}
