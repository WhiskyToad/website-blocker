import { startScheduleMonitor } from '@/utils/blockedSites';
import { browser } from 'wxt/browser';

export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(() => {
    console.log('Extension installed, starting schedule monitor...');
    startScheduleMonitor();
  });
});
