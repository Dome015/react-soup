export function cx(...values: Array<string | false | undefined | null>): string {
  return values.filter(Boolean).join(' ');
}

export type Size = 'sm' | 'md' | 'lg';
export type Tone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info';
