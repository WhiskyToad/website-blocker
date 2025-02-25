import { Meta, StoryObj } from '@storybook/react';
import TemporarilyAllowModalUi, {
  type TemporarilyAllowModalUiProps,
} from './TemporarilyAllowModalUi';

const meta: Meta<typeof TemporarilyAllowModalUi> = {
  title: 'components/TemporarilyAllowModalUi',
  component: TemporarilyAllowModalUi,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof TemporarilyAllowModalUi>;

const defaultProps: TemporarilyAllowModalUiProps = {
  isOpen: true,
  onClose: () => {},
  onChange: () => {},
  getErrors: () => undefined,
  siteName: 'google.com',
  formValues: {
    minutes: '',
  },
};

export const Default: Story = {
  args: defaultProps,
};
