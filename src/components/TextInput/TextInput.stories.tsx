import { Meta, StoryObj } from '@storybook/react';
import TextInput, { type TextInputProps } from './TextInput';

const meta: Meta<typeof TextInput> = {
  title: 'components/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

const defaultProps: TextInputProps = {
  placeholder: 'Placeholder',
  value: '',
  onChange: () => {},
  required: false,
};

export const Default: Story = {
  args: defaultProps,
};
