export interface IBlockedSite {
  id: number
  domain: string
  actionType: chrome.declarativeNetRequest.RuleActionType
}

export interface ICategory {
  name: string;
  schedule?: ISchedule;
  id: string
}

export const DaysOfTheWeek = {
  Monday: 'Monday',
  Tuesday: 'Tuesday',
  Wednesday: 'Wednesday',
  Thursday: 'Thursday',
  Friday: 'Friday',
  Saturday: 'Saturday',
  Sunday: 'Sunday',
} as const

export interface ISchedule {
  days: (keyof typeof DaysOfTheWeek)[];
  startTime: string;
  endTime: string;
}

export const redirectExtensionPath = '/blocked.html'

function getBlockChromeRule(
  id: number,
  domain: string
): chrome.declarativeNetRequest.Rule {
  return {
    id,
    action: {
      type: chrome.declarativeNetRequest.RuleActionType.REDIRECT,
      redirect: {
        extensionPath: redirectExtensionPath,
      },
    },
    condition: {
      urlFilter: `||${domain}`,
      resourceTypes: [chrome.declarativeNetRequest.ResourceType.MAIN_FRAME],
    },
  }
}

export async function addBlockedSite(domain: string): Promise<void> {
  const existingBlockedSites = await filterBlockedSitesByDomain(domain)
  const blockedSiteId = await getNextBlockedSiteIndex()
  await chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [getBlockChromeRule(blockedSiteId, domain)],
    removeRuleIds: existingBlockedSites.map((site) => site.id),
  })
}

export async function batchAddBlockedSites(domains: string[]) {
  const allBlockedSites = await getBlockedSites()
  const existingSites = allBlockedSites.filter((blockedSite) =>
    domains.includes(blockedSite.domain)
  )
  await chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [],
    removeRuleIds: existingSites.map((site) => site.id),
  })
  const nextBlockedSiteId = await getNextBlockedSiteIndex()
  await chrome.declarativeNetRequest.updateDynamicRules({
    addRules: domains.map((domain, index) => {
      return getBlockChromeRule(nextBlockedSiteId + index, domain)
    }),
  })
}

export async function getNextBlockedSiteIndex(): Promise<number> {
  const blockedSites = await getBlockedSites()
  if (!blockedSites.length) {
    return 1
  }
  const lastBlockedSite = blockedSites.sort((a, b) => a.id - b.id)[blockedSites.length - 1]
  return lastBlockedSite.id + 1
}

export async function filterBlockedSitesByDomain(
  domain: string
): Promise<IBlockedSite[]> {
  if (!domain.trim()) {
    return []
  }
  const blockedSites = await getBlockedSites()
  return blockedSites.filter((site) => site.domain === domain)
}

export async function removeBlockedSite(domain: string): Promise<void> {
  const existingSites = await filterBlockedSitesByDomain(domain)

  if (!existingSites) {
    return
  }
  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: existingSites.map((site) => site.id),
  })
}

export async function getBlockedSites(): Promise<IBlockedSite[]> {
  const rules = await chrome.declarativeNetRequest.getDynamicRules()
  return rules.map(transformChromeRuleToIBlockedSite)
}

export function transformChromeRuleToIBlockedSite(
  rule: chrome.declarativeNetRequest.Rule
): IBlockedSite {
  return {
    id: rule.id,
    domain:
      rule.condition.requestDomains?.[0] ??
      rule.condition.urlFilter?.replace('||', '') ??
      '',
    actionType: rule.action.type,
  }
}

/**
 * CATEGORY FUNCTIONS
 */

export async function addCategory(category: ICategory): Promise<void> {
  const categories = await getCategories();
  categories.push(category);
  await chrome.storage.local.set({ categories });
}

export async function getCategories(): Promise<ICategory[]> {
  const { categories } = await chrome.storage.local.get("categories");
  return categories || [];
}

export async function updateCategory(updatedCategory: ICategory): Promise<void> {
  const categories = await getCategories();
  const index = categories.findIndex((cat) => cat.id === updatedCategory.id);
  if (index !== -1) {
    categories[index] = updatedCategory;
    await chrome.storage.local.set({ categories });
  }
}

export async function removeCategory(categoryID: string): Promise<void> {
  const categories = await getCategories();
  const updatedCategories = categories.filter((cat) => cat.id !== categoryID);
  await chrome.storage.local.set({ categories: updatedCategories });
}
