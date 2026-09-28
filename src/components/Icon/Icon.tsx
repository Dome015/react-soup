import type { SVGProps } from 'react';

export type IconName = 'plus' | 'minus' | 'close' | 'check' | 'chevronDown' | 'chevronRight' | 'search' | 'menu' | 'more' | 'trash' | 'edit' | 'arrowLeft' | 'arrowRight' | 'sortNone' | 'sortAsc' | 'sortDesc' | 'firstPage' | 'lastPage' | 'alert' | 'info' | 'folder' | 'file' | 'sun' | 'moon' | 'download' | 'filter' | 'user';

const paths: Record<IconName, React.ReactNode> = {
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  close: <path d="M5 5l14 14M19 5L5 19" />,
  check: <path d="M4 12l5 5L20 6" />,
  chevronDown: <path d="m5 9 7 7 7-7" />,
  chevronRight: <path d="m9 5 7 7-7 7" />,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  more: <><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></>,
  trash: <><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 10v7M14 10v7" /></>,
  edit: <><path d="M4 20h4l11-11-4-4L4 16v4Z" /><path d="m13 7 4 4" /></>,
  arrowLeft: <path d="m12 5-7 7 7 7M5 12h14" />,
  arrowRight: <path d="m12 5 7 7-7 7M19 12H5" />,
  sortNone: <path d="m7 9 5-5 5 5M7 15l5 5 5-5" />,
  sortAsc: <path d="m7 14 5-5 5 5" />,
  sortDesc: <path d="m7 10 5 5 5-5" />,
  firstPage: <path d="M5 5v14m13-14-7 7 7 7" />,
  lastPage: <path d="M19 5v14M6 5l7 7-7 7" />,
  alert: <><path d="M12 3 2 21h20L12 3Z" /><path d="M12 9v5M12 18h.01" /></>,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7h.01" /></>,
  folder: <path d="M3 5h7l2 2h9v12H3V5Z" />,
  file: <path d="M5 3h9l5 5v13H5V3Zm9 0v5h5" />,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2m-3-7-1.5 1.5M6.5 17.5 5 19m0-14 1.5 1.5M17.5 17.5 19 19" /></>,
  moon: <path d="M20 15a8 8 0 0 1-11-11 8 8 0 1 0 11 11Z" />,
  download: <path d="M12 3v12m-5-5 5 5 5-5M4 18v3h16v-3" />,
  filter: <path d="M3 5h18l-7 8v6l-4 2v-8L3 5Z" />,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
};

export function Icon({ name, ...props }: SVGProps<SVGSVGElement> & { name: IconName }) {
  return <svg className="soup-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...props}>{paths[name]}</svg>;
}
