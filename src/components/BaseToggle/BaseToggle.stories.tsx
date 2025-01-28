import { Meta, StoryObj } from '@storybook/react';
import BaseToggle, { type BaseToggleProps } from './BaseToggle';

const meta: Meta<typeof BaseToggle> = {
  title: 'components/BaseToggle',
  component: BaseToggle,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof BaseToggle>;

const defaultProps: BaseToggleProps = {
  checked: false,
  label: 'Label',
  onClick: () => {},
};

export const Default: Story = {
  args: defaultProps,
};
