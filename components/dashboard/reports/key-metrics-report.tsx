"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Customer } from "@/lib/data"
import { Progress } from "@/components/ui/progress"
import { ArrowDown, ArrowUp, Minus } from "lucide-react"

interface KeyMetricsReportProps {
  customers: Customer[]
  reportDate: string
}

export function KeyMetricsReport({ customers, reportDate }: KeyMetricsReportProps) {
  // Calculate key metrics
  const totalCustomers = customers.length
  const customersWithIncome = customers.filter((c) => c.income > 0).length
  const totalIncome = customers.reduce((sum, c) => sum + c.income, 0)
  const averageIncome = customersWithIncome > 0 ? Math.round(totalIncome / customersWithIncome) : 0
  const highValueCustomers = customers.filter((c) => c.income >= 75000).length
  const highValuePercentage = Math.round((highValueCustomers / totalCustomers) * 100)

  // Define targets (simulated)
  const targets = {
    totalCustomers: 60,
    totalIncome: 3000000,
    averageIncome: 50000,
    highValuePercentage: 25,
    customerRetention: 85,
    customerSatisfaction: 90,
    marketShare: 15,
    customerAcquisitionCost: 500,
  }

  // Calculate progress against targets
  const calculateProgress = (current: number, target: number) => {
    return Math.min(Math.round((current / target) * 100), 100)
  }

  // Simulate previous period metrics
  const previousPeriod = {
    totalCustomers: Math.round(totalCustomers * 0.9),
    totalIncome: Math.round(totalIncome * 0.85),
    averageIncome: Math.round(averageIncome * 0.95),
    highValuePercentage: Math.round(highValuePercentage * 0.9),
    customerRetention: 82,
    customerSatisfaction: 87,
    marketShare: 12,
    customerAcquisitionCost: 550,
  }

  // Calculate period-over-period change
  const calculateChange = (current: number, previous: number) => {
    return Math.round(((current - previous) / previous) * 100)
  }

  // Define KPI status
  const getStatusColor = (progress: number) => {
    if (progress >= 90) return "text-green-600"
    if (progress >= 70) return "text-amber-600"
    return "text-red-600"
  }

  // Define KPI trend
  const getTrendIcon = (change: number) => {
    if (change > 0)
      return (
        <span className="text-green-600 flex items-center">
          <ArrowUp className="h-3 w-3 mr-1" />
          {change}%
        </span>
      )
    if (change < 0)
      return (
        <span className="text-red-600 flex items-center">
          <ArrowDown className="h-3 w-3 mr-1" />
          {Math.abs(change)}%
        </span>
      )
    return (
      <span className="text-gray-600 flex items-center">
        <Minus className="h-3 w-3 mr-1" />
        0%
      </span>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="print:shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl">Key Performance Indicators</CardTitle>
          <CardDescription>Performance metrics as of {new Date(reportDate).toLocaleDateString()}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Metrics</CardTitle>
                  <CardDescription>Key customer performance indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Total Customers</span>
                        <span className="text-sm font-medium">{totalCustomers}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={calculateProgress(totalCustomers, targets.totalCustomers)} className="h-2" />
                        <span
                          className={`text-xs ${getStatusColor(
                            calculateProgress(totalCustomers, targets.totalCustomers),
                          )}`}
                        >
                          {calculateProgress(totalCustomers, targets.totalCustomers)}%
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Target: {targets.totalCustomers}</span>
                        <span>{getTrendIcon(calculateChange(totalCustomers, previousPeriod.totalCustomers))}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">High Value Customers</span>
                        <span className="text-sm font-medium">{highValuePercentage}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress
                          value={calculateProgress(highValuePercentage, targets.highValuePercentage)}
                          className="h-2"
                        />
                        <span
                          className={`text-xs ${getStatusColor(
                            calculateProgress(highValuePercentage, targets.highValuePercentage),
                          )}`}
                        >
                          {calculateProgress(highValuePercentage, targets.highValuePercentage)}%
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Target: {targets.highValuePercentage}%</span>
                        <span>
                          {getTrendIcon(calculateChange(highValuePercentage, previousPeriod.highValuePercentage))}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Customer Retention</span>
                        <span className="text-sm font-medium">83%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={calculateProgress(83, targets.customerRetention)} className="h-2" />
                        <span className={`text-xs ${getStatusColor(calculateProgress(83, targets.customerRetention))}`}>
                          {calculateProgress(83, targets.customerRetention)}%
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Target: {targets.customerRetention}%</span>
                        <span>{getTrendIcon(calculateChange(83, previousPeriod.customerRetention))}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Customer Satisfaction</span>
                        <span className="text-sm font-medium">88%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={calculateProgress(88, targets.customerSatisfaction)} className="h-2" />
                        <span
                          className={`text-xs ${getStatusColor(calculateProgress(88, targets.customerSatisfaction))}`}
                        >
                          {calculateProgress(88, targets.customerSatisfaction)}%
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Target: {targets.customerSatisfaction}%</span>
                        <span>{getTrendIcon(calculateChange(88, previousPeriod.customerSatisfaction))}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Financial Metrics</CardTitle>
                  <CardDescription>Key financial performance indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Total Income</span>
                        <span className="text-sm font-medium">${totalIncome.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={calculateProgress(totalIncome, targets.totalIncome)} className="h-2" />
                        <span
                          className={`text-xs ${getStatusColor(calculateProgress(totalIncome, targets.totalIncome))}`}
                        >
                          {calculateProgress(totalIncome, targets.totalIncome)}%
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Target: ${targets.totalIncome.toLocaleString()}</span>
                        <span>{getTrendIcon(calculateChange(totalIncome, previousPeriod.totalIncome))}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Average Income</span>
                        <span className="text-sm font-medium">${averageIncome.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={calculateProgress(averageIncome, targets.averageIncome)} className="h-2" />
                        <span
                          className={`text-xs ${getStatusColor(
                            calculateProgress(averageIncome, targets.averageIncome),
                          )}`}
                        >
                          {calculateProgress(averageIncome, targets.averageIncome)}%
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Target: ${targets.averageIncome.toLocaleString()}</span>
                        <span>{getTrendIcon(calculateChange(averageIncome, previousPeriod.averageIncome))}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Market Share</span>
                        <span className="text-sm font-medium">14%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={calculateProgress(14, targets.marketShare)} className="h-2" />
                        <span className={`text-xs ${getStatusColor(calculateProgress(14, targets.marketShare))}`}>
                          {calculateProgress(14, targets.marketShare)}%
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Target: {targets.marketShare}%</span>
                        <span>{getTrendIcon(calculateChange(14, previousPeriod.marketShare))}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Customer Acquisition Cost</span>
                        <span className="text-sm font-medium">$520</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={calculateProgress(targets.customerAcquisitionCost, 520)} className="h-2" />
                        <span
                          className={`text-xs ${getStatusColor(
                            calculateProgress(targets.customerAcquisitionCost, 520),
                          )}`}
                        >
                          {calculateProgress(targets.customerAcquisitionCost, 520)}%
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">
                          Target: ${targets.customerAcquisitionCost.toLocaleString()}
                        </span>
                        <span>{getTrendIcon(calculateChange(previousPeriod.customerAcquisitionCost, 520))}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Segment Performance</CardTitle>
                <CardDescription>Performance metrics by customer segment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-4">Segment</th>
                        <th className="text-right py-2 px-4">Customers</th>
                        <th className="text-right py-2 px-4">% of Total</th>
                        <th className="text-right py-2 px-4">Avg. Income</th>
                        <th className="text-right py-2 px-4">Total Income</th>
                        <th className="text-right py-2 px-4">% of Income</th>
                        <th className="text-right py-2 px-4">YoY Change</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          name: "High Value",
                          customers: customers.filter((c) => c.income >= 75000),
                          previousGrowth: 15,
                        },
                        {
                          name: "Mid Value",
                          customers: customers.filter((c) => c.income >= 25000 && c.income < 75000),
                          previousGrowth: 8,
                        },
                        {
                          name: "Low Value",
                          customers: customers.filter((c) => c.income > 0 && c.income < 25000),
                          previousGrowth: 3,
                        },
                        {
                          name: "No Income",
                          customers: customers.filter((c) => c.income === 0),
                          previousGrowth: -2,
                        },
                      ].map((segment) => {
                        const segmentCustomers = segment.customers.length
                        const percentOfTotal = Math.round((segmentCustomers / totalCustomers) * 100)
                        const segmentIncome = segment.customers.reduce((sum, c) => sum + c.income, 0)
                        const percentOfIncome = Math.round((segmentIncome / totalIncome) * 100) || 0
                        const avgIncome =
                          segment.name !== "No Income" ? Math.round(segmentIncome / segmentCustomers) : 0

                        return (
                          <tr key={segment.name} className="border-b">
                            <td className="py-2 px-4 font-medium">{segment.name}</td>
                            <td className="text-right py-2 px-4">{segmentCustomers}</td>
                            <td className="text-right py-2 px-4">{percentOfTotal}%</td>
                            <td className="text-right py-2 px-4">${avgIncome.toLocaleString()}</td>
                            <td className="text-right py-2 px-4">${segmentIncome.toLocaleString()}</td>
                            <td className="text-right py-2 px-4">{percentOfIncome}%</td>
                            <td className="text-right py-2 px-4">{getTrendIcon(segment.previousGrowth)}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-medium mb-4">KPI Summary & Insights</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Overall Performance</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    The business is performing at{" "}
                    {Math.round(
                      (calculateProgress(totalCustomers, targets.totalCustomers) +
                        calculateProgress(totalIncome, targets.totalIncome) +
                        calculateProgress(averageIncome, targets.averageIncome) +
                        calculateProgress(highValuePercentage, targets.highValuePercentage)) /
                        4,
                    )}
                    % of target across key metrics. Customer acquisition is{" "}
                    {calculateProgress(totalCustomers, targets.totalCustomers) >= 90
                      ? "strong"
                      : calculateProgress(totalCustomers, targets.totalCustomers) >= 70
                        ? "on track"
                        : "below target"}
                    , while financial performance is{" "}
                    {calculateProgress(totalIncome, targets.totalIncome) >= 90
                      ? "exceeding expectations"
                      : calculateProgress(totalIncome, targets.totalIncome) >= 70
                        ? "meeting targets"
                        : "needs improvement"}
                    .
                  </p>
                </div>

                <div>
                  <h4 className="font-medium">Areas of Strength</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    High value customer percentage has shown significant improvement, increasing by{" "}
                    {calculateChange(highValuePercentage, previousPeriod.highValuePercentage)}% compared to the previous
                    period. Customer satisfaction remains strong at 88%, which is{" "}
                    {calculateProgress(88, targets.customerSatisfaction)}% of our target.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium">Areas for Improvement</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Customer retention at 83% is below our target of {targets.customerRetention}% and requires
                    attention. The customer acquisition cost of $520 is higher than our target of $
                    {targets.customerAcquisitionCost}, suggesting a need to optimize marketing and sales processes.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium">Segment Performance</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    The High Value segment continues to drive significant value, contributing{" "}
                    {Math.round(
                      (customers.filter((c) => c.income >= 75000).reduce((sum, c) => sum + c.income, 0) / totalIncome) *
                        100,
                    )}
                    % of total income while representing only{" "}
                    {Math.round((customers.filter((c) => c.income >= 75000).length / totalCustomers) * 100)}% of
                    customers. The Mid Value segment shows promising growth at 8% year-over-year, presenting
                    opportunities for upselling.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
