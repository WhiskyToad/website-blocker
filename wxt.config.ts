import { defineConfig } from 'wxt';
import react from '@vitejs/plugin-react';

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: 'chrome',
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
    name: 'Block it out',
    permissions: [
      'declarativeNetRequest',
      'storage',
      'activeTab',
      'alarms',
      'declarativeNetRequestWithHostAccess',
    ],
    host_permissions: ['<all_urls>'],
  },
});
