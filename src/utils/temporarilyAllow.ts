import { browser } from 'wxt/browser';
import { updateBlockedWebsites } from './blockedSites';

const TEMP_ALLOW_KEY = 'temporarilyAllowedSites';

interface TemporarilyAllowedSite {
  domain: string;
  expiry: number; // Timestamp in milliseconds
}

// Save temporarily allowed site with expiry
export const saveTemporarilyAllowedSite = async (
  domain: string,
  minutes: number
) => {
  const expiryTime = Date.now() + minutes * 60 * 1000; // Convert minutes to milliseconds
  const newEntry: TemporarilyAllowedSite = { domain, expiry: expiryTime };

  // Get current list from storage
  const storedData = await browser.storage.local.get(TEMP_ALLOW_KEY);
  const existingSites: TemporarilyAllowedSite[] =
    (storedData[TEMP_ALLOW_KEY] as TemporarilyAllowedSite[]) || [];

  // Add new entry and save
  const updatedSites = [...existingSites, newEntry];
  await browser.storage.local.set({ [TEMP_ALLOW_KEY]: updatedSites });

  // Force update the schedule monitor
  await browser.alarms.clear('scheduleMonitor');
  await browser.alarms.create('scheduleMonitor', { periodInMinutes: 1 });
  await updateBlockedWebsites();

  console.log(`Temporarily allowed ${domain} for ${minutes} minutes.`);
};

// Get the list of temporarily allowed sites
export const getTemporarilyAllowedSites = async (): Promise<string[]> => {
  const storedData = await browser.storage.local.get(TEMP_ALLOW_KEY);
  const sites = (storedData[TEMP_ALLOW_KEY] as TemporarilyAllowedSite[]) || [];
  const now = Date.now();
  return sites.filter((site) => site.expiry > now).map((site) => site.domain);
};

// Remove expired entries (can be run periodically)
export const cleanExpiredTemporarilyAllowedSites = async () => {
  // Remove all entries
  await browser.storage.local.remove(TEMP_ALLOW_KEY);
};
