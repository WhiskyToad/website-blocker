import { browser } from 'wxt/browser';
import { getTemporarilyAllowedSites } from './temporarilyAllow';
import { restartScheduleMonitor } from './utils';

export interface ICategory {
  categoryName: string;
  categoryDescription?: string;
  schedule: ISchedule;
  id: string;
  isEnabled: boolean;
  domains: string[];
}

export interface ISchedule {
  days: (typeof DaysOfTheWeek)[keyof typeof DaysOfTheWeek][];
  intervals: { start: string; end: string }[];
  alwaysOn: boolean;
}

export const DaysOfTheWeek = {
  Monday: 'Monday',
  Tuesday: 'Tuesday',
  Wednesday: 'Wednesday',
  Thursday: 'Thursday',
  Friday: 'Friday',
  Saturday: 'Saturday',
  Sunday: 'Sunday',
} as const;

export type DayOfWeek = (typeof DaysOfTheWeek)[keyof typeof DaysOfTheWeek];
export const daysOfWeekOptions = Object.values(DaysOfTheWeek) as DayOfWeek[];

export async function addCategory(category: ICategory): Promise<void> {
  try {
    const categories = await getCategories();
    categories.push(category);
    await browser.storage.local.set({ categories });
  } catch (error) {
    console.error('Failed to add category:', error);
  }
}

export async function editCategory(category: ICategory): Promise<void> {
  try {
    const categories = await getCategories();
    const updatedCategories = categories.map((cat) => {
      if (cat.id === category.id) {
        return category;
      }
      return cat;
    });
    await browser.storage.local.set({ categories: updatedCategories });
    // Force update the schedule monitor
    await restartScheduleMonitor();
  } catch (error) {
    console.error('Failed to edit category:', error);
  }
}

export async function deleteCategory(id: string): Promise<void> {
  try {
    const categories = await getCategories();
    const updatedCategories = categories.filter(
      (category) => category.id !== id
    );
    await browser.storage.local.set({ categories: updatedCategories });
  } catch (error) {
    console.error('Failed to delete category:', error);
  }
}

export async function getCategories(): Promise<ICategory[]> {
  try {
    const { categories } = await browser.storage.local.get('categories');
    return (categories as ICategory[]) || [];
  } catch (error) {
    console.error('Failed to get categories:', error);
    return [];
  }
}

export async function getActiveDomains(): Promise<string[]> {
  try {
    const categories = await getCategories();
    const currentDay = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
    }) as DayOfWeek;
    const currentTime = new Date().toTimeString().slice(0, 5); // "HH:MM" format

    let activeDomains: string[] = [];

    categories.forEach((category) => {
      if (!category.isEnabled) return;

      if (
        category.schedule.alwaysOn ||
        category.schedule.days.includes(currentDay)
      ) {
        const isWithinSchedule =
          category.schedule.alwaysOn ||
          category.schedule.intervals.some((interval) => {
            return currentTime >= interval.start && currentTime <= interval.end;
          });

        if (isWithinSchedule) {
          activeDomains.push(...category.domains);
        }
      }
    });

    activeDomains = Array.from(new Set(activeDomains)); // Remove duplicates

    const temporarilyAllowedSites = await getTemporarilyAllowedSites();

    const domainsToBlock = activeDomains.filter((domain) => {
      return !temporarilyAllowedSites.includes(domain);
    });

    console.log('Active domains after filtering:', domainsToBlock);
    return activeDomains;
  } catch (error) {
    console.error('Failed to get active domains:', error);
    return [];
  }
}
