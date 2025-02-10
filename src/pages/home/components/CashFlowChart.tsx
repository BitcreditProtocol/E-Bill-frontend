import { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import type { BillFull } from "@/types/bill";
import { FormattedMessage, FormattedNumber, IntlShape, useIntl } from "react-intl";
import { RotateCwSquareIcon } from "lucide-react";
import CurrencySelector from "./CurrencySelector";

const extrapolate = (values: number[]) => {
  if (values.length < 2) {
    return undefined;
  }
  const xs = values.map((_, i) => i);
  const slope = (values[values.length - 1] - values[values.length - 2]) / (xs[xs.length - 1] - xs[xs.length - 2]);
  const extrapolated = values[values.length - 1] + slope * (values.length - xs[xs.length - 1]);

  return extrapolated;
};

const calcProjectionPercent = (values: number[]) => {
  const base = values.at(values.length - 1);
  if (base === undefined || base === 0) return undefined;

  const extrapolated = extrapolate(values);
  if (extrapolated === undefined) {
    return undefined;
  }
  const percentage = (extrapolated - base) / base * 100;
  return Math.abs(percentage) * (extrapolated < base ? -1 : 1);
};

const formatYAxisLabel = (intl: IntlShape, amount: number) => {
  if (amount > -1_000 && amount < 1_000) {
    return intl.formatNumber(amount, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }
  if (amount > -1_000_000 && amount < 1_000_000) {
    return `${intl.formatNumber(amount / 1_000, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}k`;
  }

  return `${intl.formatNumber(amount / 1_000 / 1_000, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}m`;
};

type ChartPoint = {
  date: string
  value: number
}

const toChartData = (values: Pick<BillFull, 'sum' | 'issue_date'>[]) : ChartPoint[] => {
  const d0 = values.map((it) => ({
    date: it.issue_date,
    ts: Date.parse(it.issue_date),
    value: parseFloat(it.sum),
  })).sort((a, b) => {
    const tsDiff = a.ts - b.ts;
    return tsDiff !== 0 ? tsDiff : a.value - b.value;
  });

  return d0.map((it, index) => ({
    date: it.date,
    value: d0.slice(0, index + 1).reduce((acc, item) => acc + item.value, 0),
  }));
};

const ProjectedValue = ({ value }: { value : number }) => {
  const val = <FormattedNumber 
    value={value}
    minimumFractionDigits={2}
    maximumFractionDigits={2}
    signDisplay="exceptZero"
  />;

  return (<span className="flex items-center gap-1 text-xs font-mono">
    {value === 0 ? (<>
      <span className="text-text-200">{val}%</span>
    </>) : (<>
      <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        {value > 0 ? (<path d="M8 6H0L4 0L8 6Z" fill="#5FCE5F" />) : (<path d="M0 0H8L4 6L0 0Z" fill="#A32B16" />)}
      </svg>
      <span className={value > 0 ? 'text-[#5FCE5F]' : 'text-[#A32B16]'}>
        {val}%
      </span>
    </>)}
  </span>);
};

type CashFlowChartProps = {
  values: Pick<BillFull, 'sum' | 'issue_date'>[]
}

export default function ChashFlowChart({ values }: CashFlowChartProps) {
  const intl = useIntl();
  const data = useMemo(() => toChartData(values), [values]);

  const projection = useMemo(() => {
    const base = data.at(data.length - 1);
    return base !== undefined ? calcProjectionPercent(data.map((it) => it.value)) : undefined;
  }, [data])

  return (
    <div className="flex flex-col gap-2 w-full bg-elevation-200 border-[1px] border-divider-50 rounded-lg">
      <div className="flex flex-col gap-1 mt-4 px-4 pb-2 border-b-[1px] border-divider-75">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-[#1B0F0080]">
            <FormattedMessage
              id="page.chartflow.chart.title"
              defaultMessage="Cash flow"
              description="Chart title for Cash flow chart"
            />
          </span>
          <RotateCwSquareIcon size={16} strokeWidth={1} color="#1B0F00" />
        </div>

        {data.length > 0 && (<div>
          <div className="flex items-center justify-between gap-2">
            {projection !== undefined && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-text-300 font-medium">
                  <FormattedMessage
                    id="page.chartflow.chart.projection.label"
                    defaultMessage="Projection"
                    description="Projection label for Cash flow chart"
                  />
                </span>
                <div>
                  <ProjectedValue value={projection} />
                </div>
              </div>
            )}
            <div className="flex-1"></div>
            <CurrencySelector
              value="BTC"
              onChange={(currency) => {
                console.log(currency);
              }}
            />
          </div>
        </div>)}
      </div>
      {data.length === 0 ? (<div className="flex justify-center p-8 text-xs text-text-200">
        <FormattedMessage
          id="page.chartflow.chart.text_empty"
          defaultMessage="No data available"
          description="Text for empty data in Cash flow chart"
        />
      </div>) : (<>
        <ResponsiveContainer width="100%" height={300} className="text-text-300">
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
              return (<text x={x + 25} y={y + 5} fill="#8D8579" textAnchor="middle" font-size="0.75rem">{formatYAxisLabel(intl, payload.value)}</text>)
            }} />
            <Tooltip cursor={true} isAnimationActive={true} />
            <Line type="step" dataKey="value" stroke="#1B0F00" />
          </LineChart>
        </ResponsiveContainer>
      </>)}
    </div>
  );
}
