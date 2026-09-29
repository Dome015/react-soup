import { useState } from 'react';
import * as Soup from '../index';

export default { title: 'Components/Pagination', component: Soup.Pagination };
export const ManyPages = () => { const [page, setPage] = useState(8); return <Soup.Pagination page={page} pageCount={25} onPageChange={setPage} />; };
export const FewPages = () => { const [page, setPage] = useState(1); return <Soup.Pagination page={page} pageCount={3} onPageChange={setPage} />; };
