'use client';
import { useRef, useState } from 'react';

const CONTACT_EMAIL = 'nirajsharma.work@gmail.com';
const WHATSAPP_URL = 'https://wa.me/919693574910?text=Hi%20Niraj%2C%20I%20want%20to%20discuss%20video%20editing';
const INITIAL_FORM = {
  name: '',
  email: '',
  enquiryType: '',
  message: '',
  budget: '',
  website: '',
  volume: '',
  deadline: '',
  companyTrap: '',
};

function makeMailto(form) {
  const body = [
    'Hi Niraj,',
    '',
    form.message,
    '',
    `Enquiry: ${form.enquiryType}`,
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    form.budget && `Budget: ${form.budget}`,
    form.website && `Brand / company website: ${form.website}`,
    form.volume && `Video volume: ${form.volume}`,
    form.deadline && `Deadline / timing: ${form.deadline}`,
  ].filter(Boolean).join('\n');
  const subject = `${form.enquiryType || 'Video editing enquiry'} — ${form.name}`.trim();
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function Contact({ headingLevel = 'h2' }) {
  const Heading = headingLevel;
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const submitLock = useRef(false);
  const formRef = useRef(null);

  const handleChange = event => {
    const { name, value } = event.target;
    setForm(current => ({ ...current, [name]: value }));
    setErrors(current => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
    setFormError('');
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (submitLock.current) return;
    const cleaned = Object.fromEntries(Object.entries(form).map(([key, value]) => [key, value.trim()]));
    setForm(cleaned);

    const clientErrors = {};
    if (!cleaned.name) clientErrors.name = 'Please enter your name.';
    if (!cleaned.email) clientErrors.email = 'Please enter your email address.';
    if (!cleaned.enquiryType) clientErrors.enquiryType = 'Please select an enquiry type.';
    if (!cleaned.message) clientErrors.message = 'Please describe your enquiry.';
    if (Object.keys(clientErrors).length) {
      setErrors(clientErrors);
      setFormError('Please complete the required fields.');
      formRef.current?.querySelector(`[name="${Object.keys(clientErrors)[0]}"]`)?.focus();
      return;
    }

    submitLock.current = true;
    setSubmitting(true);
    setErrors({});
    setFormError('');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleaned),
      });
      let result;
      try {
        result = await response.json();
      } catch {
        result = {};
      }

      if (response.ok && result.ok === true) {
        setSubmitted(true);
      } else if (result.error === 'validation_failed') {
        setErrors(result.fields || {});
        setFormError('Please review the highlighted fields and try again.');
      } else if (result.error === 'delivery_not_configured') {
        setFormError('Direct enquiry delivery is not configured yet. Your details are still here—use the email or WhatsApp fallback below.');
      } else {
        setFormError('Your enquiry was not submitted. Your details are still here; please try again or use the email or WhatsApp fallback below.');
      }
    } catch {
      setFormError('We could not reach the enquiry service. Your details are still here; please try again or use the email or WhatsApp fallback below.');
    } finally {
      submitLock.current = false;
      setSubmitting(false);
    }
  };

  const startAnotherEnquiry = () => {
    setForm(INITIAL_FORM);
    setErrors({});
    setFormError('');
    setSubmitted(false);
  };

  const emailFallback = makeMailto(form);

  return (
    <section className="contact" id="contact">
      <div className="c">
        <div className="stitle reveal">
          <span className="tag">LET’S MAKE SOMETHING MOVE</span>
          <Heading>Your next story starts here.</Heading>
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
                <span className="ct-icon" aria-hidden="true"><i className="fas fa-envelope" /></span>
                <span>{CONTACT_EMAIL}</span>
              </a>
              <a
                href="https://www.linkedin.com/in/nirajsharmaeditor"
                target="_blank"
                rel="noopener noreferrer"
                className="ct-link"
              >
                <span className="ct-icon" aria-hidden="true"><i className="fab fa-linkedin-in" /></span>
                <span>linkedin.com/in/nirajsharmaeditor</span>
              </a>
              <a
                href="https://www.instagram.com/itsnirajsharma/"
                target="_blank"
                rel="noopener noreferrer"
                className="ct-link"
              >
                <span className="ct-icon" aria-hidden="true"><i className="fab fa-instagram" /></span>
                <span>@itsnirajsharma</span>
              </a>
            </div>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="wa-btn">
              <i className="fab fa-whatsapp" aria-hidden="true" />
              Chat on WhatsApp
            </a>
          </div>

          <div className="cf reveal">
            {submitted ? (
              <div className="contact-result" role="status" aria-live="polite">
                <h3>Your enquiry was submitted.</h3>
                <p>The email provider accepted your message. I’ll reply to the email address you provided.</p>
                <button type="button" className="btn btn-outline" onClick={startAnotherEnquiry}>Send another enquiry</button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} name="contact" noValidate>
                <p className="contact-form-intro">Tell me a little about what you need. Required fields are marked *.</p>
                <div className="form-row">
                  <div className="fg">
                    <label htmlFor="f-name">Name *</label>
                    <input
                      type="text" id="f-name" name="name" className="fc"
                      placeholder="Your name" required autoComplete="name" maxLength={100}
                      value={form.name} onChange={handleChange}
                      aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'f-name-error' : undefined}
                    />
                    {errors.name && <span className="field-error" id="f-name-error">{errors.name}</span>}
                  </div>
                  <div className="fg">
                    <label htmlFor="f-email">Email *</label>
                    <input
                      type="email" id="f-email" name="email" className="fc"
                      placeholder="you@company.com" required autoComplete="email" maxLength={254}
                      value={form.email} onChange={handleChange}
                      aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'f-email-error' : undefined}
                    />
                    {errors.email && <span className="field-error" id="f-email-error">{errors.email}</span>}
                  </div>
                </div>

                <div className="fg">
                  <label htmlFor="f-enquiry">Enquiry type *</label>
                  <select
                    id="f-enquiry" name="enquiryType" className="fc" required
                    value={form.enquiryType} onChange={handleChange}
                    aria-invalid={Boolean(errors.enquiryType)}
                    aria-describedby={errors.enquiryType ? 'f-enquiry-error' : undefined}
                  >
                    <option value="">Select an enquiry type</option>
                    <option value="Project">A video editing project</option>
                    <option value="Monthly retainer">A monthly editing retainer</option>
                    <option value="Remote role">A remote video editing role</option>
                  </select>
                  {errors.enquiryType && <span className="field-error" id="f-enquiry-error">{errors.enquiryType}</span>}
                </div>

                <div className="fg">
                  <label htmlFor="f-message">Project description *</label>
                  <textarea
                    id="f-message" name="message" className="fc" required maxLength={2000}
                    placeholder="Share your goals, the footage you have and any creative references."
                    value={form.message} onChange={handleChange}
                    aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'f-message-error' : undefined}
                  />
                  {errors.message && <span className="field-error" id="f-message-error">{errors.message}</span>}
                </div>

                <div className="fg">
                  <label htmlFor="f-budget">Budget (optional)</label>
                  <input
                    type="text" id="f-budget" name="budget" className="fc"
                    placeholder="Amount and currency, if known" maxLength={100}
                    value={form.budget} onChange={handleChange}
                    aria-invalid={Boolean(errors.budget)} aria-describedby={errors.budget ? 'f-budget-error' : undefined}
                  />
                  {errors.budget && <span className="field-error" id="f-budget-error">{errors.budget}</span>}
                </div>

                <details className="contact-extra">
                  <summary>Additional details (optional)</summary>
                  <div className="contact-extra-fields">
                    <div className="fg">
                      <label htmlFor="f-website">Brand / company website</label>
                      <input
                        type="url" id="f-website" name="website" className="fc"
                        placeholder="https://yourbrand.com" autoComplete="url" maxLength={300}
                        value={form.website} onChange={handleChange}
                        aria-invalid={Boolean(errors.website)} aria-describedby={errors.website ? 'f-website-error' : undefined}
                      />
                      {errors.website && <span className="field-error" id="f-website-error">{errors.website}</span>}
                    </div>
                    <div className="fg">
                      <label htmlFor="f-volume">Video volume</label>
                      <input
                        type="text" id="f-volume" name="volume" className="fc"
                        placeholder="e.g. 12 edits per month" maxLength={100}
                        value={form.volume} onChange={handleChange}
                        aria-invalid={Boolean(errors.volume)} aria-describedby={errors.volume ? 'f-volume-error' : undefined}
                      />
                      {errors.volume && <span className="field-error" id="f-volume-error">{errors.volume}</span>}
                    </div>
                    <div className="fg">
                      <label htmlFor="f-deadline">Deadline / timing</label>
                      <input
                        type="text" id="f-deadline" name="deadline" className="fc"
                        placeholder="Date or flexible" maxLength={100}
                        value={form.deadline} onChange={handleChange}
                        aria-invalid={Boolean(errors.deadline)} aria-describedby={errors.deadline ? 'f-deadline-error' : undefined}
                      />
                      {errors.deadline && <span className="field-error" id="f-deadline-error">{errors.deadline}</span>}
                    </div>
                  </div>
                </details>

                <div className="contact-honeypot" aria-hidden="true">
                  <label htmlFor="f-company">Leave this field empty</label>
                  <input
                    id="f-company" name="companyTrap" type="text" tabIndex={-1}
                    autoComplete="off" value={form.companyTrap} onChange={handleChange}
                  />
                </div>

                {formError && (
                  <div className="contact-error" role="alert" aria-live="assertive">
                    <p>{formError}</p>
                    <div className="contact-fallbacks">
                      <a className="btn btn-outline" href={emailFallback}>Email Niraj with these details</a>
                      <a className="btn btn-outline" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Use WhatsApp</a>
                    </div>
                  </div>
                )}
                {errors.form && <p className="field-error" role="alert">{errors.form}</p>}

                <button type="submit" className="fsub" disabled={submitting}>
                  {submitting ? 'Submitting…' : 'Send enquiry'}
                </button>
                <p className="contact-privacy-note">
                  Your details are used only to respond to this enquiry. If direct email is unavailable, your entered details stay on this page while you use the email or WhatsApp fallback.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
