// import { getBlockedSites } from "@/entrypoints/background";
// import type { IBlockedSite } from "./blockedSites";

// export const redirectExtensionPath = '/blocked.html';

// export async function getNextBlockedSiteIndex(): Promise<number> {
//   try {
//     const blockedSites = await getBlockedSites();
//     if (!blockedSites.length) return 1;
//     const lastBlockedSite = blockedSites.sort((a, b) => a.id - b.id)[blockedSites.length - 1];
//     return lastBlockedSite.id + 1;
//   } catch (error) {
//     console.error('Failed to get next blocked site index:', error);
//     return 1;
//   }
// }

// export function transformChromeRuleToIBlockedSite(
//   rule: chrome.declarativeNetRequest.Rule
// ): IBlockedSite {
//   return {
//     id: rule.id,
//     domain: rule.condition.urlFilter?.replace('||', '') ?? '',
//     actionType: rule.action.type,
//   };
// }

// // Other utility functions
