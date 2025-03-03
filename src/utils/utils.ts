import { browser } from 'wxt/browser';
import { updateBlockedWebsites } from './blockedSites';

export async function getCurrentTabDomain(): Promise<string | null> {
  const tabs = await browser.tabs.query({ active: true, currentWindow: true });

  if (tabs.length === 0 || !tabs[0].url) {
    console.warn('No active tab found or missing URL.');
    return null;
  }

  try {
    const url = new URL(tabs[0].url);
    return url.hostname.replace(/^www\./, ''); // Removes 'www.' prefix if it exists
  } catch (error) {
    console.error('Invalid URL:', error);
    return null;
  }
}
export async function restartScheduleMonitor() {
  await browser.alarms.clear('scheduleMonitor');
  await browser.alarms.create('scheduleMonitor', { periodInMinutes: 0.5 });
  await updateBlockedWebsites();
}
