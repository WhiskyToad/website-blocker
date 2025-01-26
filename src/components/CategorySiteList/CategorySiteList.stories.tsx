import { Meta, StoryObj } from '@storybook/react';
import CategorySiteList, {
  type CategorySiteListProps,
} from './CategorySiteList';

const meta: Meta<typeof CategorySiteList> = {
  title: 'components/CategorySiteList',
  component: CategorySiteList,
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
type Story = StoryObj<typeof CategorySiteList>;

const defaultProps: CategorySiteListProps = {
  blockedSites: ['example.com', 'example.org', 'example.net'],
};

export const Default: Story = {
  args: defaultProps,
};
