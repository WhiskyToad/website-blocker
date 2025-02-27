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

// Function to send message to update Firefox blocked sites
export function updateFirefoxBlockedSites(activeDomains: string[]) {
  if (!browser.runtime?.sendMessage) {
    console.error('⚠️ Firefox runtime API not available');
    return;
  }
  console.log(
    '🔄 Sending message to update Firefox blocked sites:',
    activeDomains
  );
  return browser.runtime.sendMessage({
    type: 'UPDATE_FIREFOX_BLOCKED_SITES',
    domains: activeDomains,
  });
}

// Message handler function for the background script
export function handleFirefoxBlockedSitesMessage(message: {
  type: string;
  domains: string[];
}) {
  if (message.type !== 'UPDATE_FIREFOX_BLOCKED_SITES') return;
  if (!browser.webRequest?.onBeforeRequest) {
    console.error('⚠️ Firefox webRequest API not available');
    return;
  }

  console.log('🔄 Updating Firefox blocked sites:', message.domains);
  console.log(
    browser.webRequest.onBeforeRequest.hasListener(handleFirefoxRedirect),
    'hasListener before remove'
  );

  // Remove existing listener if active
  browser.webRequest.onBeforeRequest.removeListener(handleFirefoxRedirect);

  // Add new listener if there are active domains to block
  if (message.domains.length > 0) {
    browser.webRequest.onBeforeRequest.addListener(
      handleFirefoxRedirect,
      { urls: message.domains.map((site) => `*://*.${site}/*`) },
      ['blocking']
    );
    console.log('✅ Added new listener for domains:', message.domains);
  }
}

function handleFirefoxRedirect(details: WebRequest.OnBeforeRequestDetailsType) {
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

// Controller function
export const updateBlockedWebsites = async () => {
  const activeDomains = await getActiveDomains();
  console.log('activeDomains const', activeDomains);
  if (typeof browser !== 'undefined' && browser.webRequest) {
    console.log('Using Firefox WebRequest API');
    updateFirefoxBlockedSites(activeDomains);
  } else if (typeof chrome !== 'undefined' && chrome.declarativeNetRequest) {
    console.log('Using Chrome DNR API');
    await updateChromeBlockedSites(activeDomains);
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
