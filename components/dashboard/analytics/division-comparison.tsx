"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart } from "@/components/dashboard/charts/bar-chart"
import { RadarChart } from "@/components/dashboard/charts/radar-chart"
import type { Customer } from "@/lib/data"
import { useState } from "react"

interface DivisionComparisonProps {
  customers: Customer[]
}

export function DivisionComparison({ customers }: DivisionComparisonProps) {
  const divisions = [...new Set(customers.map((c) => c.division))]
  const [selectedDivisions, setSelectedDivisions] = useState<string[]>(divisions.slice(0, 3))

  const handleDivisionToggle = (division: string) => {
    if (selectedDivisions.includes(division)) {
      setSelectedDivisions(selectedDivisions.filter((d) => d !== division))
    } else {
      setSelectedDivisions([...selectedDivisions, division])
    }
  }

  // Calculate metrics for each division
  const divisionMetrics = divisions.map((division) => {
    const divisionCustomers = customers.filter((c) => c.division === division)
    const customersWithIncome = divisionCustomers.filter((c) => c.income > 0)

    const avgIncome =
      customersWithIncome.length > 0
        ? Math.round(customersWithIncome.reduce((sum, c) => sum + c.income, 0) / customersWithIncome.length)
        : 0

    const avgAge = Math.round(divisionCustomers.reduce((sum, c) => sum + c.age, 0) / divisionCustomers.length)

    const malePercentage = Math.round(
      (divisionCustomers.filter((c) => c.gender === "M").length / divisionCustomers.length) * 100,
    )

    const marriedPercentage = Math.round(
      (divisionCustomers.filter((c) => c.maritalStatus === "Married").length / divisionCustomers.length) * 100,
    )

    return {
      division,
      customerCount: divisionCustomers.length,
      avgIncome,
      avgAge,
      malePercentage,
      marriedPercentage,
    }
  })

  // Prepare data for bar chart
  const avgIncomeByDivision = divisionMetrics
    .filter((d) => selectedDivisions.includes(d.division))
    .map((d) => ({
      name: d.division,
      value: d.avgIncome,
    }))

  // Prepare data for radar chart
  const radarData = selectedDivisions.map((division) => {
    const metrics = divisionMetrics.find((d) => d.division === division)!
    return {
      division,
      "Average Income": metrics.avgIncome / 1000, // Scale down for better visualization
      "Average Age": metrics.avgAge,
      "Male %": metrics.malePercentage,
      "Married %": metrics.marriedPercentage,
      "Customer Count": metrics.customerCount / 5, // Scale down for better visualization
    }
  })

  // Prepare data for division ranking
  const sortedDivisions = [...divisionMetrics].sort((a, b) => b.avgIncome - a.avgIncome)

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Division Comparison</CardTitle>
          <CardDescription>Compare key metrics across different divisions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Select Divisions to Compare:</h3>
            <div className="flex flex-wrap gap-2">
              {divisions.map((division) => (
                <button
                  key={division}
                  onClick={() => handleDivisionToggle(division)}
                  className={`px-3 py-1 text-xs rounded-full ${
                    selectedDivisions.includes(division)
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {division}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="h-[300px]">
              <BarChart
                data={avgIncomeByDivision}
                title="Average Income by Division"
                color="#3b82f6"
                valueFormatter={(value) => `$${value.toLocaleString()}`}
              />
            </div>
            <div className="h-[300px]">
              <RadarChart
                data={radarData}
                categories={["Average Income", "Average Age", "Male %", "Married %", "Customer Count"]}
                index="division"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Division Rankings</CardTitle>
          <CardDescription>How each division ranks across different metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4">Division</th>
                  <th className="text-right py-2 px-4">Customers</th>
                  <th className="text-right py-2 px-4">Avg. Income</th>
                  <th className="text-right py-2 px-4">Avg. Age</th>
                  <th className="text-right py-2 px-4">Male %</th>
                  <th className="text-right py-2 px-4">Married %</th>
                </tr>
              </thead>
              <tbody>
                {sortedDivisions.map((division, index) => (
                  <tr key={division.division} className="border-b">
                    <td className="py-2 px-4 font-medium">
                      {index + 1}. {division.division}
                    </td>
                    <td className="text-right py-2 px-4">{division.customerCount}</td>
                    <td className="text-right py-2 px-4">${division.avgIncome.toLocaleString()}</td>
                    <td className="text-right py-2 px-4">{division.avgAge}</td>
                    <td className="text-right py-2 px-4">{division.malePercentage}%</td>
                    <td className="text-right py-2 px-4">{division.marriedPercentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
