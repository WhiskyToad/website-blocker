import { Meta, StoryObj } from '@storybook/react';
import Category, { type CategoryProps } from './Category';

const meta: Meta<typeof Category> = {
  title: 'components/Category',
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
      categoryHeaderData: {
        categoryName: 'Social Media',
        description: 'Block social media sites to stay focused',
      },
      categorySiteListData: {
        blockedSites: ['facebook.com', 'twitter.com', 'instagram.com'],
      },
    },
    {
      categoryHeaderData: {
        categoryName: 'Entertainment',
        description: 'Block entertainment sites to avoid distractions',
      },
      categorySiteListData: {
        blockedSites: ['youtube.com', 'netflix.com', 'hulu.com'],
      },
    },
  ],
};

export const Default: Story = {
  args: defaultProps,
};
