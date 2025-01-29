import { Meta, StoryObj } from '@storybook/react';
import TextAreaInput, { type TextAreaInputProps } from './TextAreaInput';

const meta: Meta<typeof TextAreaInput> = {
  title: 'components/TextAreaInput',
  component: TextAreaInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof TextAreaInput>;

const defaultProps: TextAreaInputProps = {
  placeholder: 'Enter category description (optional)',
  value: '',
  onChange: () => {},
  required: false,
  label: 'Description',
};

export const Default: Story = {
  args: defaultProps,
};
