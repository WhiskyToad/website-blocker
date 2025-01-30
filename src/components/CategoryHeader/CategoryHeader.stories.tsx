import { Meta, StoryObj } from '@storybook/react';
import CategoryHeader, { type CategoryHeaderProps } from './CategoryHeader';

const meta: Meta<typeof CategoryHeader> = {
  title: 'components/CategoryHeader',
  component: CategoryHeader,
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
type Story = StoryObj<typeof CategoryHeader>;

const defaultProps: CategoryHeaderProps = {
  categoryName: 'Category Name',
  description: 'Description of the category',
  categoryId: '1',
  onDeleteCategory: () => {},
};

export const Default: Story = {
  args: defaultProps,
};
