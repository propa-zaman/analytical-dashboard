"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart } from "@/components/dashboard/charts/pie-chart"
import { BarChart } from "@/components/dashboard/charts/bar-chart"
import type { Customer } from "@/lib/data"
import { Badge } from "@/components/ui/badge"

interface CustomerSegmentsProps {
  customers: Customer[]
}

export function CustomerSegments({ customers }: CustomerSegmentsProps) {
  // Calculate customer segments
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

  // Calculate marital status segments
  const maritalStatusCounts: Record<string, number> = {}
  customers.forEach((customer) => {
    maritalStatusCounts[customer.maritalStatus] = (maritalStatusCounts[customer.maritalStatus] || 0) + 1
  })

  const maritalStatusData = Object.entries(maritalStatusCounts).map(([name, value]) => ({ name, value }))

  // Calculate division segments
  const divisionCounts: Record<string, number> = {}
  customers.forEach((customer) => {
    divisionCounts[customer.division] = (divisionCounts[customer.division] || 0) + 1
  })

  const divisionData = Object.entries(divisionCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, value]) => ({ name, value }))

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Customer Segmentation</CardTitle>
          <CardDescription>Analysis of customer segments based on value, age, and other factors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-medium mb-4">Key Customer Segments</h3>

              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Badge className="bg-blue-500 mr-2">Premium</Badge>
                      <h4 className="font-medium">High Value Customers</h4>
                    </div>
                    <span className="text-sm font-medium">{highValueCustomers.length} customers</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Customers with income over $75,000. This segment represents{" "}
                    {Math.round((highValueCustomers.length / customers.length) * 100)}% of your customer base.
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Badge className="bg-green-500 mr-2">Core</Badge>
                      <h4 className="font-medium">Mid Value Customers</h4>
                    </div>
                    <span className="text-sm font-medium">{midValueCustomers.length} customers</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Customers with income between $25,000 and $75,000. This segment represents{" "}
                    {Math.round((midValueCustomers.length / customers.length) * 100)}% of your customer base.
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Badge className="bg-yellow-500 mr-2">Growth</Badge>
                      <h4 className="font-medium">Young Professionals</h4>
                    </div>
                    <span className="text-sm font-medium">
                      {youngCustomers.filter((c) => c.income > 0).length} customers
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Customers under 30 with income. This segment represents{" "}
                    {Math.round((youngCustomers.filter((c) => c.income > 0).length / customers.length) * 100)}% of your
                    customer base.
                  </p>
                </div>
              </div>
            </div>

            <div className="h-[300px]">
              <PieChart
                data={segmentData}
                title="Customer Value Segments"
                colors={["#3b82f6", "#10b981", "#f59e0b", "#6b7280"]}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Age Distribution</CardTitle>
          <CardDescription>Customer segments by age group</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <PieChart data={ageSegmentData} title="Age Segments" colors={["#8b5cf6", "#ec4899", "#f97316"]} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Marital Status</CardTitle>
          <CardDescription>Distribution by marital status</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <PieChart data={maritalStatusData} title="Marital Status" colors={["#10b981", "#3b82f6", "#f59e0b"]} />
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Regional Distribution</CardTitle>
          <CardDescription>Customer distribution by division</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <BarChart data={divisionData} title="Customers by Division" color="#8b5cf6" />
        </CardContent>
      </Card>
    </div>
  )
}
