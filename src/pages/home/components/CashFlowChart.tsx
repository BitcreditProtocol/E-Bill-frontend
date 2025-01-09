import { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import type { Bill } from "@/types/bill";
import { FormattedMessage } from "react-intl";
import CurrencySelector from "./CurrencySelector";
import { RotateCwSquareIcon } from "lucide-react";

type ChartPoint = {
  date: string
  value: number
}

const toChartData = (values: Bill[]) : ChartPoint[] => {
  return values.map((it) => ({
    date: it.issue_date,
    value: parseFloat(it.sum.amount),
  }));
};

type ChashFlowChartProps = {
  values: Bill[]
}

export default function ChashFlowChart({ values }: ChashFlowChartProps) {
  const data = useMemo(() => toChartData(values), [values]);

  return (
    <div className="flex flex-col gap-2 w-full bg-elevation-200 border-[1px] border-divider-50 rounded-lg">
      <div className="flex flex-col gap-1 mt-4 px-4 pb-2 border-b-[1px] border-divider-75">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#1B0F0080]">
            <FormattedMessage
              id="page.chartflow.chart.title"
              defaultMessage="Cash flow"
              description="Chart title for Cash flow chart"
            />
          </span>
          <RotateCwSquareIcon size={16} strokeWidth={1} color="#1B0F00" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              <FormattedMessage
                id="page.chartflow.chart.projection.label"
                defaultMessage="Projection"
                description="Projection label for Cash flow chart"
              />
            </span>
            <div className="flex items-center gap-1">
              <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 6H0L4 0L8 6Z" fill="#5FCE5F"/>
              </svg>
              <span className="text-xs text-[#5FCE5F] font-mono">
                + 2.31%
              </span>
            </div>
          </div>
          <CurrencySelector
            value="BTC"
            onChange={(currency) => {
              console.log(currency);
            }}
          />
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <XAxis dataKey="date" />
          <YAxis orientation="right" tick={({ x, y, payload } : {x :number, y:number, payload: ChartPoint}) => {
            return (<text x={x + 20} y={y + 5} fill="#8D8579" textAnchor="middle" >{payload.value / 1000}k</text>)
          }} />
          <Tooltip cursor={true} isAnimationActive={true} />
          <Line type="step" dataKey="value" stroke="#5FCE5F" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

