export function stepDndId(stepId: string): string {
  return `step:${stepId}`;
}
export function fieldDndId(stepId: string, fieldId: string): string {
  return `field:${stepId}:${fieldId}`;
}
export function parseFieldDndId(id: string): {
  stepId: string;
  fieldId: string;
} | null {
  const match = /^field:(.+):(.+)$/.exec(id);
  if (!match) return null;
  return { stepId: match[1], fieldId: match[2] };
}
export function parseStepDndId(id: string): string | null {
  const match = /^step:(.+)$/.exec(id);
  return match ? match[1] : null;
}
