"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart } from "@/components/dashboard/charts/bar-chart"
import type { Customer } from "@/lib/data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface RegionalPerformanceProps {
  customers: Customer[]
  reportDate: string
}

export function RegionalPerformance({ customers, reportDate }: RegionalPerformanceProps) {
  // Get unique divisions
  const divisions = [...new Set(customers.map((c) => c.division))]

  // Calculate metrics for each division
  const divisionMetrics = divisions.map((division) => {
    const divisionCustomers = customers.filter((c) => c.division === division)
    const customersWithIncome = divisionCustomers.filter((c) => c.income > 0)

    const totalCustomers = divisionCustomers.length
    const totalIncome = divisionCustomers.reduce((sum, c) => sum + c.income, 0)
    const avgIncome = customersWithIncome.length > 0 ? Math.round(totalIncome / customersWithIncome.length) : 0
    const avgAge = Math.round(divisionCustomers.reduce((sum, c) => sum + c.age, 0) / totalCustomers)
    const malePercentage = Math.round((divisionCustomers.filter((c) => c.gender === "M").length / totalCustomers) * 100)
    const marriedPercentage = Math.round(
      (divisionCustomers.filter((c) => c.maritalStatus === "Married").length / totalCustomers) * 100,
    )
    const highValuePercentage = Math.round(
      (divisionCustomers.filter((c) => c.income >= 75000).length / totalCustomers) * 100,
    )

    return {
      division,
      totalCustomers,
      totalIncome,
      avgIncome,
      avgAge,
      malePercentage,
      marriedPercentage,
      highValuePercentage,
    }
  })

  // Sort divisions by total income
  const sortedDivisions = [...divisionMetrics].sort((a, b) => b.totalIncome - a.totalIncome)

  // Prepare data for charts
  const customerCountData = divisionMetrics.map((d) => ({
    name: d.division,
    value: d.totalCustomers,
  }))

  const avgIncomeData = divisionMetrics.map((d) => ({
    name: d.division,
    value: d.avgIncome,
  }))

  const highValueData = divisionMetrics.map((d) => ({
    name: d.division,
    value: d.highValuePercentage,
  }))

  // Calculate period-over-period change (simulated)
  const simulatePreviousPeriod = (value: number): number => {
    // Randomly generate a previous value within ±15% of current value
    const changePercentage = (Math.random() * 30 - 15) / 100
    return Math.round(value * (1 - changePercentage))
  }

  const divisionChanges = divisionMetrics.map((d) => {
    const previousTotalCustomers = simulatePreviousPeriod(d.totalCustomers)
    const previousTotalIncome = simulatePreviousPeriod(d.totalIncome)
    const previousAvgIncome = simulatePreviousPeriod(d.avgIncome)

    return {
      division: d.division,
      customerChange: Math.round(((d.totalCustomers - previousTotalCustomers) / previousTotalCustomers) * 100),
      incomeChange: Math.round(((d.totalIncome - previousTotalIncome) / previousTotalIncome) * 100),
      avgIncomeChange: Math.round(((d.avgIncome - previousAvgIncome) / previousAvgIncome) * 100),
    }
  })

  return (
    <div className="space-y-6">
      <Card className="print:shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl">Regional Performance Report</CardTitle>
          <CardDescription>
            Division-by-division analysis as of {new Date(reportDate).toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="h-[300px]">
                <BarChart
                  data={customerCountData}
                  title="Customer Count by Division"
                  color="#3b82f6"
                  valueFormatter={(value) => value.toString()}
                />
              </div>
              <div className="h-[300px]">
                <BarChart
                  data={avgIncomeData}
                  title="Average Income by Division"
                  color="#10b981"
                  valueFormatter={(value) => `$${value.toLocaleString()}`}
                />
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Division Performance Comparison</CardTitle>
                <CardDescription>Key metrics across all divisions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Division</TableHead>
                        <TableHead className="text-right">Customers</TableHead>
                        <TableHead className="text-right">Total Income</TableHead>
                        <TableHead className="text-right">Avg. Income</TableHead>
                        <TableHead className="text-right">Avg. Age</TableHead>
                        <TableHead className="text-right">Male %</TableHead>
                        <TableHead className="text-right">Married %</TableHead>
                        <TableHead className="text-right">High Value %</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedDivisions.map((d) => (
                        <TableRow key={d.division}>
                          <TableCell className="font-medium">{d.division}</TableCell>
                          <TableCell className="text-right">{d.totalCustomers}</TableCell>
                          <TableCell className="text-right">${d.totalIncome.toLocaleString()}</TableCell>
                          <TableCell className="text-right">${d.avgIncome.toLocaleString()}</TableCell>
                          <TableCell className="text-right">{d.avgAge}</TableCell>
                          <TableCell className="text-right">{d.malePercentage}%</TableCell>
                          <TableCell className="text-right">{d.marriedPercentage}%</TableCell>
                          <TableCell className="text-right">{d.highValuePercentage}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Period-over-Period Change</CardTitle>
                <CardDescription>Performance changes compared to previous period</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Division</TableHead>
                        <TableHead className="text-right">Customer Growth</TableHead>
                        <TableHead className="text-right">Income Growth</TableHead>
                        <TableHead className="text-right">Avg. Income Growth</TableHead>
                        <TableHead>Performance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {divisionChanges.map((d) => (
                        <TableRow key={d.division}>
                          <TableCell className="font-medium">{d.division}</TableCell>
                          <TableCell className="text-right">
                            <span
                              className={
                                d.customerChange > 0 ? "text-green-600" : d.customerChange < 0 ? "text-red-600" : ""
                              }
                            >
                              {d.customerChange > 0 ? "+" : ""}
                              {d.customerChange}%
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <span
                              className={
                                d.incomeChange > 0 ? "text-green-600" : d.incomeChange < 0 ? "text-red-600" : ""
                              }
                            >
                              {d.incomeChange > 0 ? "+" : ""}
                              {d.incomeChange}%
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <span
                              className={
                                d.avgIncomeChange > 0 ? "text-green-600" : d.avgIncomeChange < 0 ? "text-red-600" : ""
                              }
                            >
                              {d.avgIncomeChange > 0 ? "+" : ""}
                              {d.avgIncomeChange}%
                            </span>
                          </TableCell>
                          <TableCell>
                            {d.incomeChange >= 5 ? (
                              <Badge className="bg-green-500">Strong</Badge>
                            ) : d.incomeChange > 0 ? (
                              <Badge className="bg-blue-500">Stable</Badge>
                            ) : d.incomeChange >= -5 ? (
                              <Badge className="bg-amber-500">Needs Attention</Badge>
                            ) : (
                              <Badge className="bg-red-500">Underperforming</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>High Value Customer Percentage</CardTitle>
                  <CardDescription>Percentage of customers with income over $75K</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <BarChart
                    data={highValueData}
                    title="High Value Customer %"
                    color="#8b5cf6"
                    valueFormatter={(value) => `${value}%`}
                  />
                </CardContent>
              </Card>

              <div className="p-4 border rounded-lg">
                <h3 className="text-lg font-medium mb-4">Regional Insights</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Top Performing Division</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {sortedDivisions[0].division} leads with ${sortedDivisions[0].totalIncome.toLocaleString()} in
                      total income and {sortedDivisions[0].totalCustomers} customers. The division has an average income
                      of ${sortedDivisions[0].avgIncome.toLocaleString()} and {sortedDivisions[0].highValuePercentage}%
                      high-value customers.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium">Highest Growth</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {(() => {
                        const highestGrowth = [...divisionChanges].sort((a, b) => b.incomeChange - a.incomeChange)[0]
                        return `${highestGrowth.division} shows the strongest growth with a ${highestGrowth.incomeChange}% increase in total income and ${highestGrowth.customerChange}% increase in customer count.`
                      })()}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium">Areas for Improvement</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {(() => {
                        const lowestGrowth = [...divisionChanges].sort((a, b) => a.incomeChange - b.incomeChange)[0]
                        return `${lowestGrowth.division} requires attention with a ${
                          lowestGrowth.incomeChange
                        }% change in total income. This division may benefit from targeted marketing campaigns and customer retention strategies.`
                      })()}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium">Demographic Variations</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Significant demographic variations exist across divisions. For example,{" "}
                      {[...divisionMetrics].sort((a, b) => b.malePercentage - a.malePercentage)[0].division} has the
                      highest male percentage at{" "}
                      {[...divisionMetrics].sort((a, b) => b.malePercentage - a.malePercentage)[0].malePercentage}%,
                      while {[...divisionMetrics].sort((a, b) => b.marriedPercentage - a.marriedPercentage)[0].division}{" "}
                      has the highest married percentage at{" "}
                      {
                        [...divisionMetrics].sort((a, b) => b.marriedPercentage - a.marriedPercentage)[0]
                          .marriedPercentage
                      }
                      %. These variations should inform region-specific marketing strategies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
