import { useState } from 'react';
import * as Soup from '../index';

export default { title: 'Components/FileUpload', component: Soup.FileUpload };

export const Basic = () => {
  const [fileName, setFileName] = useState('No file selected');
  return <Soup.Stack><Soup.Field label="Report attachment" htmlFor="upload-report" description="Choose a PDF or CSV file"><Soup.FileUpload id="upload-report" accept=".pdf,.csv" aria-describedby="upload-report-description" onChange={event => setFileName(event.currentTarget.files?.[0]?.name ?? 'No file selected')} /></Soup.Field><p role="status">{fileName}</p></Soup.Stack>;
};
export const Multiple = () => {
  const [count, setCount] = useState(0);
  return <Soup.Stack><Soup.Field label="Supporting files" htmlFor="upload-multiple" description="Choose more than one file if needed"><Soup.FileUpload id="upload-multiple" multiple aria-describedby="upload-multiple-description" onChange={event => setCount(event.currentTarget.files?.length ?? 0)} /></Soup.Field><p role="status">{count} {count === 1 ? 'file' : 'files'} selected</p></Soup.Stack>;
};
export const States = () => <Soup.Stack><Soup.Field label="Required attachment" htmlFor="upload-error" error="Choose a file before continuing"><Soup.FileUpload id="upload-error" required aria-invalid="true" aria-describedby="upload-error-error" /></Soup.Field><Soup.Field label="Locked attachment" htmlFor="upload-disabled"><Soup.FileUpload id="upload-disabled" disabled /></Soup.Field></Soup.Stack>;
