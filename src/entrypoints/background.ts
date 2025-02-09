import { startScheduleMonitor } from '@/utils/blockedSites';
import { browser } from 'wxt/browser';

export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(() => {
    startScheduleMonitor();
  });

  // Ensure it works when the service worker wakes up
  browser.runtime.onStartup.addListener(() => {
    startScheduleMonitor();
  });
});
