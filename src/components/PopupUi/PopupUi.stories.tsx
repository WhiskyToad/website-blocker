import { Meta, StoryObj } from '@storybook/react';
import PopupUi, { type PopupUiProps } from './PopupUi';

const meta: Meta<typeof PopupUi> = {
  title: 'components/PopupUi',
  component: PopupUi,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof PopupUi>;

const defaultProps: PopupUiProps = {
  onToggleCategory: () => {},
  onOpenOptions: () => {},
  categories: [
    {
      id: '1',
      categoryName: 'Social Media',
      isEnabled: true,
      domains: ['test.com', 'example.com'],
      schedule: {
        days: [],
        intervals: [],
        alwaysOn: true,
      },
    },
    {
      id: '2',
      categoryName: 'News',
      isEnabled: false,
      domains: ['test.com', 'example.com'],
      schedule: {
        days: [],
        intervals: [],
        alwaysOn: true,
      },
    },
    {
      id: '3',
      categoryName: 'Entertainment',
      isEnabled: true,
      domains: ['test.com', 'example.com'],
      schedule: {
        days: [],
        intervals: [],
        alwaysOn: true,
      },
    },
  ],
};

export const Default: Story = {
  args: defaultProps,
};
