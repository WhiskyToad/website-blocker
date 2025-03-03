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

// Create a persistent alarm to keep the service worker alive
browser.alarms.create('keep-alive', {
  periodInMinutes: 0.3,
  when: Date.now(),
});

browser.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'keep-alive') {
    // Perform a minimal task to keep the service worker active
    console.log('Service worker is alive:', new Date().toISOString());
  }
});
