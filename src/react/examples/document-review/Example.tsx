import { useEffect, useRef, useState, type FormEvent } from 'react';
import * as Soup from '../../index';

export type DocumentReviewExampleProps = { multiple?: boolean };

export function DocumentReviewExample({ multiple = false }: DocumentReviewExampleProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const readerRef = useRef<FileReader | null>(null);
  const [selected, setSelected] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [loaded, setLoaded] = useState<number | null>(null);
  const [total, setTotal] = useState(0);
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => () => { readerRef.current?.abort(); }, []);

  const read = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const files = Array.from(inputRef.current?.files ?? []);
    if (files.length === 0) return;
    setBusy(true);
    setComplete(false);
    setError('');
    setLoaded(null);
    const bytes = files.reduce((sum, file) => sum + file.size, 0);
    setTotal(Math.max(1, bytes));
    let completedBytes = 0;
    let fileIndex = 0;
    const next = () => {
      if (fileIndex >= files.length) {
        setLoaded(Math.max(1, bytes));
        setBusy(false);
        setComplete(true);
        readerRef.current = null;
        return;
      }
      const file = files[fileIndex];
      const reader = new FileReader();
      readerRef.current = reader;
      reader.onprogress = progress => { if (progress.lengthComputable) setLoaded(completedBytes + progress.loaded); };
      reader.onload = () => { completedBytes += file.size; fileIndex += 1; setLoaded(completedBytes); next(); };
      reader.onerror = () => { setBusy(false); setError('The file could not be read. Try choosing it again.'); readerRef.current = null; };
      reader.readAsArrayBuffer(file);
    };
    next();
  };

  return <Soup.Container><main className="soup-example-page"><Soup.Stack gap="lg">
    <Soup.Breadcrumbs items={[{ label: 'Home', href: '/' }]} current="Review files" />
    <header><h1>Review files</h1><p className="soup-example-lead">Choose {multiple ? 'one or more files' : 'a file'} and read {multiple ? 'them' : 'it'} locally before sharing.</p></header>
    <Soup.Card><form id="document-review-form" onSubmit={read} aria-busy={busy}><Soup.Stack gap="lg">
      <Soup.Field label={multiple ? 'Documents' : 'Document'} htmlFor="review-file" description={multiple ? 'Choose one or more files to review' : 'Choose a file to review'} error={error}>
        <Soup.FileUpload ref={inputRef} id="review-file" multiple={multiple} required disabled={busy} aria-invalid={!!error} aria-describedby={error ? 'review-file-error' : 'review-file-description'} onChange={event => { setSelected(Array.from(event.currentTarget.files ?? [])); setComplete(false); setLoaded(null); setError(''); }} />
      </Soup.Field>
      <Soup.Inline justify="between" align="center"><span role="status">{selected.length === 0 ? 'Select a file to continue' : `${selected.length} ${selected.length === 1 ? 'file' : 'files'} ready for review`}</span><Soup.Button type="submit" loading={busy} loadingText="Reading…">Read {multiple ? 'files' : 'file'}</Soup.Button></Soup.Inline>
      {(busy || complete) && <Soup.Progress label={complete ? 'Files read' : 'Reading files'} value={loaded ?? undefined} max={total} />}
      {complete && <Soup.Alert tone="success" title="Review complete">{selected.length === 1 ? selected[0].name : `${selected.length} files`} read locally. No files were uploaded.</Soup.Alert>}
    </Soup.Stack></form></Soup.Card>
  </Soup.Stack></main></Soup.Container>;
}
