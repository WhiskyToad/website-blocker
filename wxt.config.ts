import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-react'],
  vite: () => ({
    plugins: [tailwindcss()],
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
