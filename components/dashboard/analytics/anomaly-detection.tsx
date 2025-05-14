"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Customer } from "@/lib/data"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

interface AnomalyDetectionProps {
  customers: Customer[]
}

export function AnomalyDetection({ customers }: AnomalyDetectionProps) {
  // Calculate statistics for anomaly detection
  const customersWithIncome = customers.filter((c) => c.income > 0)
  const incomeValues = customersWithIncome.map((c) => c.income)
  const avgIncome = incomeValues.reduce((sum, val) => sum + val, 0) / incomeValues.length
  const stdDevIncome = Math.sqrt(
    incomeValues.reduce((sum, val) => sum + Math.pow(val - avgIncome, 2), 0) / incomeValues.length,
  )

  // Identify income outliers (more than 2 standard deviations from mean)
  const highIncomeOutliers = customersWithIncome.filter((c) => c.income > avgIncome + 2 * stdDevIncome)
  const lowIncomeOutliers = customersWithIncome.filter((c) => c.income < avgIncome - 2 * stdDevIncome)

  // Identify age outliers
  const ageValues = customers.map((c) => c.age)
  const avgAge = ageValues.reduce((sum, val) => sum + val, 0) / ageValues.length
  const stdDevAge = Math.sqrt(ageValues.reduce((sum, val) => sum + Math.pow(val - avgAge, 2), 0) / ageValues.length)
  const ageOutliers = customers.filter((c) => Math.abs(c.age - avgAge) > 2 * stdDevAge)

  // Identify unusual patterns
  const unusualPatterns = []

  // Check for high income but young age
  const youngHighEarners = customers.filter((c) => c.age < 30 && c.income > avgIncome * 1.5)
  if (youngHighEarners.length > 0) {
    unusualPatterns.push({
      title: "Young High Earners",
      description: `${youngHighEarners.length} customers under 30 with income 50% above average`,
      count: youngHighEarners.length,
    })
  }

  // Check for gender income disparity by division
  const divisions = [...new Set(customers.map((c) => c.division))]
  divisions.forEach((division) => {
    const divisionCustomers = customers.filter((c) => c.division === division && c.income > 0)
    const maleCustomers = divisionCustomers.filter((c) => c.gender === "M")
    const femaleCustomers = divisionCustomers.filter((c) => c.gender === "F")

    if (maleCustomers.length > 0 && femaleCustomers.length > 0) {
      const maleAvgIncome = maleCustomers.reduce((sum, c) => sum + c.income, 0) / maleCustomers.length
      const femaleAvgIncome = femaleCustomers.reduce((sum, c) => sum + c.income, 0) / femaleCustomers.length
      const ratio = Math.max(maleAvgIncome, femaleAvgIncome) / Math.min(maleAvgIncome, femaleAvgIncome)

      if (ratio > 1.5) {
        unusualPatterns.push({
          title: `Gender Income Gap in ${division}`,
          description: `${ratio.toFixed(1)}x difference between male and female average income`,
          count: divisionCustomers.length,
        })
      }
    }
  })

  // Check for unusual marital status distribution
  const maritalStatuses = [...new Set(customers.map((c) => c.maritalStatus))]
  maritalStatuses.forEach((status) => {
    const statusCustomers = customers.filter((c) => c.maritalStatus === status)
    const percentage = (statusCustomers.length / customers.length) * 100

    if (percentage < 10 || percentage > 70) {
      unusualPatterns.push({
        title: `Unusual ${status} Distribution`,
        description: `${Math.round(percentage)}% of customers are ${status}`,
        count: statusCustomers.length,
      })
    }
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Anomaly Detection</CardTitle>
        <CardDescription>Identifying unusual patterns and outliers in your customer data</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-medium mb-2">Income Outliers</h3>
              <div className="space-y-2">
                <Alert variant="default" className="bg-blue-50 text-blue-800 border-blue-200">
                  <ExclamationTriangleIcon className="h-4 w-4" />
                  <AlertTitle>High Income Outliers</AlertTitle>
                  <AlertDescription>
                    {highIncomeOutliers.length} customers with income above $
                    {Math.round(avgIncome + 2 * stdDevIncome).toLocaleString()}
                  </AlertDescription>
                </Alert>

                <Alert variant="default" className="bg-amber-50 text-amber-800 border-amber-200">
                  <ExclamationTriangleIcon className="h-4 w-4" />
                  <AlertTitle>Low Income Outliers</AlertTitle>
                  <AlertDescription>
                    {lowIncomeOutliers.length} customers with income below $
                    {Math.round(avgIncome - 2 * stdDevIncome).toLocaleString()}
                  </AlertDescription>
                </Alert>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Age Outliers</h3>
              <Alert variant="default" className="bg-purple-50 text-purple-800 border-purple-200">
                <ExclamationTriangleIcon className="h-4 w-4" />
                <AlertTitle>Age Distribution Anomalies</AlertTitle>
                <AlertDescription>
                  {ageOutliers.length} customers with unusual age (outside {Math.round(avgAge - 2 * stdDevAge)} to{" "}
                  {Math.round(avgAge + 2 * stdDevAge)} range)
                </AlertDescription>
              </Alert>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Unusual Patterns</h3>
            <div className="space-y-2">
              {unusualPatterns.map((pattern, index) => (
                <Alert key={index} variant="default" className="bg-green-50 text-green-800 border-green-200">
                  <ExclamationTriangleIcon className="h-4 w-4" />
                  <AlertTitle>{pattern.title}</AlertTitle>
                  <AlertDescription>{pattern.description}</AlertDescription>
                </Alert>
              ))}

              {unusualPatterns.length === 0 && (
                <div className="text-sm text-muted-foreground">No significant unusual patterns detected.</div>
              )}
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="text-sm font-medium mb-2">Data Quality Assessment</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Missing Income Values:</span>
                <span>
                  {customers.filter((c) => c.income === 0).length} customers (
                  {Math.round((customers.filter((c) => c.income === 0).length / customers.length) * 100)}%)
                </span>
              </div>
              <div className="flex justify-between">
                <span>Gender Balance:</span>
                <span>
                  {customers.filter((c) => c.gender === "M").length} male /{" "}
                  {customers.filter((c) => c.gender === "F").length} female
                </span>
              </div>
              <div className="flex justify-between">
                <span>Age Range:</span>
                <span>
                  {Math.min(...customers.map((c) => c.age))} to {Math.max(...customers.map((c) => c.age))} years
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
