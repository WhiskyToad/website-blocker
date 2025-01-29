import { Meta, StoryObj } from '@storybook/react';
import EditCategoryModal, {
  type EditCategoryModalProps,
} from './EditCategoryModal';

const meta: Meta<typeof EditCategoryModal> = {
  title: 'components/EditCategoryModal',
  component: EditCategoryModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof EditCategoryModal>;

const defaultProps: EditCategoryModalProps = {
  isOpen: true,
  onClose: () => {},
  onSubmit: () => {},
  categoryName: '',
  description: '',
  onCategoryNameChange: () => {},
  onDescriptionChange: () => {},
  submitText: 'Save Changes',
};

export const Default: Story = {
  args: defaultProps,
};
