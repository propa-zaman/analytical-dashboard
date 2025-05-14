"use client"

import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

interface LineChartProps {
  data: any[]
  categories: string[]
  index: string
  title?: string
  colors?: string[]
  valueFormatter?: (value: number) => string
}

export function LineChart({
  data,
  categories,
  index,
  title,
  colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"],
  valueFormatter = (value: number) => value.toString(),
}: LineChartProps) {
  return (
    <div className="h-full w-full flex flex-col">
      {title && <h3 className="text-sm font-medium mb-2">{title}</h3>}
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={index} />
            <YAxis />
            <Tooltip formatter={(value) => [valueFormatter(Number(value)), ""]} />
            <Legend />
            {categories.map((category, i) => (
              <Line
                key={category}
                type="monotone"
                dataKey={category}
                stroke={colors[i % colors.length]}
                name={category}
                activeDot={{ r: 8 }}
              />
            ))}
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
