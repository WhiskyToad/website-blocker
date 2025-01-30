import { Meta, StoryObj } from '@storybook/react';
import Category, { type CategoryProps } from './CategoriesUI';

const meta: Meta<typeof Category> = {
  title: 'components/CategoriesUI',
  component: Category,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '800px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Category>;

const defaultProps: CategoryProps = {
  categories: [
    {
      categoryName: 'Category 1',
      categoryDescription: 'Category 1 description',
      id: '1',
    },
    {
      categoryName: 'Category 2',
      categoryDescription: 'Category 2 description',
      id: '2',
    },
  ],
  onDeleteCategory: () => {},
  onAddCategory: () => {},
};

export const Default: Story = {
  args: defaultProps,
};
