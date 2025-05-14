"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScatterChart } from "@/components/dashboard/charts/scatter-chart"
import { HeatMap } from "@/components/dashboard/charts/heat-map"
import type { Customer } from "@/lib/data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CorrelationMatrixProps {
  customers: Customer[]
}

export function CorrelationMatrix({ customers }: CorrelationMatrixProps) {
  // Filter customers with income for scatter plot
  const customersWithIncome = customers.filter((c) => c.income > 0)

  // Prepare data for age-income scatter plot
  const ageIncomeData = customersWithIncome.map((customer) => ({
    x: customer.age,
    y: customer.income,
    id: customer.id,
    name: customer.name,
    gender: customer.gender,
    maritalStatus: customer.maritalStatus,
  }))

  // Calculate correlation coefficient between age and income
  const calculateCorrelation = (x: number[], y: number[]): number => {
    const n = x.length
    const sumX = x.reduce((a, b) => a + b, 0)
    const sumY = y.reduce((a, b) => a + b, 0)
    const sumXY = x.reduce((a, b, i) => a + b * y[i], 0)
    const sumX2 = x.reduce((a, b) => a + b * b, 0)
    const sumY2 = y.reduce((a, b) => a + b * b, 0)

    const numerator = n * sumXY - sumX * sumY
    const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY))

    return denominator === 0 ? 0 : numerator / denominator
  }

  const ageValues = customersWithIncome.map((c) => c.age)
  const incomeValues = customersWithIncome.map((c) => c.income)
  const correlation = calculateCorrelation(ageValues, incomeValues)
  const correlationStrength = Math.abs(correlation) < 0.3 ? "weak" : Math.abs(correlation) < 0.7 ? "moderate" : "strong"
  const correlationDirection = correlation > 0 ? "positive" : "negative"

  // Prepare data for heat map
  const divisions = [...new Set(customers.map((c) => c.division))]
  const maritalStatuses = [...new Set(customers.map((c) => c.maritalStatus))]

  const heatMapData = divisions.flatMap((division) =>
    maritalStatuses.map((status) => {
      const matchingCustomers = customers.filter(
        (c) => c.division === division && c.maritalStatus === status && c.income > 0,
      )
      const avgIncome =
        matchingCustomers.length > 0
          ? Math.round(matchingCustomers.reduce((sum, c) => sum + c.income, 0) / matchingCustomers.length)
          : 0
      return {
        x: division,
        y: status,
        value: avgIncome,
      }
    }),
  )

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Age-Income Correlation</CardTitle>
          <CardDescription>
            Exploring the relationship between customer age and income level. The correlation is {correlationStrength}{" "}
            and {correlationDirection} (r = {correlation.toFixed(2)}).
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ScatterChart
            data={ageIncomeData}
            xLabel="Age"
            yLabel="Income"
            valueFormatter={(value) => `$${value.toLocaleString()}`}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Multi-Factor Analysis</CardTitle>
          <CardDescription>Examining relationships between multiple customer attributes</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="heatmap">
            <TabsList className="mb-4">
              <TabsTrigger value="heatmap">Income Heat Map</TabsTrigger>
              <TabsTrigger value="insights">Key Correlations</TabsTrigger>
            </TabsList>
            <TabsContent value="heatmap" className="h-[400px]">
              <HeatMap
                data={heatMapData}
                xLabel="Division"
                yLabel="Marital Status"
                valueFormatter={(value) => `$${value.toLocaleString()}`}
              />
            </TabsContent>
            <TabsContent value="insights">
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="text-lg font-medium">Age-Income Relationship</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    There is a {correlationStrength} {correlationDirection} correlation (r = {correlation.toFixed(2)})
                    between age and income, suggesting that{" "}
                    {correlation > 0 ? "income tends to increase with age" : "income tends to decrease with age"} in
                    this customer dataset.
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="text-lg font-medium">Marital Status and Income</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {(() => {
                      const statusAvgIncome = maritalStatuses.map((status) => {
                        const statusCustomers = customers.filter((c) => c.maritalStatus === status && c.income > 0)
                        return {
                          status,
                          avgIncome:
                            statusCustomers.length > 0
                              ? Math.round(
                                  statusCustomers.reduce((sum, c) => sum + c.income, 0) / statusCustomers.length,
                                )
                              : 0,
                        }
                      })

                      const highest = [...statusAvgIncome].sort((a, b) => b.avgIncome - a.avgIncome)[0]
                      const lowest = statusAvgIncome
                        .filter((s) => s.avgIncome > 0)
                        .sort((a, b) => a.avgIncome - b.avgIncome)[0]

                      return `${highest.status} customers have the highest average income at $${highest.avgIncome.toLocaleString()}, while ${
                        lowest.status
                      } customers have the lowest at $${lowest.avgIncome.toLocaleString()}. This suggests a significant relationship between marital status and income level.`
                    })()}
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="text-lg font-medium">Regional Income Variations</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {(() => {
                      const divisionAvgIncome = divisions.map((division) => {
                        const divisionCustomers = customers.filter((c) => c.division === division && c.income > 0)
                        return {
                          division,
                          avgIncome:
                            divisionCustomers.length > 0
                              ? Math.round(
                                  divisionCustomers.reduce((sum, c) => sum + c.income, 0) / divisionCustomers.length,
                                )
                              : 0,
                        }
                      })

                      const highest = [...divisionAvgIncome].sort((a, b) => b.avgIncome - a.avgIncome)[0]
                      const lowest = divisionAvgIncome
                        .filter((d) => d.avgIncome > 0)
                        .sort((a, b) => a.avgIncome - b.avgIncome)[0]

                      const difference = highest.avgIncome - lowest.avgIncome
                      const percentageDiff = Math.round((difference / lowest.avgIncome) * 100)

                      return `There is a ${percentageDiff}% difference in average income between the highest earning division (${highest.division}) and the lowest (${lowest.division}). This significant regional variation suggests that location is strongly correlated with income levels.`
                    })()}
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
