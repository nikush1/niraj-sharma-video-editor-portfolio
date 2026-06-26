const REVIEWS = [
  {
    text: '"Niraj is an exceptional editor. During Techstars Startup Weekend Dhamtari, he managed our entire video content — delivering 20+ high-quality edits for social media. His work ethic is unmatched and his visuals perfectly captured the VikaasGarh energy."',
    img: 'https://i.ibb.co/Lzk1R1Y5/Meraj-Meer-Startup-Grind.jpg',
    name: 'Meraj Meer',
    role: 'CEO, VikaasGarh',
    delay: 0,
  },
  {
    text: '"Niraj was an invaluable Core Member and Lead Video Editor for our MSA Club. His technical skills and creative vision significantly boosted our community\'s visibility. Consistently delivered content that perfectly represented our initiatives."',
    img: 'https://i.ibb.co/fYJnY7bQ/1762690695469.jpg',
    name: 'Sayan Karmakar',
    role: 'Azure Student Intern @ Microsoft',
    delay: 0.1,
  },
  {
    text: '"Niraj\'s edits played a key role in engaging our community of 68k followers. He understands pacing, hooks, and Instagram trends — consistently delivering content that performs. A talented creator with a very bright future."',
    img: 'https://i.ibb.co/QFLj1hwX/462060857-1426092761395046-2028504144651116812-n.jpg',
    name: 'Jamshedpurtainment',
    role: 'Instagram Page · 68K Followers',
    delay: 0.2,
  },
];

import Image from 'next/image';

export default function Testimonials() {
  return (
    <section className="testi" id="testimonials">
      <div className="c">
        <div className="stitle reveal">
          <span className="tag">Social Proof</span>
          <h2>Client Reviews – What They Say</h2>
          <p>Honest feedback from real clients who hired Niraj Kumar Sharma as their video editor.</p>
        </div>
        <div className="t-grid" itemScope itemType="https://schema.org/ItemList">
          {REVIEWS.map(r => (
            <div
              className="tc reveal"
              key={r.name}
              style={{ animationDelay: `${r.delay}s` }}
              itemScope
              itemType="https://schema.org/Review"
            >
              <meta itemProp="reviewRating" content="5" />
              <div className="t-stars" aria-label="5 stars">★★★★★</div>
              <p className="t-text" itemProp="reviewBody">{r.text}</p>
              <div className="t-auth">
                <Image src={r.img} alt={`${r.name} review`} width={48} height={48} loading="lazy" />
                <div itemProp="author" itemScope itemType="https://schema.org/Person">
                  <div className="t-name" itemProp="name">{r.name}</div>
                  <div className="t-role">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
