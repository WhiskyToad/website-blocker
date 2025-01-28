import { Meta, StoryObj } from '@storybook/react';
import NewCategoryModal, { type NewCategoryModalProps } from './NewCategoryModal';

const meta: Meta<typeof NewCategoryModal> = {
  title: 'components/NewCategoryModal',
  component: NewCategoryModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof NewCategoryModal>;

const defaultProps: NewCategoryModalProps = {

};

export const Default: Story = {
  args: defaultProps,
};
