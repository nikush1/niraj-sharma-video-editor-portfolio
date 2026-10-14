import test from 'node:test';
import assert from 'node:assert/strict';
import { POST } from '../app/api/contact/route.js';

const validSubmission = {
  name: 'A test contact',
  email: 'contact@example.com',
  enquiryType: 'Project',
  message: 'This is a test request. Do not send.',
  budget: 'USD 500',
  website: 'https://example.com',
};

test('contact endpoint rejects invalid input without contacting the provider', async () => {
  const originalFetch = globalThis.fetch;
  const originalKey = process.env.RESEND_API_KEY;
  const originalFrom = process.env.CONTACT_FROM_EMAIL;
  let providerCalled = false;
  process.env.RESEND_API_KEY = 'test-key';
  process.env.CONTACT_FROM_EMAIL = 'Test <test@example.com>';
  globalThis.fetch = async () => {
    providerCalled = true;
    return Response.json({ id: 'test-id' });
  };

  try {
    const response = await POST(new Request('https://example.com/api/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ ...validSubmission, email: 'not-an-email' }),
    }));
    assert.equal(response.status, 400);
    assert.equal(providerCalled, false);
    assert.deepEqual((await response.json()).fields.email, 'Enter a valid email address.');
  } finally {
    globalThis.fetch = originalFetch;
    if (originalKey === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = originalKey;
    if (originalFrom === undefined) delete process.env.CONTACT_FROM_EMAIL;
    else process.env.CONTACT_FROM_EMAIL = originalFrom;
  }
});

test('contact endpoint rejects honeypot submissions', async () => {
  const response = await POST(new Request('https://example.com/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ ...validSubmission, companyTrap: 'bot-filled-value' }),
  }));

  assert.equal(response.status, 400);
  assert.equal((await response.json()).error, 'validation_failed');
});

test('contact endpoint rejects oversized and cross-origin requests', async () => {
  const oversized = await POST(new Request('https://example.com/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ message: 'x'.repeat(13_000) }),
  }));
  assert.equal(oversized.status, 413);

  const crossOrigin = await POST(new Request('https://example.com/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: 'https://attacker.example' },
    body: JSON.stringify(validSubmission),
  }));
  assert.equal(crossOrigin.status, 403);
});

test('contact endpoint reports missing delivery configuration without claiming submission', async () => {
  const originalFetch = globalThis.fetch;
  const originalKey = process.env.RESEND_API_KEY;
  const originalFrom = process.env.CONTACT_FROM_EMAIL;
  let providerCalled = false;
  delete process.env.RESEND_API_KEY;
  delete process.env.CONTACT_FROM_EMAIL;
  globalThis.fetch = async () => {
    providerCalled = true;
    return Response.json({ id: 'test-id' });
  };

  try {
    const response = await POST(new Request('https://example.com/api/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(validSubmission),
    }));
    assert.equal(response.status, 503);
    assert.equal((await response.json()).error, 'delivery_not_configured');
    assert.equal(providerCalled, false);
  } finally {
    globalThis.fetch = originalFetch;
    if (originalKey !== undefined) process.env.RESEND_API_KEY = originalKey;
    if (originalFrom !== undefined) process.env.CONTACT_FROM_EMAIL = originalFrom;
  }
});

test('contact endpoint sends only through a mocked provider and acknowledges provider acceptance', async () => {
  const originalFetch = globalThis.fetch;
  const originalKey = process.env.RESEND_API_KEY;
  const originalFrom = process.env.CONTACT_FROM_EMAIL;
  let sentRequest;
  process.env.RESEND_API_KEY = 'test-key';
  process.env.CONTACT_FROM_EMAIL = 'Test <test@example.com>';
  globalThis.fetch = async (url, options) => {
    sentRequest = { url, options };
    return Response.json({ id: 'mock-provider-accepted' }, { status: 200 });
  };

  try {
    const response = await POST(new Request('https://example.com/api/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(validSubmission),
    }));
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { ok: true });
    assert.equal(sentRequest.url, 'https://api.resend.com/emails');
    assert.equal(sentRequest.options.headers.Authorization, 'Bearer test-key');
    const payload = JSON.parse(sentRequest.options.body);
    assert.deepEqual(payload.to, ['nirajsharma.work@gmail.com']);
    assert.equal(payload.reply_to, validSubmission.email);
    assert.match(payload.text, /This is a test request/);
  } finally {
    globalThis.fetch = originalFetch;
    if (originalKey === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = originalKey;
    if (originalFrom === undefined) delete process.env.CONTACT_FROM_EMAIL;
    else process.env.CONTACT_FROM_EMAIL = originalFrom;
  }
});
