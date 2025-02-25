import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import AddDomainToCategoryUi from '../../components/AddDomainToCategoryUi/AddDomainToCategoryUi';
import {
  editCategory,
  getCategories,
  type ICategory,
} from '@/utils/categories';
import { getCurrentTabDomain } from '@/utils/utils';

interface CategoryFormData {
  categoryId: string;
  domain: string;
}

const AddDomainToCategory = () => {
  const [categories, setCategories] = useState<Array<ICategory>>([]);

  const { watch, handleSubmit, setValue } = useForm<CategoryFormData>();

  const onSubmit = async (data: CategoryFormData) => {
    const categoryToUpdate = categories.find(
      (category) => category.id === data.categoryId
    );
    const currentDomain = await getCurrentTabDomain();
    if (!categoryToUpdate || !currentDomain) return;

    const updatedCategory = {
      ...categoryToUpdate,
      domains: [...(categoryToUpdate.domains || []), currentDomain],
    };

    await editCategory(updatedCategory);
  };

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getCategories();
        setCategories(result || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AddDomainToCategoryUi
        categories={categories.map((category) => ({
          categoryId: category.id,
          name: category.categoryName,
        }))}
        selectedCategory={watch('categoryId')}
        onCategoryChange={(category) => setValue('categoryId', category)}
        onCancel={() => {}}
      />
    </form>
  );
};

export default AddDomainToCategory;
