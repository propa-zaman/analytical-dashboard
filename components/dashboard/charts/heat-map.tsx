"use client"

interface HeatMapProps {
  data: Array<{ x: string; y: string; value: number }>
  xLabel: string
  yLabel: string
  valueFormatter?: (value: number) => string
}

export function HeatMap({ data, xLabel, yLabel, valueFormatter = (value: number) => value.toString() }: HeatMapProps) {
  // Get unique x and y values
  const xValues = [...new Set(data.map((d) => d.x))]
  const yValues = [...new Set(data.map((d) => d.y))]

  // Find min and max values for color scaling
  const values = data.map((d) => d.value)
  const minValue = Math.min(...values)
  const maxValue = Math.max(...values)

  // Function to get color based on value
  const getColor = (value: number) => {
    // Calculate percentage between min and max
    const percentage = maxValue > minValue ? (value - minValue) / (maxValue - minValue) : 0

    // Blue to red color scale
    const r = Math.round(percentage * 255)
    const b = Math.round((1 - percentage) * 255)
    return `rgb(${r}, 100, ${b})`
  }

  return (
    <div className="w-full h-full">
      <div className="flex justify-between mb-4">
        <h3 className="text-sm font-medium">
          {xLabel} vs {yLabel}
        </h3>
      </div>

      <div className="flex mb-2">
        <div className="w-24"></div>
        <div className="flex-1 flex">
          {xValues.map((x) => (
            <div key={x} className="flex-1 text-center text-xs font-medium">
              {x}
            </div>
          ))}
        </div>
      </div>

      {yValues.map((y) => (
        <div key={y} className="flex mb-1">
          <div className="w-24 text-xs font-medium flex items-center">{y}</div>
          <div className="flex-1 flex">
            {xValues.map((x) => {
              const cell = data.find((d) => d.x === x && d.y === y)
              const value = cell ? cell.value : 0
              return (
                <div
                  key={`${x}-${y}`}
                  className="flex-1 aspect-square flex items-center justify-center text-xs font-medium rounded m-0.5"
                  style={{
                    backgroundColor: getColor(value),
                    color: value > (maxValue - minValue) / 2 + minValue ? "white" : "black",
                  }}
                  title={`${x}, ${y}: ${valueFormatter(value)}`}
                >
                  {value > 0 ? valueFormatter(value) : "-"}
                </div>
              )
            })}
          </div>
        </div>
      ))}

      <div className="flex items-center justify-center mt-4">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: getColor(minValue) }}></div>
          <span className="text-xs ml-1 mr-2">{valueFormatter(minValue)}</span>
        </div>
        <div
          className="w-24 h-2 mx-2 rounded-sm"
          style={{ background: `linear-gradient(to right, ${getColor(minValue)}, ${getColor(maxValue)})` }}
        ></div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: getColor(maxValue) }}></div>
          <span className="text-xs ml-1">{valueFormatter(maxValue)}</span>
        </div>
      </div>
    </div>
  )
}
