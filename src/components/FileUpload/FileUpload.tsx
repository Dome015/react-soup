import { forwardRef, type InputHTMLAttributes } from 'react';
import { cx } from '../shared';

export type FileUploadProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'defaultValue'>;

export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(function FileUpload({ className, ...props }, ref) {
  return <input ref={ref} type="file" className={cx('soup-file-upload', className)} {...props} />;
});
