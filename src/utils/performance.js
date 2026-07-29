export function getPerformanceBadgeClass(performance) {
  const value = String(performance || '').toLowerCase();

  if (value.includes('excellent')) return 'performance-excellent';
  if (value.includes('very good')) return 'performance-very-good';
  if (value.includes('good')) return 'performance-good';
  if (value.includes('average')) return 'performance-average';
  return 'performance-needs-improvement';
}
