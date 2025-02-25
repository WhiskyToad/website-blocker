import { Meta, StoryObj } from '@storybook/react';
import AddDomainToCategoryUi, {
  type AddDomainToCategoryUiProps,
} from './AddDomainToCategoryUi';

const meta: Meta<typeof AddDomainToCategoryUi> = {
  title: 'components/AddDomainToCategoryUi',
  component: AddDomainToCategoryUi,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof AddDomainToCategoryUi>;

const defaultProps: AddDomainToCategoryUiProps = {
  categories: [{ categoryId: '1', name: 'Category 1' }],
  selectedCategory: 'Category 1',
  onCategoryChange: () => {},
  onCancel: () => {},
};

export const Default: Story = {
  args: defaultProps,
};
