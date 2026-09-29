import { useId, type ProgressHTMLAttributes } from 'react';
import { cx } from '../shared';

export type ProgressProps = Omit<ProgressHTMLAttributes<HTMLProgressElement>, 'children' | 'value' | 'max'> & {
  label: string;
  value?: number;
  max?: number;
  showValue?: boolean;
};

export function Progress({ label, value, max = 100, showValue = true, id, className, ...props }: ProgressProps) {
  const generatedId = useId();
  const progressId = id ?? generatedId;
  const safeMax = Number.isFinite(max) && max > 0 ? max : 100;
  const safeValue = value !== undefined && Number.isFinite(value) ? value : undefined;
  const percent = safeValue === undefined ? null : Math.round(Math.min(100, Math.max(0, safeValue / safeMax * 100)));

  return <div className={cx('soup-progress', className)}>
    <div className="soup-progress__heading"><label htmlFor={progressId}>{label}</label>{showValue && percent !== null && <span aria-hidden="true">{percent}%</span>}</div>
    <div className="soup-progress__track"><progress id={progressId} className="soup-progress__bar" value={safeValue} max={safeMax} {...props} />{safeValue === undefined && <span className="soup-progress__indeterminate" aria-hidden="true" />}</div>
  </div>;
}
