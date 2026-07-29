export function calculateCutoff({ mathematics, physics, chemistry }) {
  const math = clamp(Number(mathematics), 0, 100);
  const phy = clamp(Number(physics), 0, 100);
  const chem = clamp(Number(chemistry), 0, 100);
  const cutoff = math + phy / 2 + chem / 2;
  const percentage = (cutoff / 200) * 100;
  return {
    mathematics: math,
    physics: phy,
    chemistry: chem,
    cutoff: Number(cutoff.toFixed(2)),
    percentage: Number(percentage.toFixed(2)),
    performance: getCutoffPerformance(percentage),
  };
}

function clamp(value, min, max) {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

export function getCutoffPerformance(percentage) {
  if (percentage >= 90) return 'Excellent';
  if (percentage >= 75) return 'Very Good';
  if (percentage >= 60) return 'Good';
  if (percentage >= 45) return 'Average';
  return 'Needs Improvement';
}
