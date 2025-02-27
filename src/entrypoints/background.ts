import {
  handleFirefoxBlockedSitesMessage,
  startScheduleMonitor,
} from '@/utils/blockedSites';
import { browser } from 'wxt/browser';

export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(() => {
    startScheduleMonitor();
  });

  // Ensure it works when the service worker wakes up
  browser.runtime.onStartup.addListener(() => {
    startScheduleMonitor();
  });

  //@ts-expect-error - cba typing
  browser.runtime.onMessage.addListener(handleFirefoxBlockedSitesMessage);
});
