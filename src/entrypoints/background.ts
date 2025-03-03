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

  browser.runtime.onMessage.addListener(
    async (message, _sender, sendResponse) => {
      console.log('Received message:', message);

      //@ts-expect-error - wrong type
      const response = await handleFirefoxBlockedSitesMessage(message);

      // Ensure a response is sent
      sendResponse(response);

      // Returning true keeps the message channel open for async handling
      return true;
    }
  );
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
