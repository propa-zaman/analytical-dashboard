"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Sidebar } from "@/components/dashboard/sidebar"
import { FilterBar } from "@/components/dashboard/filter-bar"
import { CorrelationMatrix } from "@/components/dashboard/analytics/correlation-matrix"
import { TrendAnalysis } from "@/components/dashboard/analytics/trend-analysis"
import { DivisionComparison } from "@/components/dashboard/analytics/division-comparison"
import { PredictiveAnalytics } from "@/components/dashboard/analytics/predictive-analytics"
import { AnomalyDetection } from "@/components/dashboard/analytics/anomaly-detection"
import { type Customer, customers, filterCustomers } from "@/lib/data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AnalyticsPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>(customers)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  const handleFilterChange = (filters: Partial<Customer>) => {
    setFilteredCustomers(filterCustomers(filters))
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Advanced Analytics</h1>
            <p className="text-muted-foreground">
              Discover deeper insights and patterns in your customer data with advanced analytics.
            </p>
          </div>

          <FilterBar onFilterChange={handleFilterChange} />

          <Tabs defaultValue="insights" className="space-y-4">
            <TabsList>
              <TabsTrigger value="insights">Key Insights</TabsTrigger>
              <TabsTrigger value="correlations">Correlations</TabsTrigger>
              {/* <TabsTrigger value="comparisons">Division Analysis</TabsTrigger> */}
              <TabsTrigger value="predictions">Predictive Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="insights" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Data Insights Summary</CardTitle>
                    <CardDescription>Key patterns and insights from your customer data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Income-Age Relationship */}
                      <div className="p-4 border rounded-lg">
                        <h3 className="text-lg font-medium">Income-Age Relationship</h3>
                        <p className="text-sm text-muted-foreground mt-2">
                          {(() => {
                            const ageGroups = [
                              { min: 20, max: 29, label: "20s" },
                              { min: 30, max: 39, label: "30s" },
                              { min: 40, max: 49, label: "40s" },
                              { min: 50, max: 100, label: "50+" },
                            ]

                            const avgIncomeByAge = ageGroups.map((group) => {
                              const groupCustomers = filteredCustomers.filter(
                                (c) => c.age >= group.min && c.age <= group.max && c.income > 0,
                              )
                              return {
                                label: group.label,
                                avgIncome:
                                  groupCustomers.length > 0
                                    ? Math.round(
                                        groupCustomers.reduce((sum, c) => sum + c.income, 0) / groupCustomers.length,
                                      )
                                    : 0,
                                count: groupCustomers.length,
                              }
                            })

                            // Find highest income age group
                            const highestIncomeGroup = [...avgIncomeByAge].sort((a, b) => b.avgIncome - a.avgIncome)[0]

                            // Find lowest income age group
                            const lowestIncomeGroup = avgIncomeByAge
                              .filter((g) => g.avgIncome > 0)
                              .sort((a, b) => a.avgIncome - b.avgIncome)[0]

                            return `Customers in their ${highestIncomeGroup.label} have the highest average income at $${highestIncomeGroup.avgIncome.toLocaleString()}, while those in their ${lowestIncomeGroup.label} have the lowest average income at $${lowestIncomeGroup.avgIncome.toLocaleString()}.`
                          })()}
                        </p>
                      </div>

                      {/* Gender Income Gap */}
                      <div className="p-4 border rounded-lg">
                        <h3 className="text-lg font-medium">Gender Income Analysis</h3>
                        <p className="text-sm text-muted-foreground mt-2">
                          {(() => {
                            const maleCustomers = filteredCustomers.filter((c) => c.gender === "M" && c.income > 0)
                            const femaleCustomers = filteredCustomers.filter((c) => c.gender === "F" && c.income > 0)

                            const maleAvgIncome =
                              maleCustomers.length > 0
                                ? Math.round(maleCustomers.reduce((sum, c) => sum + c.income, 0) / maleCustomers.length)
                                : 0

                            const femaleAvgIncome =
                              femaleCustomers.length > 0
                                ? Math.round(
                                    femaleCustomers.reduce((sum, c) => sum + c.income, 0) / femaleCustomers.length,
                                  )
                                : 0

                            const gap = Math.abs(maleAvgIncome - femaleAvgIncome)
                            const gapPercentage = Math.round((gap / Math.max(maleAvgIncome, femaleAvgIncome)) * 100)

                            return `The average income for male customers is $${maleAvgIncome.toLocaleString()}, while for female customers it's $${femaleAvgIncome.toLocaleString()}. This represents a ${gapPercentage}% difference between genders.`
                          })()}
                        </p>
                      </div>

                      {/* Marital Status Impact */}
                      <div className="p-4 border rounded-lg">
                        <h3 className="text-lg font-medium">Marital Status Impact</h3>
                        <p className="text-sm text-muted-foreground mt-2">
                          {(() => {
                            const maritalStatuses = [...new Set(filteredCustomers.map((c) => c.maritalStatus))]

                            const avgIncomeByStatus = maritalStatuses.map((status) => {
                              const statusCustomers = filteredCustomers.filter(
                                (c) => c.maritalStatus === status && c.income > 0,
                              )
                              return {
                                status,
                                avgIncome:
                                  statusCustomers.length > 0
                                    ? Math.round(
                                        statusCustomers.reduce((sum, c) => sum + c.income, 0) / statusCustomers.length,
                                      )
                                    : 0,
                                count: statusCustomers.length,
                              }
                            })

                            // Find highest income status
                            const highestIncomeStatus = [...avgIncomeByStatus].sort(
                              (a, b) => b.avgIncome - a.avgIncome,
                            )[0]

                            return `${highestIncomeStatus.status} customers have the highest average income at $${highestIncomeStatus.avgIncome.toLocaleString()}, which is ${
                              Math.round(
                                (highestIncomeStatus.avgIncome /
                                  (filteredCustomers.filter((c) => c.income > 0).reduce((sum, c) => sum + c.income, 0) /
                                    filteredCustomers.filter((c) => c.income > 0).length)) *
                                  100,
                              ) - 100
                            }% above the overall average.`
                          })()}
                        </p>
                      </div>

                      {/* Regional Insights */}
                      <div className="p-4 border rounded-lg">
                        <h3 className="text-lg font-medium">Regional Insights</h3>
                        <p className="text-sm text-muted-foreground mt-2">
                          {(() => {
                            const divisions = [...new Set(filteredCustomers.map((c) => c.division))]

                            const divisionStats = divisions.map((division) => {
                              const divisionCustomers = filteredCustomers.filter((c) => c.division === division)
                              const customersWithIncome = divisionCustomers.filter((c) => c.income > 0)
                              return {
                                division,
                                count: divisionCustomers.length,
                                avgIncome:
                                  customersWithIncome.length > 0
                                    ? Math.round(
                                        customersWithIncome.reduce((sum, c) => sum + c.income, 0) /
                                          customersWithIncome.length,
                                      )
                                    : 0,
                                avgAge: Math.round(
                                  divisionCustomers.reduce((sum, c) => sum + c.age, 0) / divisionCustomers.length,
                                ),
                              }
                            })

                            // Find highest income division
                            const highestIncomeDivision = [...divisionStats].sort(
                              (a, b) => b.avgIncome - a.avgIncome,
                            )[0]

                            // Find youngest division
                            const youngestDivision = [...divisionStats].sort((a, b) => a.avgAge - b.avgAge)[0]

                            return `${highestIncomeDivision.division} has the highest average income at $${highestIncomeDivision.avgIncome.toLocaleString()}, while ${youngestDivision.division} has the youngest customer base with an average age of ${youngestDivision.avgAge}.`
                          })()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <TrendAnalysis customers={filteredCustomers} />
                <AnomalyDetection customers={filteredCustomers} />
              </div>
            </TabsContent>

            <TabsContent value="correlations" className="space-y-4">
              <CorrelationMatrix customers={filteredCustomers} />
            </TabsContent>

            <TabsContent value="comparisons" className="space-y-4">
              <DivisionComparison customers={filteredCustomers} />
            </TabsContent>

            <TabsContent value="predictions" className="space-y-4">
              <PredictiveAnalytics customers={filteredCustomers} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
