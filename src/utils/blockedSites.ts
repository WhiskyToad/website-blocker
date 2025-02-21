import { getActiveDomains } from './categories';
import { browser, type DeclarativeNetRequest } from 'wxt/browser';

export interface IBlockedSite {
  id: number;
  domain: string;
  actionType: DeclarativeNetRequest.RuleActionTypeEnum;
}

export function transformRuleToIBlockedSite(
  rule: DeclarativeNetRequest.Rule
): IBlockedSite {
  return {
    id: rule.id,
    domain: rule.condition.urlFilter?.replace('||', '') ?? '',
    actionType: rule.action.type,
  };
}

export const redirectExtensionPath = '/blocked.html';

// Function to get the block rule for Chrome (Declarative Net Request)
function getBlockRule(id: number, domain: string): DeclarativeNetRequest.Rule {
  return {
    id,
    action: {
      type: 'redirect',
      redirect: {
        extensionPath: `/blocked.html?blockedSite=${encodeURIComponent(domain)}`,
      },
    },
    condition: {
      urlFilter: domain,
      resourceTypes: ['main_frame'],
    },
  };
}

// Function to update blocked websites (Works on both Chrome & Firefox)
const updateBlockedWebsites = async () => {
  const activeDomains = await getActiveDomains();
  if (
    typeof browser !== 'undefined' &&
    browser.webRequest &&
    browser.webRequest.onBeforeRequest
  ) {
    // 🦊 Firefox detected → Use webRequest.onBeforeRequest
    console.log('Using webRequest API for Firefox');

    // Remove any existing listeners to avoid duplication
    browser.webRequest.onBeforeRequest.removeListener(handleFirefoxRedirect);

    // Add new listener to block sites
    browser.webRequest.onBeforeRequest.addListener(
      handleFirefoxRedirect,
      { urls: ['https://www.bbc.co.uk/'] },
      ['blocking']
    );
  } else if (
    typeof chrome !== 'undefined' &&
    chrome.declarativeNetRequest &&
    chrome.declarativeNetRequest.updateDynamicRules
  ) {
    // 🌐 Chrome detected → Use Declarative Net Request (DNR)
    console.log('Using Declarative Net Request API for Chrome');

    const blockedSites = await getBlockedSites();

    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: blockedSites.map((site) => site.id),
      addRules: activeDomains.map((site, index) =>
        getBlockRule(index + 1, site)
      ),
    });
  } else {
    console.error('No supported blocking API found.');
  }
};

// Function to handle Firefox redirection
const handleFirefoxRedirect = (details: any) => {
  console.log('details', details);
  return {
    redirectUrl: `${browser.runtime.getURL('/blocked.html')}?blockedSite=${encodeURIComponent(new URL(details.url).hostname)}`,
  };
};

// Start the schedule monitor
export function startScheduleMonitor(): void {
  updateBlockedWebsites();
  browser.alarms.create('scheduleMonitor', { periodInMinutes: 1 });

  browser.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'scheduleMonitor') {
      updateBlockedWebsites();
    }
  });
}

// Get currently blocked sites
export async function getBlockedSites(): Promise<IBlockedSite[]> {
  const rules = await browser.declarativeNetRequest.getDynamicRules();
  return rules.map(transformRuleToIBlockedSite);
}
