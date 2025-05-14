"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart } from "@/components/dashboard/charts/pie-chart"
import { BarChart } from "@/components/dashboard/charts/bar-chart"
import type { Customer } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface CustomerSegmentReportProps {
  customers: Customer[]
  reportDate: string
}

export function CustomerSegmentReport({ customers, reportDate }: CustomerSegmentReportProps) {
  // Define customer segments
  const highValueCustomers = customers.filter((c) => c.income >= 75000)
  const midValueCustomers = customers.filter((c) => c.income >= 25000 && c.income < 75000)
  const lowValueCustomers = customers.filter((c) => c.income > 0 && c.income < 25000)
  const noIncomeCustomers = customers.filter((c) => c.income === 0)

  const segmentData = [
    { name: "High Value", value: highValueCustomers.length },
    { name: "Mid Value", value: midValueCustomers.length },
    { name: "Low Value", value: lowValueCustomers.length },
    { name: "No Income", value: noIncomeCustomers.length },
  ]

  // Calculate age segments
  const youngCustomers = customers.filter((c) => c.age < 30)
  const middleAgedCustomers = customers.filter((c) => c.age >= 30 && c.age < 45)
  const olderCustomers = customers.filter((c) => c.age >= 45)

  const ageSegmentData = [
    { name: "Under 30", value: youngCustomers.length },
    { name: "30-44", value: middleAgedCustomers.length },
    { name: "45+", value: olderCustomers.length },
  ]

  // Calculate segment metrics
  const calculateSegmentMetrics = (segment: Customer[]) => {
    const total = segment.length
    if (total === 0) return { avgAge: 0, avgIncome: 0, malePercentage: 0, marriedPercentage: 0 }

    const avgAge = Math.round(segment.reduce((sum, c) => sum + c.age, 0) / total)
    const withIncome = segment.filter((c) => c.income > 0)
    const avgIncome =
      withIncome.length > 0 ? Math.round(withIncome.reduce((sum, c) => sum + c.income, 0) / withIncome.length) : 0
    const malePercentage = Math.round((segment.filter((c) => c.gender === "M").length / total) * 100)
    const marriedPercentage = Math.round((segment.filter((c) => c.maritalStatus === "Married").length / total) * 100)

    return { avgAge, avgIncome, malePercentage, marriedPercentage }
  }

  const highValueMetrics = calculateSegmentMetrics(highValueCustomers)
  const midValueMetrics = calculateSegmentMetrics(midValueCustomers)
  const lowValueMetrics = calculateSegmentMetrics(lowValueCustomers)
  const noIncomeMetrics = calculateSegmentMetrics(noIncomeCustomers)

  // Calculate division distribution for high value customers
  const highValueDivisions: Record<string, number> = {}
  highValueCustomers.forEach((customer) => {
    highValueDivisions[customer.division] = (highValueDivisions[customer.division] || 0) + 1
  })
  const highValueDivisionData = Object.entries(highValueDivisions)
    .sort((a, b) => b[1] - a[1])
    .map(([name, value]) => ({ name, value }))

  return (
    <div className="space-y-6">
      <Card className="print:shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl">Customer Segment Report</CardTitle>
          <CardDescription>
            Detailed analysis of customer segments as of {new Date(reportDate).toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="h-[300px]">
                <PieChart
                  data={segmentData}
                  title="Customer Value Segments"
                  colors={["#3b82f6", "#10b981", "#f59e0b", "#6b7280"]}
                />
              </div>
              <div className="h-[300px]">
                <PieChart data={ageSegmentData} title="Age Segments" colors={["#8b5cf6", "#ec4899", "#f97316"]} />
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-medium mb-4">Segment Profiles</h3>

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Badge className="bg-blue-500 mr-2">Premium</Badge>
                      <h4 className="font-medium">High Value Customers</h4>
                    </div>
                    <span className="text-sm font-medium">
                      {highValueCustomers.length} customers (
                      {Math.round((highValueCustomers.length / customers.length) * 100)}%)
                    </span>
                  </div>
                  <div className="grid gap-4 md:grid-cols-4 mt-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Average Age</p>
                      <p className="font-medium">{highValueMetrics.avgAge} years</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Average Income</p>
                      <p className="font-medium">${highValueMetrics.avgIncome.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Male Percentage</p>
                      <p className="font-medium">{highValueMetrics.malePercentage}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Married Percentage</p>
                      <p className="font-medium">{highValueMetrics.marriedPercentage}%</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Badge className="bg-green-500 mr-2">Core</Badge>
                      <h4 className="font-medium">Mid Value Customers</h4>
                    </div>
                    <span className="text-sm font-medium">
                      {midValueCustomers.length} customers (
                      {Math.round((midValueCustomers.length / customers.length) * 100)}%)
                    </span>
                  </div>
                  <div className="grid gap-4 md:grid-cols-4 mt-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Average Age</p>
                      <p className="font-medium">{midValueMetrics.avgAge} years</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Average Income</p>
                      <p className="font-medium">${midValueMetrics.avgIncome.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Male Percentage</p>
                      <p className="font-medium">{midValueMetrics.malePercentage}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Married Percentage</p>
                      <p className="font-medium">{midValueMetrics.marriedPercentage}%</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Badge className="bg-amber-500 mr-2">Value</Badge>
                      <h4 className="font-medium">Low Value Customers</h4>
                    </div>
                    <span className="text-sm font-medium">
                      {lowValueCustomers.length} customers (
                      {Math.round((lowValueCustomers.length / customers.length) * 100)}%)
                    </span>
                  </div>
                  <div className="grid gap-4 md:grid-cols-4 mt-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Average Age</p>
                      <p className="font-medium">{lowValueMetrics.avgAge} years</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Average Income</p>
                      <p className="font-medium">${lowValueMetrics.avgIncome.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Male Percentage</p>
                      <p className="font-medium">{lowValueMetrics.malePercentage}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Married Percentage</p>
                      <p className="font-medium">{lowValueMetrics.marriedPercentage}%</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Badge className="bg-gray-500 mr-2">Potential</Badge>
                      <h4 className="font-medium">No Income Customers</h4>
                    </div>
                    <span className="text-sm font-medium">
                      {noIncomeCustomers.length} customers (
                      {Math.round((noIncomeCustomers.length / customers.length) * 100)}%)
                    </span>
                  </div>
                  <div className="grid gap-4 md:grid-cols-4 mt-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Average Age</p>
                      <p className="font-medium">{noIncomeMetrics.avgAge} years</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Average Income</p>
                      <p className="font-medium">$0</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Male Percentage</p>
                      <p className="font-medium">{noIncomeMetrics.malePercentage}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Married Percentage</p>
                      <p className="font-medium">{noIncomeMetrics.marriedPercentage}%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>High Value Customer Distribution</CardTitle>
                  <CardDescription>Regional distribution of premium customers</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <BarChart
                    data={highValueDivisionData}
                    title="High Value Customers by Division"
                    color="#3b82f6"
                    valueFormatter={(value) => value.toString()}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Segment Contribution to Total Income</CardTitle>
                  <CardDescription>Income contribution by customer segment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6 pt-4">
                    {[
                      {
                        name: "High Value",
                        customers: highValueCustomers,
                        color: "bg-blue-500",
                      },
                      {
                        name: "Mid Value",
                        customers: midValueCustomers,
                        color: "bg-green-500",
                      },
                      {
                        name: "Low Value",
                        customers: lowValueCustomers,
                        color: "bg-amber-500",
                      },
                    ].map((segment) => {
                      const segmentIncome = segment.customers.reduce((sum, c) => sum + c.income, 0)
                      const totalIncome = customers.reduce((sum, c) => sum + c.income, 0)
                      const percentage = Math.round((segmentIncome / totalIncome) * 100)

                      return (
                        <div key={segment.name} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">{segment.name}</span>
                            <span className="text-sm text-muted-foreground">
                              ${segmentIncome.toLocaleString()} ({percentage}%)
                            </span>
                          </div>
                          <Progress value={percentage} className={`h-2 ${segment.color}`} />
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-medium mb-2">Segment Insights & Opportunities</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">High Value Segment ({highValueCustomers.length} customers)</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    This premium segment represents {Math.round((highValueCustomers.length / customers.length) * 100)}%
                    of our customer base but contributes significantly to total income. These customers are
                    predominantly {highValueMetrics.malePercentage > 50 ? "male" : "female"} (
                    {highValueMetrics.malePercentage}%) and {highValueMetrics.marriedPercentage}% are married.
                    Opportunity exists to develop premium services and loyalty programs targeted at this valuable
                    segment.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium">Mid Value Segment ({midValueCustomers.length} customers)</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Our core customer segment with potential for upselling. With an average income of $
                    {midValueMetrics.avgIncome.toLocaleString()}, these customers represent a growth opportunity through
                    targeted marketing and value-added services.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium">Low Value Segment ({lowValueCustomers.length} customers)</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    This segment requires cost-effective engagement strategies. With an average age of{" "}
                    {lowValueMetrics.avgAge}, there may be opportunities to develop products specifically for this
                    demographic while maintaining efficient service delivery.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium">No Income Segment ({noIncomeCustomers.length} customers)</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    This segment represents potential future value. With an average age of {noIncomeMetrics.avgAge},
                    many may be students or in career transitions. Developing entry-level products and building brand
                    loyalty now could yield returns as their income grows.
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
