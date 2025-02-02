import { Meta, StoryObj } from '@storybook/react';
import CreateScheduleUI, {
  type CreateScheduleUIProps,
} from './CreateScheduleUI';

const meta: Meta<typeof CreateScheduleUI> = {
  title: 'components/CreateScheduleUI',
  component: CreateScheduleUI,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof CreateScheduleUI>;

const defaultProps: CreateScheduleUIProps = {
  onAddInterval: () => {},
  onRemoveInterval: () => {},
  onSetSchedule: () => {},
  onRemoveSchedule: () => {},
};

export const Default: Story = {
  args: defaultProps,
};
