import { Meta, StoryObj } from '@storybook/react';
import ConfirmDeleteModalUI, {
  type ConfirmDeleteModalUIProps,
} from './ConfirmDeleteModalUI';

const meta: Meta<typeof ConfirmDeleteModalUI> = {
  title: 'components/ConfirmDeleteModalUI',
  component: ConfirmDeleteModalUI,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ConfirmDeleteModalUI>;

const defaultProps: ConfirmDeleteModalUIProps = {
  isOpen: true,
  onClose: () => {},
  onConfirm: () => {},
  title: 'Confirm Delete',
  message: 'Are you sure? This action cannot be undone.',
};

export const Default: Story = {
  args: defaultProps,
};
