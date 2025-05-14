"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart } from "@/components/dashboard/charts/pie-chart"
import { BarChart } from "@/components/dashboard/charts/bar-chart"
import type { Customer } from "@/lib/data"

interface ExecutiveSummaryProps {
  customers: Customer[]
  reportDate: string
}

export function ExecutiveSummary({ customers, reportDate }: ExecutiveSummaryProps) {
  // Calculate key metrics
  const totalCustomers = customers.length
  const customersWithIncome = customers.filter((c) => c.income > 0).length
  const totalIncome = customers.reduce((sum, c) => sum + c.income, 0)
  const averageIncome = customersWithIncome > 0 ? Math.round(totalIncome / customersWithIncome) : 0
  const malePercentage = Math.round((customers.filter((c) => c.gender === "M").length / totalCustomers) * 100)
  const femalePercentage = 100 - malePercentage
  const marriedPercentage = Math.round(
    (customers.filter((c) => c.maritalStatus === "Married").length / totalCustomers) * 100,
  )

  // Calculate division distribution
  const divisionCounts: Record<string, number> = {}
  customers.forEach((customer) => {
    divisionCounts[customer.division] = (divisionCounts[customer.division] || 0) + 1
  })
  const divisionData = Object.entries(divisionCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, value]) => ({ name, value }))

  // Calculate income distribution
  const incomeRanges = {
    "No Income": 0,
    "1-25K": 0,
    "25K-50K": 0,
    "50K-75K": 0,
    "75K+": 0,
  }

  customers.forEach((customer) => {
    if (customer.income === 0) incomeRanges["No Income"]++
    else if (customer.income < 25000) incomeRanges["1-25K"]++
    else if (customer.income < 50000) incomeRanges["25K-50K"]++
    else if (customer.income < 75000) incomeRanges["50K-75K"]++
    else incomeRanges["75K+"]++
  })

  const incomeData = Object.entries(incomeRanges).map(([name, value]) => ({ name, value }))

  return (
    <div className="space-y-6">
      <Card className="print:shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl">Executive Summary</CardTitle>
          <CardDescription>Overview of customer data as of {new Date(reportDate).toLocaleDateString()}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Customers</h3>
                <p className="text-3xl font-bold">{totalCustomers}</p>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Income</h3>
                <p className="text-3xl font-bold">${totalIncome.toLocaleString()}</p>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Average Income</h3>
                <p className="text-3xl font-bold">${averageIncome.toLocaleString()}</p>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Customers with Income</h3>
                <p className="text-3xl font-bold">{Math.round((customersWithIncome / totalCustomers) * 100)}%</p>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-medium mb-4">Key Findings</h3>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  Gender distribution: {malePercentage}% male, {femalePercentage}% female
                </li>
                <li>{marriedPercentage}% of customers are married</li>
                <li>
                  {divisionData[0].name} is the largest division with {divisionData[0].value} customers (
                  {Math.round((divisionData[0].value / totalCustomers) * 100)}% of total)
                </li>
                <li>
                  {Math.round((incomeRanges["75K+"] / totalCustomers) * 100)}% of customers earn more than $75,000
                  annually
                </li>
                <li>
                  The average age of customers is{" "}
                  {Math.round(customers.reduce((sum, c) => sum + c.age, 0) / totalCustomers)}
                </li>
              </ul>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="h-[300px]">
                <BarChart
                  data={divisionData}
                  title="Customer Distribution by Division"
                  color="#3b82f6"
                  valueFormatter={(value) => value.toString()}
                />
              </div>
              <div className="h-[300px]">
                <PieChart
                  data={incomeData}
                  title="Income Distribution"
                  colors={["#6b7280", "#10b981", "#3b82f6", "#f59e0b", "#ef4444"]}
                />
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-medium mb-2">Executive Insights</h3>
              <p className="text-muted-foreground">
                This report provides a comprehensive overview of our customer base, highlighting key demographics,
                regional distribution, and income patterns. The data reveals several actionable insights that can inform
                strategic decision-making and marketing initiatives.
              </p>
              <p className="text-muted-foreground mt-2">
                Our customer base shows a {malePercentage > 50 ? "male" : "female"} majority, with a significant
                proportion of {marriedPercentage > 50 ? "married" : "unmarried"} individuals. The {divisionData[0].name}{" "}
                division represents our largest market, suggesting potential for targeted marketing campaigns in this
                region.
              </p>
              <p className="text-muted-foreground mt-2">
                Income distribution analysis reveals that {Math.round((incomeRanges["75K+"] / totalCustomers) * 100)}%
                of our customers fall into the high-income bracket ($75K+), while{" "}
                {Math.round((incomeRanges["No Income"] / totalCustomers) * 100)}% report no income. This suggests
                opportunities for both premium offerings and more accessible product lines.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
