"use client"

import { PieChart as RechartsChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

interface PieChartProps {
  data: Array<{ name: string; value: number }>
  title: string
  colors?: string[]
}

export function PieChart({
  data,
  title,
  colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"],
}: PieChartProps) {
  return (
    <div className="h-full w-full flex flex-col">
      <h3 className="text-sm font-medium mb-2">{title}</h3>
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={60}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value}`, "Count"]} />
            <Legend layout="horizontal" verticalAlign="bottom" align="center" />
          </RechartsChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
