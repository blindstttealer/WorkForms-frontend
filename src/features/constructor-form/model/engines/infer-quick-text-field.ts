import type { InferredQuickTextField } from './infer-quick-text-field.types';
export type { InferredQuickTextField } from './infer-quick-text-field.types';
export function inferQuickTextField(text: string): InferredQuickTextField | null {
  const trimmed = text.trim();
  if (!trimmed) return null;
  const firstLine = trimmed.split('\n')[0]?.trim() ?? '';
  const markdownMatch = firstLine.match(/^(#{1,3})\s+(.+)$/);
  if (markdownMatch) {
    const level = Math.min(4, markdownMatch[1].length + 1) as 2 | 3 | 4;
    return { kind: 'heading', text: markdownMatch[2].trim(), level };
  }
  const lines = trimmed.split('\n').filter((line) => line.trim());
  const isSingleShortLine = lines.length === 1 && firstLine.length > 0 && firstLine.length <= 72;
  const looksLikeHeading =
    isSingleShortLine && !/[.!?…]$/.test(firstLine) && firstLine.split(/\s+/).length <= 12;
  if (looksLikeHeading) {
    return { kind: 'heading', text: firstLine, level: 2 };
  }
  return { kind: 'paragraph', text: trimmed };
}
