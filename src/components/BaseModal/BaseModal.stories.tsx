import { Meta, StoryObj } from '@storybook/react';
import BaseModal, { type BaseModalProps } from './BaseModal';

const meta: Meta<typeof BaseModal> = {
  title: 'components/BaseModal',
  component: BaseModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof BaseModal>;

const defaultProps: BaseModalProps = {
  title: 'Modal Title',
  isOpen: true,
  onClose: () => {},
  children: 'Modal Content',
  submitText: 'Submit',
  onSubmit: () => {},
  showDeleteButton: true,
  onDelete: () => {},
};

export const Default: Story = {
  args: defaultProps,
};
