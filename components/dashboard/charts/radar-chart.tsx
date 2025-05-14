"use client"

import {
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

interface RadarChartProps {
  data: any[]
  categories: string[]
  index: string
  title?: string
  colors?: string[]
}

export function RadarChart({
  data,
  categories,
  index,
  title,
  colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"],
}: RadarChartProps) {
  return (
    <div className="h-full w-full flex flex-col">
      {title && <h3 className="text-sm font-medium mb-2">{title}</h3>}
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsRadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="category" />
            <PolarRadiusAxis angle={30} domain={[0, "auto"]} />
            <Tooltip />
            <Legend />
            {data.map((entry, index) => (
              <Radar
                key={entry[index]}
                name={entry[index]}
                dataKey="value"
                stroke={colors[index % colors.length]}
                fill={colors[index % colors.length]}
                fillOpacity={0.2}
              />
            ))}
            {categories.map((category, i) => (
              <Radar
                key={i}
                name={data[i][index]}
                dataKey={category}
                stroke={colors[i % colors.length]}
                fill={colors[i % colors.length]}
                fillOpacity={0.2}
              />
            ))}
          </RechartsRadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
