'use client';
import { useState } from 'react';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', projectType: '', message: '',
  });

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate async send (replace with your preferred backend/Netlify Forms/Resend/etc.)
    await new Promise(r => setTimeout(r, 1400));

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ 'form-name': 'contact', ...form }).toString(),
      });
    } catch (_) {}

    setLoading(false);
    setSent(true);
  };

  const reset = () => {
    setSent(false);
    setForm({ name: '', email: '', projectType: '', message: '' });
  };

  return (
    <section className="contact" id="contact">
      <div className="c">
        <div className="stitle reveal">
          <span className="tag">Work Together</span>
          <h2>Hire a Freelance Video Editor in India</h2>
        </div>

        <div className="ct-grid">
          {/* Left info */}
          <div className="ct-info reveal">
            <h2>Got a project in mind?</h2>
            <p>
              Whether you&apos;re a D2C brand, creator, or agency in India, UAE, USA or UK — I&apos;d
              love to hear about your vision. I respond within 24 hours.
            </p>
            <div className="ct-links">
              <a href="mailto:nirajsharma.work@gmail.com" className="ct-link">
                <div className="ct-icon" aria-hidden="true"><i className="fas fa-envelope" /></div>
                <span>nirajsharma.work@gmail.com</span>
              </a>
              <a
                href="https://www.linkedin.com/in/nirajsharmaeditor"
                target="_blank"
                rel="noopener noreferrer"
                className="ct-link"
              >
                <div className="ct-icon" aria-hidden="true"><i className="fab fa-linkedin-in" /></div>
                linkedin.com/in/nirajsharmaeditor
              </a>
              <a
                href="https://www.instagram.com/itsnirajsharma/"
                target="_blank"
                rel="noopener noreferrer"
                className="ct-link"
              >
                <div className="ct-icon" aria-hidden="true"><i className="fab fa-instagram" /></div>
                @itsnirajsharma
              </a>
              <a
                href="https://nirajvisuals.in"
                target="_blank"
                rel="noopener noreferrer"
                className="ct-link"
              >
                <div className="ct-icon" aria-hidden="true"><i className="fas fa-globe" /></div>
                nirajvisuals.in
              </a>
            </div>
            <a
              href="https://wa.me/919693574910?text=Hi%20Niraj%2C%20I%20want%20to%20discuss%20a%20project"
              target="_blank"
              rel="noopener noreferrer"
              className="wa-btn"
            >
              <i className="fab fa-whatsapp" style={{ fontSize: '1.25rem' }} aria-hidden="true" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Right form */}
          <div className="cf reveal" style={{ animationDelay: '.15s' }}>
            {sent ? (
              <div className="smsg" style={{ display: 'block' }} role="alert" aria-live="polite">
                <i className="fas fa-check-circle" aria-hidden="true" />
                <h4>Message Sent!</h4>
                <p>I&apos;ll get back to you within 24 hours.</p>
                <button className="btn btn-primary" style={{ marginTop: '18px' }} onClick={reset}>
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} name="contact" method="POST" noValidate>
                <input type="hidden" name="form-name" value="contact" />
                <p style={{ display: 'none' }}>
                  <label>Don&apos;t fill: <input name="bot-field" /></label>
                </p>

                <div className="form-row">
                  <div className="fg">
                    <label htmlFor="f-name">Name *</label>
                    <input
                      type="text" id="f-name" name="name" className="fc"
                      placeholder="Your name" required autoComplete="name"
                      value={form.name} onChange={handleChange}
                    />
                  </div>
                  <div className="fg">
                    <label htmlFor="f-email">Email *</label>
                    <input
                      type="email" id="f-email" name="email" className="fc"
                      placeholder="your@email.com" required autoComplete="email"
                      value={form.email} onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="fg">
                  <label htmlFor="f-project">Project Type *</label>
                  <select
                    id="f-project" name="projectType" className="fc" required
                    value={form.projectType} onChange={handleChange}
                  >
                    <option value="">Select a service</option>
                    <option value="short-form">Short-Form Video Editing</option>
                    <option value="long-form">Long-Form Video Editing</option>
                    <option value="ad-creative">Ad Creative / Performance Video</option>
                    <option value="thumbnail">YouTube Thumbnail Design</option>
                    <option value="event">Event Coverage Editing</option>
                    <option value="ai">AI-Integrated Production</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="fg">
                  <label htmlFor="f-message">Message *</label>
                  <textarea
                    id="f-message" name="message" className="fc"
                    placeholder="Tell me about your project, goals, and timeline..." required
                    value={form.message} onChange={handleChange}
                  />
                </div>

                <button type="submit" className="fsub" disabled={loading}>
                  {loading
                    ? <><i className="fas fa-spinner fa-spin" aria-hidden="true" /> Sending…</>
                    : <><i className="fas fa-paper-plane" aria-hidden="true" /> Send Message</>
                  }
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
