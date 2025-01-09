import type { Meta,  StoryObj } from '@storybook/react';
import CashFlowChart from './CashFlowChart';
import { data } from '@/mocks/handlers/bills/list';

const meta = {
  title: 'Element/CashFlowChart',
  component: CashFlowChart,
  args: { 
    values: []
  },
} satisfies Meta<typeof CashFlowChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="max-w-[375px] w-screen">
      <CashFlowChart values={data} />
    </div>
  ),
};


export const Downtrend: Story = {
  render: () => (
    <div className="max-w-[375px] w-screen">
      <CashFlowChart values={data.map((it) => ({
        ...it,
        sum: {...it.sum, amount: String(-1* Math.abs(parseFloat(it.sum.amount))) }
      }))} />
    </div>
  ),
};

export const Empty: Story = {
  render: () => (
    <div className="max-w-[375px] w-screen">
      <CashFlowChart values={[]} />
    </div>
  ),
};
