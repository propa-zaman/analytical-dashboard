"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart } from "@/components/dashboard/charts/bar-chart"
import { PieChart } from "@/components/dashboard/charts/pie-chart"
import type { Customer } from "@/lib/data"

interface CustomerDemographicsProps {
  customers: Customer[]
}

export function CustomerDemographics({ customers }: CustomerDemographicsProps) {
  // Calculate gender distribution by division
  const divisions = [...new Set(customers.map((c) => c.division))]

  const genderByDivision = divisions
    .map((division) => {
      const divisionCustomers = customers.filter((c) => c.division === division)
      const maleCount = divisionCustomers.filter((c) => c.gender === "M").length
      const femaleCount = divisionCustomers.filter((c) => c.gender === "F").length
      const malePercentage = Math.round((maleCount / divisionCustomers.length) * 100)

      return {
        division,
        maleCount,
        femaleCount,
        malePercentage,
        femalePercentage: 100 - malePercentage,
        totalCustomers: divisionCustomers.length,
      }
    })
    .sort((a, b) => b.totalCustomers - a.totalCustomers)

  // Calculate age distribution
  const ageGroups = [
    { range: "20-29", min: 20, max: 29 },
    { range: "30-39", min: 30, max: 39 },
    { range: "40-49", min: 40, max: 49 },
    { range: "50+", min: 50, max: 100 },
  ]

  const ageDistribution = ageGroups.map((group) => {
    const count = customers.filter((c) => c.age >= group.min && c.age <= group.max).length
    return { name: group.range, value: count }
  })

  // Calculate income by age
  const incomeByAge = ageGroups.map((group) => {
    const groupCustomers = customers.filter((c) => c.age >= group.min && c.age <= group.max && c.income > 0)
    const avgIncome =
      groupCustomers.length > 0
        ? Math.round(groupCustomers.reduce((sum, c) => sum + c.income, 0) / groupCustomers.length)
        : 0
    return { name: group.range, value: avgIncome }
  })

  // Calculate marital status by gender
  const maritalStatuses = [...new Set(customers.map((c) => c.maritalStatus))]

  const maritalByGender = {
    male: maritalStatuses.map((status) => {
      const count = customers.filter((c) => c.maritalStatus === status && c.gender === "M").length
      return { name: status, value: count }
    }),
    female: maritalStatuses.map((status) => {
      const count = customers.filter((c) => c.maritalStatus === status && c.gender === "F").length
      return { name: status, value: count }
    }),
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Gender Distribution by Division</CardTitle>
          <CardDescription>Male/female ratio across different regions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {genderByDivision.map((div) => (
              <div key={div.division} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{div.division}</span>
                  <span className="text-sm text-muted-foreground">{div.totalCustomers} customers</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-full bg-secondary rounded-full h-2.5">
                    <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${div.malePercentage}%` }}></div>
                  </div>
                  <span className="text-xs text-muted-foreground w-16">
                    {div.maleCount} / {div.femaleCount}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Male: {div.malePercentage}%</span>
                  <span>Female: {div.femalePercentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Age Distribution</CardTitle>
          <CardDescription>Customers by age group</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <PieChart data={ageDistribution} title="Age Groups" colors={["#8b5cf6", "#ec4899", "#f97316", "#10b981"]} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Average Income by Age</CardTitle>
          <CardDescription>How income varies with age</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <BarChart
            data={incomeByAge}
            title="Income by Age Group"
            color="#3b82f6"
            valueFormatter={(value) => `$${value.toLocaleString()}`}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Male Marital Status</CardTitle>
          <CardDescription>Distribution for male customers</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <PieChart data={maritalByGender.male} title="Male Customers" colors={["#3b82f6", "#10b981", "#f59e0b"]} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Female Marital Status</CardTitle>
          <CardDescription>Distribution for female customers</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <PieChart data={maritalByGender.female} title="Female Customers" colors={["#ec4899", "#8b5cf6", "#f97316"]} />
        </CardContent>
      </Card>
    </div>
  )
}
