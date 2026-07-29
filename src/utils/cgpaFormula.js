export function calculateCgpa(semesters) {
  const normalized = semesters.map((semester) => ({
    name: semester.name || 'Semester',
    sgpa: clamp(Number(semester.sgpa), 0, 10),
  }));

  const count = normalized.length;
  const totalSgpa = normalized.reduce((sum, item) => sum + item.sgpa, 0);
  const cgpa = count ? totalSgpa / count : 0;
  const percentage = cgpa * 9.5;

  return {
    semesters: normalized,
    averageCgpa: Number(cgpa.toFixed(2)),
    percentage: Number(percentage.toFixed(2)),
    performance: getCgpaPerformance(cgpa),
  };
}

function clamp(value, min, max) {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

export function getCgpaPerformance(cgpa) {
  if (cgpa >= 9) return 'Excellent';
  if (cgpa >= 8) return 'Very Good';
  if (cgpa >= 7) return 'Good';
  if (cgpa >= 6) return 'Average';
  return 'Needs Improvement';
}
