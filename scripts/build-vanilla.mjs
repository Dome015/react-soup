import { readdir, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { build } from 'esbuild';

const source = 'src/vanilla';
const examples = await readdir(join(source, 'examples'), { withFileTypes: true });
const entryPoints = [
  { in: join(source, 'behavior.ts'), out: 'behavior' },
  { in: join(source, 'stories/chart-from-data.ts'), out: 'stories/chart-from-data' },
  { in: join(source, 'stories/gallery.ts'), out: 'stories/gallery' },
];

for (const example of examples) {
  if (!example.isDirectory()) continue;
  const files = await readdir(join(source, 'examples', example.name));
  if (files.includes('example.ts')) entryPoints.push({
    in: join(source, 'examples', example.name, 'example.ts'),
    out: `examples/${example.name}/example`,
  });
}

await rm(join(source, 'dist'), { recursive: true, force: true });
await build({
  entryPoints,
  outdir: join(source, 'dist'),
  bundle: true,
  splitting: true,
  format: 'esm',
  platform: 'browser',
  target: 'es2022',
  chunkNames: 'chunks/[name]-[hash]',
  logLevel: 'info',
});
