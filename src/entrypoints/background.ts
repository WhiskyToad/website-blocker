import {
  handleFirefoxBlockedSitesMessage,
  startScheduleMonitor,
} from '@/utils/blockedSites';
import { browser, type WebRequest } from 'wxt/browser';

export default defineBackground(() => {});

browser.runtime.onInstalled.addListener(() => {
  startScheduleMonitor();
});

// Ensure it works when the service worker wakes up
browser.runtime.onStartup.addListener(() => {
  startScheduleMonitor();
});
export async function updateFirefoxBlockedSites(activeDomains: string[]) {
  await handleFirefoxBlockedSitesMessage(activeDomains);
}

export function handleFirefoxRedirect(
  details: WebRequest.OnBeforeRequestDetailsType
) {
  try {
    const url = new URL(details.url);
    const domainParts = url.hostname.split('.');
    const domain = domainParts.slice(-2).join('.'); // Extract base domain (e.g., example.com)

    //@ts-expect-error - wrong type
    const redirectUrl = `${browser.runtime.getURL('/blocked.html')}?blockedSite=${encodeURIComponent(domain)}`;
    console.log(`🔀 Redirecting ${url.hostname} → ${redirectUrl}`);
    return { redirectUrl };
  } catch (error) {
    console.error('❌ Error handling redirect:', error);
    return {};
  }
}

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
