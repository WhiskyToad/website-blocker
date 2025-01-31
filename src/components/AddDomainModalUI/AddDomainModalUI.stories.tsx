import { Meta, StoryObj } from '@storybook/react';
import AddDomainModalUI, { type AddDomainModalUIProps } from './AddDomainModalUI';

const meta: Meta<typeof AddDomainModalUI> = {
  title: 'components/AddDomainModalUI',
  component: AddDomainModalUI,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof AddDomainModalUI>;

const defaultProps: AddDomainModalUIProps = {

};

export const Default: Story = {
  args: defaultProps,
};
