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

browser.alarms.create('keep-loaded-alarm-0', {
  periodInMinutes: 1,
});
setTimeout(
  () =>
    browser.alarms.create('keep-loaded-alarm-1', {
      periodInMinutes: 1,
    }),
  20000
);
setTimeout(
  () =>
    browser.alarms.create('keep-loaded-alarm-2', {
      periodInMinutes: 1,
    }),
  40000
);
