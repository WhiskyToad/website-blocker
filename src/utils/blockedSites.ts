import { getActiveDomains } from './categories';

export interface IBlockedSite {
  id: number;
  domain: string;
  actionType: chrome.declarativeNetRequest.RuleActionType;
}

export function transformChromeRuleToIBlockedSite(
  rule: chrome.declarativeNetRequest.Rule
): IBlockedSite {
  return {
    id: rule.id,
    domain: rule.condition.urlFilter?.replace('||', '') ?? '',
    actionType: rule.action.type,
  };
}

export const redirectExtensionPath = '/blocked.html';

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
      urlFilter: domain,
      resourceTypes: [chrome.declarativeNetRequest.ResourceType.MAIN_FRAME],
    },
  };
}

const updateBlockedWebsites = async () => {
  //remove all blocked sites
  const blockedSites = await getBlockedSites();
  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: blockedSites.map((site) => site.id),
  });

  //Get all the active domains and add them to the block list
  const activeDomains = await getActiveDomains();
  await chrome.declarativeNetRequest.updateDynamicRules({
    addRules: activeDomains.map((site, index) =>
      getBlockChromeRule(index, site)
    ),
  });
};

export function startScheduleMonitor(): void {
  // Update immediately and then at regular intervals (e.g., every minute)
  updateBlockedWebsites();
  setInterval(updateBlockedWebsites, 60000); // 1-minute interval
}

export async function getBlockedSites(): Promise<IBlockedSite[]> {
  const rules = await chrome.declarativeNetRequest.getDynamicRules();
  return rules.map(transformChromeRuleToIBlockedSite);
}
