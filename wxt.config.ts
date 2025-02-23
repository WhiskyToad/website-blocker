import { defineConfig } from 'wxt';
import react from '@vitejs/plugin-react';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifestVersion: 3,
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
    description:
      'Your one stop solution to block unwanted websites and increase your productivity.',
    version: '1.0.0',
    manifest_version: 3,
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
    browsers: ['chrome', 'firefox'],
    web_accessible_resources: [
      {
        resources: ['blocked.html'],
        matches: ['<all_urls>'],
      },
    ],
    browser_specific_settings: {
      gecko: {
        id: 'stevencraig321@gmail.com',
      },
    },
  },
});
