import { useState } from 'react';
import { Icon } from '../Icon/Icon';

export type FileTreeNode = { id: string; name: string; kind: 'file' | 'folder'; children?: FileTreeNode[] };
export type FileTreeProps = { nodes: FileTreeNode[]; selectedId?: string; onSelect?: (node: FileTreeNode) => void; label: string };

function Node({ node, selectedId, onSelect }: { node: FileTreeNode; selectedId?: string; onSelect?: (node: FileTreeNode) => void }) {
  const [open, setOpen] = useState(true);
  if (node.kind === 'folder') return <li><details className="soup-file-tree__folder" open={open} onToggle={event => setOpen(event.currentTarget.open)}><summary><Icon name="folder" />{node.name}</summary><ul>{node.children?.map(child => <Node key={child.id} node={child} selectedId={selectedId} onSelect={onSelect} />)}</ul></details></li>;
  return <li><button type="button" className="soup-file-tree__file" aria-current={selectedId === node.id ? 'true' : undefined} onClick={() => onSelect?.(node)}><Icon name="file" />{node.name}</button></li>;
}

export function FileTree({ nodes, selectedId, onSelect, label }: FileTreeProps) {
  return <nav className="soup-file-tree" aria-label={label}><ul>{nodes.map(node => <Node key={node.id} node={node} selectedId={selectedId} onSelect={onSelect} />)}</ul></nav>;
}
