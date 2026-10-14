const CONTACT_EMAIL = 'nirajsharma.work@gmail.com';
const ENQUIRY_TYPES = new Set(['Project', 'Monthly retainer', 'Remote role']);
const MAX_BODY_BYTES = 12_000;

function validateSubmission(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { fields: { form: 'Please check your details and try again.' } };
  }

  const fields = {};
  const value = key => typeof body[key] === 'string' ? body[key].trim() : '';
  const name = value('name');
  const email = value('email');
  const enquiryType = value('enquiryType');
  const message = value('message');
  const budget = value('budget');
  const website = value('website');
  const volume = value('volume');
  const deadline = value('deadline');

  if (value('companyTrap')) fields.form = 'The enquiry could not be processed. Please use the email or WhatsApp options.';
  if (!name || name.length > 100 || /[\r\n]/.test(name)) fields.name = 'Enter a name up to 100 characters.';
  if (
    !email
    || email.length > 254
    || /[\r\n]/.test(email)
    || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/.test(email)
  ) fields.email = 'Enter a valid email address.';
  if (!ENQUIRY_TYPES.has(enquiryType)) fields.enquiryType = 'Choose an enquiry type.';
  if (!message || message.length > 2000) fields.message = 'Add a project description (up to 2,000 characters).';
  if (budget.length > 100) fields.budget = 'Keep the budget under 100 characters.';
  if (volume.length > 100) fields.volume = 'Keep the video volume under 100 characters.';
  if (deadline.length > 100) fields.deadline = 'Keep the timing details under 100 characters.';
  if (website) {
    try {
      const parsed = new URL(website);
      if (!['http:', 'https:'].includes(parsed.protocol) || website.length > 300) {
        fields.website = 'Enter an http or https website address under 300 characters.';
      }
    } catch {
      fields.website = 'Enter a valid http or https website address.';
    }
  }
  if (Object.keys(fields).length) return { fields };

  return {
    data: { name, email, enquiryType, message, budget, website, volume, deadline },
  };
}

async function readBoundedBody(request) {
  const reader = request.body?.getReader();
  if (!reader) return { body: '' };

  const chunks = [];
  let byteLength = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    byteLength += value.byteLength;
    if (byteLength > MAX_BODY_BYTES) {
      await reader.cancel();
      return { tooLarge: true };
    }
    chunks.push(value);
  }

  const bytes = new Uint8Array(byteLength);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return { body: new TextDecoder().decode(bytes) };
}

export async function POST(request) {
  const requestOrigin = request.headers.get('origin');
  if (requestOrigin && requestOrigin !== new URL(request.url).origin) {
    return Response.json({ error: 'cross_origin_request' }, { status: 403 });
  }
  const { body: rawBody, tooLarge } = await readBoundedBody(request);
  if (tooLarge) {
    return Response.json({ error: 'request_too_large' }, { status: 413 });
  }
  if (!request.headers.get('content-type')?.includes('application/json')) {
    return Response.json({ error: 'json_required' }, { status: 415 });
  }

  let body;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return Response.json({ error: 'invalid_json' }, { status: 400 });
  }

  const { data, fields } = validateSubmission(body);
  if (fields) {
    return Response.json({ error: 'validation_failed', fields }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) {
    return Response.json({ error: 'delivery_not_configured' }, { status: 503 });
  }

  const subjectName = data.name.replace(/[\r\n]/g, ' ').slice(0, 100);
  const lines = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Enquiry type: ${data.enquiryType}`,
    data.budget && `Budget: ${data.budget}`,
    data.website && `Company website: ${data.website}`,
    data.volume && `Video volume: ${data.volume}`,
    data.deadline && `Deadline / timing: ${data.deadline}`,
    '',
    'Project description:',
    data.message,
  ].filter(line => line !== false && line !== '');

  let providerResponse;
  try {
    providerResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [CONTACT_EMAIL],
        reply_to: data.email,
        subject: `Portfolio enquiry — ${data.enquiryType} — ${subjectName}`,
        text: lines.join('\n'),
      }),
      cache: 'no-store',
    });
  } catch (error) {
    console.error('Contact email provider request failed:', error.message);
    return Response.json({ error: 'delivery_failed' }, { status: 502 });
  }

  if (!providerResponse.ok) {
    console.error('Contact email provider rejected request with status:', providerResponse.status);
    return Response.json({ error: 'delivery_failed' }, { status: 502 });
  }

  return Response.json({ ok: true }, { status: 200 });
}
