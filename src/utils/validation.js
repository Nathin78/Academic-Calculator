export function clampNumber(value, min, max) {
  const parsed = Number(value);
  if (Number.isNaN(parsed)) return min;
  return Math.min(max, Math.max(min, parsed));
}

export function isWithinRange(value, min, max) {
  const parsed = Number(value);
  return !Number.isNaN(parsed) && parsed >= min && parsed <= max;
}

export function safeInputValue(value, fallback = '') {
  return value === null || value === undefined ? fallback : value;
}

export function validateCutoffInputs(inputs) {
  const fields = [
    ['Mathematics', inputs.mathematics],
    ['Physics', inputs.physics],
    ['Chemistry', inputs.chemistry],
  ];
  const invalid = fields.find(([, value]) => !isWithinRange(value, 0, 100));
  return invalid ? `${invalid[0]} must be between 0 and 100.` : '';
}

export function validateSubjects(subjects) {
  if (!subjects.length) return 'Add at least one subject.';
  const invalid = subjects.find(
    (subject) => !subject.name.trim() || !isWithinRange(subject.credits, 0.01, 100) || !isWithinRange(subject.gradePoint, 0, 10),
  );
  if (!invalid) return '';
  if (!invalid.name.trim()) return 'Every subject needs a name.';
  if (!isWithinRange(invalid.credits, 0.01, 100)) return 'Credits must be greater than 0.';
  return 'Grade points must be between 0 and 10.';
}

export function validateSemesters(semesters) {
  if (!semesters.length) return 'Add at least one semester.';
  const invalid = semesters.find(
    (semester) => !semester.name.trim() || !isWithinRange(semester.sgpa, 0, 10),
  );
  if (!invalid) return '';
  if (!invalid.name.trim()) return 'Every semester needs a name.';
  return 'SGPA must be between 0 and 10.';
}
