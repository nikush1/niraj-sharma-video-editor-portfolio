'use client';
import { useState } from 'react';

const CONTACT_EMAIL = 'nirajsharma.work@gmail.com';
const INITIAL_FORM = {
  name: '', email: '', enquiryType: '', website: '', volume: '', budget: '', deadline: '', message: '',
};

export default function Contact({ headingLevel = 'h2' }) {
  const Heading = headingLevel;
  const [form, setForm] = useState(INITIAL_FORM);
  const [draftReady, setDraftReady] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');
  const isRemoteRole = form.enquiryType === 'Remote role';

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const subject = `${form.enquiryType || 'Video editing enquiry'} — ${form.name}`;
  const emailBody = [
    'Hi Niraj,',
    '',
    form.message,
    '',
    `Enquiry: ${form.enquiryType}`,
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    form.website && `Brand / company website: ${form.website}`,
    !isRemoteRole && form.volume && `Video volume: ${form.volume}`,
    form.budget && `${isRemoteRole ? 'Compensation' : 'Budget'}: ${form.budget}`,
    form.deadline && `${isRemoteRole ? 'Preferred start date' : 'Deadline / start date'}: ${form.deadline}`,
  ].filter(line => line !== false).join('\n');
  const draftText = `To: ${CONTACT_EMAIL}\nSubject: ${subject}\n\n${emailBody}`;
  const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    setCopyStatus('');
    setDraftReady(true);
  };

  const copyDraft = async () => {
    try {
      await navigator.clipboard.writeText(draftText);
      setCopyStatus('Copied. Paste the draft into your email app and send it to Niraj.');
    } catch (_) {
      setCopyStatus('Copy the draft from the text box below and paste it into your email app.');
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="c">
        <div className="stitle reveal">
          <span className="tag">Work Together</span>
          <Heading>Let&apos;s talk about your next creative.</Heading>
        </div>

        <div className="ct-grid">
          <div className="ct-info reveal">
            <h2>For brands, agencies and hiring teams.</h2>
            <p>
              Need D2C ads, UGC edits or a reliable editor for your monthly creative?
              Tell me what you&apos;re building. I&apos;m based in Delhi NCR, India,
              and work with clients internationally.
            </p>
            <p>
              Open to project work, monthly retainers and remote video editing opportunities.
              For an ongoing collaboration, we can start with a scoped paid trial.
            </p>
            <div className="ct-links">
              <a href={`mailto:${CONTACT_EMAIL}`} className="ct-link">
                <div className="ct-icon" aria-hidden="true"><i className="fas fa-envelope" /></div>
                <span>{CONTACT_EMAIL}</span>
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
            </div>
            <a
              href="https://wa.me/919693574910?text=Hi%20Niraj%2C%20I%20want%20to%20discuss%20video%20editing"
              target="_blank"
              rel="noopener noreferrer"
              className="wa-btn"
            >
              <i className="fab fa-whatsapp" style={{ fontSize: '1.25rem' }} aria-hidden="true" />
              Chat on WhatsApp
            </a>
          </div>

          <div className="cf reveal" style={{ animationDelay: '.15s' }}>
            {draftReady ? (
              <div>
                <div role="status" aria-live="polite" style={{ marginBottom: '20px' }}>
                  <h3 style={{ marginBottom: '10px' }}>Your email draft is ready.</h3>
                  <p style={{ color: 'var(--ink3)' }}>
                    Nothing has been sent yet. Open the draft in your email app, review it and send it.
                  </p>
                </div>
                <a href={mailtoUrl} className="fsub">
                  <i className="fas fa-envelope" aria-hidden="true" /> Open email app
                </a>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', margin: '16px 0' }}>
                  <button type="button" className="btn btn-outline" onClick={copyDraft}>Copy draft</button>
                  <button type="button" className="btn btn-outline" onClick={() => setDraftReady(false)}>Edit details</button>
                </div>
                <p role="status" aria-live="polite" style={{ color: 'var(--ink3)', marginBottom: '16px' }}>
                  {copyStatus || 'If your email app does not open, copy the draft below.'}
                </p>
                <div className="fg">
                  <label htmlFor="email-draft">Email draft</label>
                  <textarea id="email-draft" className="fc" readOnly rows={12} value={draftText} />
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} name="contact">
                <div className="form-row">
                  <div className="fg">
                    <label htmlFor="f-name">Name *</label>
                    <input
                      type="text" id="f-name" name="name" className="fc"
                      placeholder="Your name" required autoComplete="name" maxLength={100}
                      value={form.name} onChange={handleChange}
                    />
                  </div>
                  <div className="fg">
                    <label htmlFor="f-email">Email *</label>
                    <input
                      type="email" id="f-email" name="email" className="fc"
                      placeholder="you@company.com" required autoComplete="email" maxLength={254}
                      value={form.email} onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="fg">
                  <label htmlFor="f-enquiry">What are you looking for? *</label>
                  <select
                    id="f-enquiry" name="enquiryType" className="fc" required
                    value={form.enquiryType} onChange={handleChange}
                  >
                    <option value="">Select an enquiry type</option>
                    <option value="Project">A video editing project</option>
                    <option value="Monthly retainer">A monthly editing retainer</option>
                    <option value="Remote role">A remote video editing role</option>
                  </select>
                </div>

                <div className="fg">
                  <label htmlFor="f-website">Brand / company website</label>
                  <input
                    type="url" id="f-website" name="website" className="fc"
                    placeholder="https://yourbrand.com" autoComplete="url" maxLength={300}
                    value={form.website} onChange={handleChange}
                  />
                </div>

                <div className="form-row">
                  {!isRemoteRole && (
                    <div className="fg">
                      <label htmlFor="f-volume">Video volume</label>
                      <input
                        type="text" id="f-volume" name="volume" className="fc"
                        placeholder="e.g. 12 ads per month" maxLength={100}
                        value={form.volume} onChange={handleChange}
                      />
                    </div>
                  )}
                  <div className="fg">
                    <label htmlFor="f-budget">{isRemoteRole ? 'Compensation range' : 'Budget range'}</label>
                    <input
                      type="text" id="f-budget" name="budget" className="fc"
                      placeholder={isRemoteRole ? 'Amount, currency, per month / year' : 'Amount, currency, per project / month'}
                      maxLength={100} value={form.budget} onChange={handleChange}
                    />
                  </div>
                  {isRemoteRole && (
                    <div className="fg">
                      <label htmlFor="f-start">Preferred start date</label>
                      <input
                        type="text" id="f-start" name="deadline" className="fc"
                        placeholder="Date or flexible" maxLength={100}
                        value={form.deadline} onChange={handleChange}
                      />
                    </div>
                  )}
                </div>

                {!isRemoteRole && (
                  <div className="fg">
                    <label htmlFor="f-deadline">Deadline / start date</label>
                    <input
                      type="text" id="f-deadline" name="deadline" className="fc"
                      placeholder="Date or flexible" maxLength={100}
                      value={form.deadline} onChange={handleChange}
                    />
                  </div>
                )}

                <div className="fg">
                  <label htmlFor="f-message">{isRemoteRole ? 'Tell me about the role *' : 'Tell me about your project *'}</label>
                  <textarea
                    id="f-message" name="message" className="fc" required maxLength={2000}
                    placeholder={isRemoteRole
                      ? 'Share the job description, working hours and what your team needs.'
                      : 'Share your goals, the footage you have and any creative references.'}
                    value={form.message} onChange={handleChange}
                  />
                </div>

                <p id="email-note" style={{ color: 'var(--ink3)', fontSize: '.85rem', lineHeight: 1.6, marginBottom: '18px' }}>
                  This prepares an email for you to review and send from your own email app.
                  Fields without * are optional.
                </p>
                <button type="submit" className="fsub" aria-describedby="email-note">
                  <i className="fas fa-envelope" aria-hidden="true" /> Prepare email
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
