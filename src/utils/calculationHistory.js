const MAX_HISTORY_ITEMS = 6;

export function getCalculationHistory(key) {
  if (typeof window === 'undefined') return [];
  try {
    const stored = JSON.parse(localStorage.getItem(key) || '[]');
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

export function addCalculationHistory(key, entry) {
  const next = [entry, ...getCalculationHistory(key)].slice(0, MAX_HISTORY_ITEMS);
  localStorage.setItem(key, JSON.stringify(next));
  return next;
}

export function clearCalculationHistory(key) {
  localStorage.removeItem(key);
}

export async function shareOrCopyResult(title, text) {
  if (navigator.share) {
    await navigator.share({ title, text });
    return 'shared';
  }

  await navigator.clipboard.writeText(text);
  return 'copied';
}
