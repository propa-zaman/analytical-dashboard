"use client"

import {
  ScatterChart as RechartsScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
} from "recharts"

interface ScatterChartProps {
  data: Array<{ x: number; y: number; [key: string]: string | number | boolean }>
  xLabel: string
  yLabel: string
  title?: string
  valueFormatter?: (value: number) => string
}

export function ScatterChart({
  data,
  xLabel,
  yLabel,
  title,
  valueFormatter = (value: number) => value.toString(),
}: ScatterChartProps) {
  return (
    <div className="h-full w-full flex flex-col">
      {title && <h3 className="text-sm font-medium mb-2">{title}</h3>}
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid />
            <XAxis type="number" dataKey="x" name={xLabel} />
            <YAxis type="number" dataKey="y" name={yLabel} />
            <ZAxis type="number" range={[60]} />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              formatter={(value, name) => {
                if (name === yLabel) {
                  return [valueFormatter(Number(value)), name]
                }
                return [value, name]
              }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload
                  return (
                    <div className="bg-white p-2 border rounded shadow-sm">
                      <p className="font-medium">{data.name}</p>
                      <p className="text-sm">
                        {xLabel}: {data.x}
                      </p>
                      <p className="text-sm">
                        {yLabel}: {valueFormatter(data.y)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {data.gender === "M" ? "Male" : "Female"}, {data.maritalStatus}
                      </p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Scatter name="Customers" data={data} fill="#3b82f6" />
          </RechartsScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
