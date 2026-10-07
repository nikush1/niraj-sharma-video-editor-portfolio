// Overlay owners release only their own lock; the last owner restores the page.
const owners = new Set();
let previousOverflow = '';
let lockedBody = null;

export function acquireBodyScrollLock() {
  if (typeof document === 'undefined' || !document.body) return () => {};

  const owner = Symbol('overlay');
  if (owners.size === 0) {
    lockedBody = document.body;
    previousOverflow = lockedBody.style.overflow;
    lockedBody.style.overflow = 'hidden';
  }

  owners.add(owner);
  return () => {
    if (!owners.delete(owner) || owners.size !== 0) return;
    if (lockedBody) {
      lockedBody.style.overflow = previousOverflow;
      lockedBody = null;
    }
    previousOverflow = '';
  };
}
