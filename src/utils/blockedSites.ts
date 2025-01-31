import {
  redirectExtensionPath,
  getNextBlockedSiteIndex,
  transformChromeRuleToIBlockedSite,
} from './utils.ts';

export interface IBlockedSite {
  id: number;
  domain: string;
  actionType: chrome.declarativeNetRequest.RuleActionType;
}

function getBlockChromeRule(
  id: number,
  domain: string
): chrome.declarativeNetRequest.Rule {
  return {
    id,
    action: {
      type: chrome.declarativeNetRequest.RuleActionType.REDIRECT,
      redirect: { extensionPath: redirectExtensionPath },
    },
    condition: {
      urlFilter: `||${domain}`,
      resourceTypes: [chrome.declarativeNetRequest.ResourceType.MAIN_FRAME],
    },
  };
}

export async function addBlockedSite(domain: string): Promise<void> {
  try {
    const existingBlockedSites = await filterBlockedSitesByDomain(domain);
    const blockedSiteId = await getNextBlockedSiteIndex();
    await chrome.declarativeNetRequest.updateDynamicRules({
      addRules: [getBlockChromeRule(blockedSiteId, domain)],
      removeRuleIds: existingBlockedSites.map((site) => site.id),
    });
  } catch (error) {
    console.error('Failed to add blocked site:', error);
  }
}
export async function filterBlockedSitesByDomain(
  domain: string
): Promise<IBlockedSite[]> {
  if (!domain.trim()) {
    return [];
  }
  const blockedSites = await getBlockedSites();
  return blockedSites.filter((site) => site.domain === domain);
}

export async function getBlockedSites(): Promise<IBlockedSite[]> {
  const rules = await chrome.declarativeNetRequest.getDynamicRules();
  return rules.map(transformChromeRuleToIBlockedSite);
}
