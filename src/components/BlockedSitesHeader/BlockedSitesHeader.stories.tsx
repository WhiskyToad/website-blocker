import { Meta, StoryObj } from '@storybook/react';
import BlockedSitesHeader, {
  type BlockedSitesHeaderProps,
} from './BlockedSitesHeader';

const meta: Meta<typeof BlockedSitesHeader> = {
  title: 'components/BlockedSitesHeader',
  component: BlockedSitesHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof BlockedSitesHeader>;

const defaultProps: BlockedSitesHeaderProps = {
  onAddCategory: () => {},
};

export const Default: Story = {
  args: defaultProps,
};
