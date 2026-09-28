import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/asyncing/',
  plugins: [react()],
  resolve: {
    alias: { '@asyncing': new URL('./src', import.meta.url).pathname },
  },
});
