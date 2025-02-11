import type { Meta,  StoryObj } from '@storybook/react';
import CashFlowChart from './CashFlowChart';

const data = [
  {
    sum: "100",
    issue_date: "2021-01-01",
  },
  {
    sum: "50",
    issue_date: "2021-01-02",
  },
  {
    sum: "1075.9",
    issue_date: "2021-01-03",
  },
];

const meta = {
  title: 'Element/CashFlowChart',
  component: CashFlowChart,
  args: {
    values: []
  },
} satisfies Meta<typeof CashFlowChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const randomInRange = (min: number, max: number) => {
  return Math.random() * (max - min + 1) + min;
};


export const Default: Story = {
  render: () => {
    const randomData = (Array(Math.floor(randomInRange(5, 30))).fill(data).flat() as typeof data);
    const toDateString = (offset: number) => new Date(Date.now() + offset).toISOString().slice(0, 10)
    return (
      <div className="max-w-[375px] w-screen">
        <CashFlowChart values={randomData.map(() => ({
          issue_date: toDateString(randomInRange(-1_000_000_000, 1_000_000_000)),
          sum: randomInRange(-100, 100).toFixed(2)
        }))} />
      </div>
    );
  },
};

export const Uptrend: Story = {
  render: () => (
    <div className="max-w-[375px] w-screen">
      <CashFlowChart values={data.map((it) => ({
        ...it,
        sum: String(Math.abs(parseFloat(it.sum)))
      }))} />
    </div>
  ),
};

export const Downtrend: Story = {
  render: () => (
    <div className="max-w-[375px] w-screen">
      <CashFlowChart values={data.map((it) => ({
        ...it,
        sum: String(-1 * Math.abs(parseFloat(it.sum)))
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
