"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart } from "@/components/dashboard/charts/bar-chart"
import type { Customer } from "@/lib/data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PredictiveAnalyticsProps {
  customers: Customer[]
}

export function PredictiveAnalytics({ customers }: PredictiveAnalyticsProps) {
  // Simple income prediction based on age, gender, and marital status
  const [age, setAge] = useState<number>(30)
  const [gender, setGender] = useState<string>("M")
  const [maritalStatus, setMaritalStatus] = useState<string>("Single")
  const [predictedIncome, setPredictedIncome] = useState<number | null>(null)
  const [confidenceLevel, setConfidenceLevel] = useState<number | null>(null)

  const predictIncome = () => {
    // Filter similar customers
    const similarCustomers = customers.filter(
      (c) => Math.abs(c.age - age) <= 5 && c.gender === gender && c.maritalStatus === maritalStatus && c.income > 0,
    )

    if (similarCustomers.length > 0) {
      // Calculate average income of similar customers
      const avgIncome = Math.round(similarCustomers.reduce((sum, c) => sum + c.income, 0) / similarCustomers.length)
      setPredictedIncome(avgIncome)

      // Calculate confidence level based on sample size
      const confidence = Math.min(similarCustomers.length / 10, 1) * 100
      setConfidenceLevel(Math.round(confidence))
    } else {
      // Fallback to broader matching if no similar customers found
      const broaderMatch = customers.filter((c) => Math.abs(c.age - age) <= 10 && c.income > 0)
      if (broaderMatch.length > 0) {
        const avgIncome = Math.round(broaderMatch.reduce((sum, c) => sum + c.income, 0) / broaderMatch.length)
        setPredictedIncome(avgIncome)
        setConfidenceLevel(30) // Lower confidence due to broader matching
      } else {
        setPredictedIncome(0)
        setConfidenceLevel(0)
      }
    }
  }

  // Prepare data for future income projection
  const ageGroups = [
    { min: 20, max: 29 },
    { min: 30, max: 39 },
    { min: 40, max: 49 },
    { min: 50, max: 59 },
    { min: 60, max: 69 },
  ]

  const incomeProjection = ageGroups.map((group) => {
    const groupCustomers = customers.filter(
      (c) => c.age >= group.min && c.age <= group.max && c.income > 0 && c.maritalStatus === "Married",
    )
    const avgIncome =
      groupCustomers.length > 0
        ? Math.round(groupCustomers.reduce((sum, c) => sum + c.income, 0) / groupCustomers.length)
        : 0

    // Project 5% growth for future age groups
    const isProjected = group.min > Math.max(...customers.map((c) => c.age))
    const projectedIncome = isProjected ? avgIncome * 1.05 : avgIncome

    return {
      name: `${group.min}-${group.max}`,
      value: Math.round(projectedIncome),
      projected: isProjected,
    }
  })

  // Customer lifetime value calculation
  const calculateLifetimeValue = (customer: Customer): number => {
    // Simple CLV calculation based on current income and age
    if (customer.income === 0) return 0

    const yearsRemaining = Math.max(65 - customer.age, 0)
    const annualValue = customer.income * 0.05 // Assume 5% of income is spent with company
    return Math.round(annualValue * yearsRemaining)
  }

  const topCustomersByLTV = [...customers]
    .map((customer) => ({
      ...customer,
      ltv: calculateLifetimeValue(customer),
    }))
    .sort((a, b) => b.ltv - a.ltv)
    .slice(0, 10)

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Predictive Analytics</CardTitle>
          <CardDescription>Forecast future trends and customer value</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="income-prediction">
            <TabsList className="mb-4">
              <TabsTrigger value="income-prediction">Income Prediction</TabsTrigger>
              <TabsTrigger value="customer-ltv">Customer Lifetime Value</TabsTrigger>
              <TabsTrigger value="future-trends">Future Trends</TabsTrigger>
            </TabsList>

            <TabsContent value="income-prediction">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      min={18}
                      max={80}
                      value={age}
                      onChange={(e) => setAge(Number.parseInt(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select value={gender} onValueChange={setGender}>
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="M">Male</SelectItem>
                        <SelectItem value="F">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="marital-status">Marital Status</Label>
                    <Select value={maritalStatus} onValueChange={setMaritalStatus}>
                      <SelectTrigger id="marital-status">
                        <SelectValue placeholder="Select marital status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Single">Single</SelectItem>
                        <SelectItem value="Married">Married</SelectItem>
                        <SelectItem value="Divorced">Divorced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button onClick={predictIncome}>Predict Income</Button>
                </div>

                <div className="bg-muted rounded-lg p-6 flex flex-col items-center justify-center">
                  {predictedIncome !== null ? (
                    <>
                      <h3 className="text-lg font-medium mb-2">Predicted Annual Income</h3>
                      <div className="text-4xl font-bold mb-4">${predictedIncome.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Prediction confidence: {confidenceLevel}%</div>
                      <div className="mt-4 text-sm">
                        Based on {customers.filter((c) => Math.abs(c.age - age) <= 5).length} similar customers in your
                        database.
                      </div>
                    </>
                  ) : (
                    <div className="text-center text-muted-foreground">
                      Enter customer details and click "Predict Income" to see the prediction.
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="customer-ltv">
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Customer Lifetime Value Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Customer Lifetime Value (CLV) estimates the total revenue a business can expect from a customer
                    throughout their relationship. This model assumes 5% of customer income is spent with your business
                    annually until retirement age (65).
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-4">Customer</th>
                        <th className="text-right py-2 px-4">Age</th>
                        <th className="text-right py-2 px-4">Annual Income</th>
                        <th className="text-right py-2 px-4">Lifetime Value</th>
                        <th className="text-right py-2 px-4">Years Remaining</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topCustomersByLTV.map((customer) => (
                        <tr key={customer.id} className="border-b">
                          <td className="py-2 px-4 font-medium">{customer.name}</td>
                          <td className="text-right py-2 px-4">{customer.age}</td>
                          <td className="text-right py-2 px-4">${customer.income.toLocaleString()}</td>
                          <td className="text-right py-2 px-4">${customer.ltv.toLocaleString()}</td>
                          <td className="text-right py-2 px-4">{Math.max(65 - customer.age, 0)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="future-trends">
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Future Income Projections</h3>
                  <p className="text-sm text-muted-foreground">
                    This chart projects income trends across age groups, with a 5% growth factor applied to future age
                    brackets. Projections are based on current data patterns.
                  </p>
                </div>

                <div className="h-[300px]">
                  <BarChart
                    data={incomeProjection}
                    title="Projected Income by Age Group"
                    color="#3b82f6"
                    valueFormatter={(value) => `$${value.toLocaleString()}`}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
