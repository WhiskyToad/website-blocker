import { startScheduleMonitor } from '@/utils/blockedSites';
import { browser } from 'wxt/browser';

export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(() => {
    console.log('Extension installed, starting schedule monitor...');
    startScheduleMonitor();
  });

  // Ensure it works when the service worker wakes up
  browser.runtime.onStartup.addListener(() => {
    console.log('Extension started, restarting schedule monitor...');
    startScheduleMonitor();
  });
});
