import { Meta, StoryObj } from '@storybook/react';
import EditCategoryModaUIl, {
  type EditCategoryModalProps,
} from './EditCategoryModalUI';

const meta: Meta<typeof EditCategoryModaUIl> = {
  title: 'components/EditCategoryModaUIl',
  component: EditCategoryModaUIl,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof EditCategoryModaUIl>;

const defaultProps: EditCategoryModalProps = {
  isOpen: true,
  onClose: () => {},
  onSubmit: () => {},
  onChange: () => {},
  getErrors: () => undefined,
  formValues: {
    categoryName: '',
    description: '',
  },
  submitText: 'Save Changes',
};

export const Default: Story = {
  args: defaultProps,
};
