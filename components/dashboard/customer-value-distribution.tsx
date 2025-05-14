"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Customer } from "@/lib/data"
import { Progress } from "@/components/ui/progress"

interface CustomerValueDistributionProps {
  customers: Customer[]
}

export function CustomerValueDistribution({ customers }: CustomerValueDistributionProps) {
  // Calculate income distribution
  const incomeRanges = [
    { label: "No Income", min: 0, max: 0 },
    { label: "$1 - $25K", min: 1, max: 25000 },
    { label: "$25K - $50K", min: 25001, max: 50000 },
    { label: "$50K - $75K", min: 50001, max: 75000 },
    { label: "$75K - $100K", min: 75001, max: 100000 },
    { label: "$100K+", min: 100001, max: Number.POSITIVE_INFINITY },
  ]

  const incomeDistribution = incomeRanges.map((range) => {
    const count = customers.filter((c) => c.income >= range.min && c.income <= range.max).length
    const percentage = Math.round((count / customers.length) * 100)
    return { ...range, count, percentage }
  })

  // Calculate total income by segment
  const totalIncome = customers.reduce((sum, c) => sum + c.income, 0)

  const incomeContribution = incomeRanges
    .map((range) => {
      const segmentCustomers = customers.filter((c) => c.income >= range.min && c.income <= range.max)
      const segmentIncome = segmentCustomers.reduce((sum, c) => sum + c.income, 0)
      const percentage = totalIncome > 0 ? Math.round((segmentIncome / totalIncome) * 100) : 0
      return { ...range, income: segmentIncome, percentage }
    })
    .filter((segment) => segment.income > 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Value Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Distribution by Count</h4>
            <div className="space-y-3">
              {incomeDistribution.map((range) => (
                <div key={range.label} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{range.label}</span>
                    <span className="text-muted-foreground">
                      {range.count} customers ({range.percentage}%)
                    </span>
                  </div>
                  <Progress value={range.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Income Contribution</h4>
            <div className="space-y-3">
              {incomeContribution.map((range) => (
                <div key={range.label} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{range.label}</span>
                    <span className="text-muted-foreground">
                      ${range.income.toLocaleString()} ({range.percentage}%)
                    </span>
                  </div>
                  <Progress value={range.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
