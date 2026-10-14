const FOCUS = [
  { title: 'D2C', label: 'Product & offer creatives', icon: 'fas fa-shopping-bag' },
  { title: 'UGC', label: 'Creator footage & testimonials', icon: 'fas fa-mobile-alt' },
  { title: 'Meta Ads', label: 'Hooks & creative variations', icon: 'fas fa-ad' },
  { title: 'Remote', label: 'Brand & agency collaborations', icon: 'fas fa-globe' },
];

export default function Stats() {
  return (
    <section className="stats" id="expertise" aria-label="Editing focus">
      <div className="c stats-grid">
        {FOCUS.map(item => (
          <div className="scard reveal" key={item.title}>
            <i className={item.icon} aria-hidden="true" />
            <div className="snum">{item.title}</div>
            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
