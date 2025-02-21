import { defineConfig } from 'wxt';
import react from '@vitejs/plugin-react';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  vite: () => ({
    plugins: [react()],
    server: {
      port: 3000,
      strictPort: true,
      hmr: {
        port: 3000,
      },
    },
  }),
  srcDir: 'src',
  outDir: 'build',
  manifest: {
    name: 'Block Master',
    permissions: [
      'declarativeNetRequest',
      'storage',
      'activeTab',
      'alarms',
      'declarativeNetRequestWithHostAccess',
      'webRequest',
      'webRequestBlocking',
    ],
    host_permissions: ['<all_urls>'],
    web_accessible_resources: [
      {
        resources: ['/blocked.html'],
        matches: ['<all_urls>'],
      },
    ],
  },
});
