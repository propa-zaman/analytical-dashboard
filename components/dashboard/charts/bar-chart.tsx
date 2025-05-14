"use client"

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

interface BarChartProps {
  data: Array<{ name: string; value: number }>
  title: string
  color?: string
  valueFormatter?: (value: number) => string
}

export function BarChart({
  data,
  title,
  color = "#3b82f6",
  valueFormatter = (value: number) => value.toString(),
}: BarChartProps) {
  return (
    <div className="h-full w-full flex flex-col">
      <h3 className="text-sm font-medium mb-2">{title}</h3>
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => [valueFormatter(Number(value)), "Value"]} />
            <Legend />
            <Bar dataKey="value" fill={color} name="Value" />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
