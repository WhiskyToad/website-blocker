import { getActiveDomains } from './categories';
import {
  browser,
  type DeclarativeNetRequest,
  type WebRequest,
} from 'wxt/browser';

export interface IBlockedSite {
  id: number;
  domain: string;
  actionType: DeclarativeNetRequest.RuleActionTypeEnum;
}

/*
// Chrome implementation
*/
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
// Chrome implementation
function updateChromeBlockedSites(activeDomains: string[]) {
  if (!chrome.declarativeNetRequest?.updateDynamicRules) {
    console.error('Chrome DNR API not available');
    return;
  }

  return chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: Array.from(
      { length: activeDomains.length },
      (_, i) => i + 1
    ),
    addRules: activeDomains.map((site, index) => ({
      id: index + 1,
      action: {
        type: chrome.declarativeNetRequest.RuleActionType.REDIRECT,
        redirect: {
          extensionPath: `/blocked.html?blockedSite=${encodeURIComponent(site)}`,
        },
      },
      condition: {
        urlFilter: site,
        resourceTypes: [chrome.declarativeNetRequest.ResourceType.MAIN_FRAME],
      },
    })),
  });
}

/**
 * Firefox implementation
 * Firefox does not support the Chrome Declarative Net Request API, so we need to use the WebRequest API
 * This API is more powerful, but also more complex
 *  */
function updateFirefoxBlockedSites(activeDomains: string[]) {
  if (!browser.webRequest?.onBeforeRequest) {
    console.error('Firefox webRequest API not available');
    return;
  }

  browser.webRequest.onBeforeRequest.removeListener(handleFirefoxRedirect);

  if (activeDomains.length) {
    browser.webRequest.onBeforeRequest.addListener(
      handleFirefoxRedirect,
      { urls: activeDomains.map((site) => `*://*.${site}/*`) },
      ['blocking']
    );
  }
}
// Helper function for Firefox redirects
const handleFirefoxRedirect = (
  details: WebRequest.OnBeforeRequestDetailsType
) => {
  const url = new URL(details.url);
  const domain = url.hostname.split('.').slice(-2).join('.');
  return {
    //@ts-expect-error - the type is wrong
    redirectUrl: `${browser.runtime.getURL('/blocked.html')}?blockedSite=${encodeURIComponent(domain)}`,
  };
};

// Controller function
export const updateBlockedWebsites = async () => {
  const activeDomains = await getActiveDomains();

  if (typeof chrome !== 'undefined' && chrome.declarativeNetRequest) {
    console.log('Using Chrome DNR API');
    await updateChromeBlockedSites(activeDomains);
  } else if (typeof browser !== 'undefined' && browser.webRequest) {
    console.log('Using Firefox WebRequest API');
    updateFirefoxBlockedSites(activeDomains);
  } else {
    console.error('No supported blocking API found');
  }
};

/**
 * Helper functions to start the schedule monitor
 * This function is called from the background script
 */
export function startScheduleMonitor(): void {
  console.log('Starting schedule monitor');
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
