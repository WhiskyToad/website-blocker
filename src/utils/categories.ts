export interface ICategory {
    categoryName: string;
    categoryDescription?: string;
    schedule?: ISchedule;
    id: string;
  }
  
  export interface ISchedule {
    days: (keyof typeof DaysOfTheWeek)[];
    startTime: string;
    endTime: string;
  }
  
  const DaysOfTheWeek = {
    Monday: 'Monday',
    Tuesday: 'Tuesday',
    Wednesday: 'Wednesday',
    Thursday: 'Thursday',
    Friday: 'Friday',
    Saturday: 'Saturday',
    Sunday: 'Sunday',
  } as const;
  
  export async function addCategory(category: ICategory): Promise<void> {
    try {
      const categories = await getCategories();
      categories.push(category);
      await chrome.storage.local.set({ categories });
    } catch (error) {
      console.error('Failed to add category:', error);
    }
  }

  export async function deleteCategory(id: string): Promise<void> {
    try {
      const categories = await getCategories();
      const updatedCategories = categories.filter((category) => category.id !== id);
      await chrome.storage.local.set({ categories: updatedCategories });
    } catch (error) {
      console.error('Failed to delete category:', error);
    }
  }
  
  export async function getCategories(): Promise<ICategory[]> {
    try {
      const { categories } = await chrome.storage.local.get('categories');
      return categories || [];
    } catch (error) {
      console.error('Failed to get categories:', error);
      return [];
    }
  }
  
  