import path from 'path';
import react from '@vitejs/plugin-react'
import {defineConfig} from 'vite'
import tsconfig from './tsconfig.json';

const SRC_PATH: string = path.resolve(__dirname, 'src');

const parseTsConfigPaths = (paths: Record<string, string[]>): Record<string, string> => {
  const viteConfigAliases: Record<string, string> = {};

  Object.entries(paths).forEach(([alias, paths]) => {
    const aliasPath: string = paths[0].replace(/[^a-zA-Z]/g, '');

    viteConfigAliases[alias] = path.join(SRC_PATH, aliasPath);
  });

  return viteConfigAliases;
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: parseTsConfigPaths(tsconfig.compilerOptions.paths),
  },
})