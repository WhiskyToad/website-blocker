import { Meta, StoryObj } from '@storybook/react';
import BaseSelect, { type BaseSelectProps } from './BaseSelect';

const meta: Meta<typeof BaseSelect> = {
  title: 'components/BaseSelect',
  component: BaseSelect,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof BaseSelect>;

const defaultProps: BaseSelectProps = {
  options: [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ],
  value: '',
  onChange: () => {},
  label: 'Select an option',
  placeholder: 'Select an option',
  disabled: false,
};

export const Default: Story = {
  args: defaultProps,
};
