import test from 'node:test';
import assert from 'node:assert/strict';
import { PROJ } from '../lib/data.js';
import { SERVICE_PAGES } from '../lib/service-pages.js';

test('portfolio retains all 17 unique YouTube project IDs and features three projects', () => {
  assert.equal(PROJ.length, 17);
  assert.equal(new Set(PROJ.map(project => project.y)).size, 17);
  assert.equal(PROJ.filter(project => project.featured).length, 3);
});

test('project category counts only include explicitly categorised work', () => {
  const count = category => PROJ.filter(project => project.categories?.includes(category)).length;
  assert.equal(count('d2c-meta'), 2);
  assert.equal(count('ugc'), 0);
  assert.equal(count('brand-stories'), 3);
  assert.equal(count('youtube-long'), 4);
});

test('service page examples all point to existing portfolio projects', () => {
  const ids = new Set(PROJ.map(project => project.y));
  for (const service of SERVICE_PAGES) {
    for (const id of service.exampleProjectIds) assert.ok(ids.has(id), `${service.slug} references ${id}`);
  }
  assert.deepEqual(
    SERVICE_PAGES.find(service => service.slug === 'ugc-video-editing').exampleProjectIds,
    [],
    'do not present unverified portfolio work as UGC',
  );
});
