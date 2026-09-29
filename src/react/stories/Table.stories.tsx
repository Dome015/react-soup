import * as Soup from '../index';
import { useState } from 'react';
export default { title: 'Components/Table', component: Soup.Table };

export const Basic = () => (<Soup.Table><Soup.TableHead><Soup.TableRow><Soup.TableHeader>Name</Soup.TableHeader><Soup.TableHeader>Status</Soup.TableHeader></Soup.TableRow></Soup.TableHead><Soup.TableBody><Soup.TableRow><Soup.TableCell>Atlas</Soup.TableCell><Soup.TableCell><Soup.Badge tone="success">Active</Soup.Badge></Soup.TableCell></Soup.TableRow><Soup.TableRow><Soup.TableCell>Orion</Soup.TableCell><Soup.TableCell><Soup.Badge>Draft</Soup.Badge></Soup.TableCell></Soup.TableRow></Soup.TableBody></Soup.Table>);
export const MoreStates = () => (<Soup.Table><caption>Empty project list</caption><Soup.TableBody><Soup.TableRow><Soup.TableCell>No projects yet</Soup.TableCell></Soup.TableRow></Soup.TableBody></Soup.Table>);

const projects = Array.from({ length: 42 }, (_, index) => ({ id: index + 1, name: `Project ${String(index + 1).padStart(2, '0')}`, score: (index * 17) % 100 }));
export const SortAndPaginate = () => {
  const [page, setPage] = useState(1);
  return <Soup.Table columns={[{ id: 'name', header: 'Name', cell: row => row.name, sortValue: row => row.name }, { id: 'score', header: 'Score', cell: row => row.score, sortValue: row => row.score }]} rows={projects} rowKey={row => row.id} pagination={{ page, pageSize: 5, onPageChange: setPage }} aria-label="Projects" />;
};

export const ServerControlled = () => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<Soup.TableSort>(null);
  const ordered = [...projects].sort((a, b) => !sort ? 0 : (sort.field === 'score' ? a.score - b.score : a.name.localeCompare(b.name)) * (sort.direction === 'asc' ? 1 : -1));
  return <Soup.Table columns={[{ id: 'name', header: 'Name', cell: row => row.name, sortable: true }, { id: 'score', header: 'Score', cell: row => row.score, sortable: true }]} rows={ordered.slice((page - 1) * 5, page * 5)} rowKey={row => row.id} sort={sort} onSortChange={setSort} manualSorting pagination={{ page, pageSize: 5, pageCount: Math.ceil(projects.length / 5), onPageChange: setPage }} aria-label="Server controlled projects" />;
};

export const WithoutPaginationFooter = () => <Soup.Stack gap="lg">
  <Soup.Table columns={[{ id: 'name', header: 'Name', cell: row => row.name }]} rows={projects.slice(0, 1)} rowKey={row => row.id} pagination={{ page: 1, pageSize: 5, onPageChange: () => {} }} aria-label="One page of projects" />
  <Soup.Table columns={[{ id: 'name', header: 'Name', cell: (row: { name: string }) => row.name }]} rows={[] as { id: number; name: string }[]} rowKey={row => row.id} pagination={{ page: 1, pageSize: 5, onPageChange: () => {} }} aria-label="No projects" />
</Soup.Stack>;
