import { defineConfig } from 'wxt';
import react from '@vitejs/plugin-react';

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-react'],
  vite: () => ({
    plugins: [ react()],
  }),
  srcDir: 'src',
  outDir: 'build',
  manifest: {
    name: 'Block it out',
    permissions: [
    "declarativeNetRequest",
    "storage",
    "activeTab"
    ],
    host_permissions: [
      "<all_urls>"
    ]
  }
});
