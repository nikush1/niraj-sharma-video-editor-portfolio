'use client';

import { useRef, useState } from 'react';

export default function CopyBrief({ template }) {
  const field = useRef(null);
  const [status, setStatus] = useState('');

  async function copy() {
    try {
      await navigator.clipboard.writeText(field.current.value);
      setStatus('Brief copied. Paste it into your email or project document.');
    } catch {
      field.current.focus();
      field.current.select();
      setStatus('Your brief is selected. Use your device’s Copy command to copy it.');
    }
  }

  return (
    <div>
      <label htmlFor="client-brief">Your editable video ad brief</label>
      <textarea
        className="brief-template"
        id="client-brief"
        ref={field}
        defaultValue={template}
        rows={23}
        spellCheck="true"
        aria-describedby="brief-help"
      />
      <p id="brief-help">Fill in the fields, then copy your brief. Edits stay in this tab and are not saved or sent.</p>
      <div className="detail-actions">
        <button type="button" className="btn btn-primary" onClick={copy}>Copy brief</button>
      </div>
      <p role="status" aria-live="polite">{status}</p>
    </div>
  );
}
