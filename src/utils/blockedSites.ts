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
      redirect: {
        extensionPath: `${redirectExtensionPath}?blockedSite=${domain}`,
      },
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
      getBlockChromeRule(index + 1, site)
    ),
  });
  chrome.declarativeNetRequest.getDynamicRules((rules) => {
    console.log('Active blocking rules:', rules);
  });
};

export function startScheduleMonitor(): void {
  updateBlockedWebsites(); // Initial execution
  chrome.alarms.create('scheduleMonitor', { periodInMinutes: 1 });

  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'scheduleMonitor') {
      updateBlockedWebsites();
    }
  });

  console.log('Schedule monitor started');
}

export async function getBlockedSites(): Promise<IBlockedSite[]> {
  const rules = await chrome.declarativeNetRequest.getDynamicRules();
  return rules.map(transformChromeRuleToIBlockedSite);
}
