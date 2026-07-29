export function calculateSgpa(subjects) {
  const normalized = subjects.map((subject) => ({
    name: subject.name || 'Subject',
    credits: clamp(Number(subject.credits), 0, 100),
    gradePoint: clamp(Number(subject.gradePoint), 0, 10),
  }));

  const totalCredits = normalized.reduce((sum, item) => sum + item.credits, 0);
  const totalCreditPoints = normalized.reduce(
    (sum, item) => sum + item.credits * item.gradePoint,
    0,
  );

  const sgpa = totalCredits ? totalCreditPoints / totalCredits : 0;

  return {
    subjects: normalized,
    totalCredits,
    totalCreditPoints: Number(totalCreditPoints.toFixed(2)),
    sgpa: Number(sgpa.toFixed(2)),
    performance: getSgpaPerformance(sgpa),
  };
}

function clamp(value, min, max) {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

export function getSgpaPerformance(sgpa) {
  if (sgpa >= 9) return 'Excellent';
  if (sgpa >= 8) return 'Very Good';
  if (sgpa >= 7) return 'Good';
  if (sgpa >= 6) return 'Average';
  return 'Needs Improvement';
}
