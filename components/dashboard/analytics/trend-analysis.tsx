"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart } from "@/components/dashboard/charts/line-chart"
import type { Customer } from "@/lib/data"

interface TrendAnalysisProps {
  customers: Customer[]
}

export function TrendAnalysis({ customers }: TrendAnalysisProps) {
  // Calculate income distribution by age
  const ageGroups = [
    { min: 20, max: 24 },
    { min: 25, max: 29 },
    { min: 30, max: 34 },
    { min: 35, max: 39 },
    { min: 40, max: 44 },
    { min: 45, max: 49 },
    { min: 50, max: 54 },
  ]

  // Remove this entire block or comment it out
  // const incomeByAge = ageGroups.map((group) => {
  //   const groupCustomers = customers.filter((c) => c.age >= group.min && c.age <= group.max && c.income > 0)
  //   const avgIncome =
  //     groupCustomers.length > 0
  //       ? Math.round(groupCustomers.reduce((sum, c) => sum + c.income, 0) / groupCustomers.length)
  //       : 0
  //   return { name: `${group.min}-${group.max}`, value: avgIncome }
  // })

  // Calculate income trend by age for different marital statuses
  const maritalStatuses = [...new Set(customers.map((c) => c.maritalStatus))]

  const incomeByAgeAndStatus = ageGroups.map((group) => {
    const result: Record<string, string | number> = { name: `${group.min}-${group.max}` }

    maritalStatuses.forEach((status) => {
      const statusCustomers = customers.filter(
        (c) => c.age >= group.min && c.age <= group.max && c.maritalStatus === status && c.income > 0,
      )
      result[status] =
        statusCustomers.length > 0
          ? Math.round(statusCustomers.reduce((sum, c) => sum + c.income, 0) / statusCustomers.length)
          : 0
    })

    return result
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Income Trends by Age</CardTitle>
        <CardDescription>How income changes with age across different demographics</CardDescription>
      </CardHeader>
      <CardContent className="h-[350px]">
        <LineChart
          data={incomeByAgeAndStatus}
          categories={maritalStatuses as string[]}
          index="name"
          valueFormatter={(value) => `$${value.toLocaleString()}`}
          colors={["#3b82f6", "#10b981", "#f59e0b"]}
        />
      </CardContent>
    </Card>
  )
}
