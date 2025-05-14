"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Sidebar } from "@/components/dashboard/sidebar"
import { FilterBar } from "@/components/dashboard/filter-bar"
import { CustomerTable } from "@/components/dashboard/customer-table"
import { CustomerSegments } from "@/components/dashboard/customer-segments"
import { CustomerMetrics } from "@/components/dashboard/customer-metrics"
import { CustomerDemographics } from "@/components/dashboard/customer-demographics"
import { CustomerValueDistribution } from "@/components/dashboard/customer-value-distribution"
import { type Customer, customers, filterCustomers } from "@/lib/data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function CustomersPage() {
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
            <h1 className="text-3xl font-bold tracking-tight">Customer Analysis</h1>
            <p className="text-muted-foreground">Detailed analysis and segmentation of your customer base.</p>
          </div>

          <FilterBar onFilterChange={handleFilterChange} />

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="segments">Customer Segments</TabsTrigger>
              <TabsTrigger value="demographics">Demographics</TabsTrigger>
              <TabsTrigger value="data">Customer Data</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <CustomerMetrics customers={filteredCustomers} />

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Key Insights</CardTitle>
                    <CardDescription>Important patterns in your customer data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Income Distribution</h4>
                        <p className="text-sm text-muted-foreground">
                          {Math.round(
                            (filteredCustomers.filter((c) => c.income > 50000).length / filteredCustomers.length) * 100,
                          )}
                          % of customers have an income above $50,000, representing your premium customer segment.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">Age Demographics</h4>
                        <p className="text-sm text-muted-foreground">
                          The average customer age is{" "}
                          {Math.round(filteredCustomers.reduce((sum, c) => sum + c.age, 0) / filteredCustomers.length)}{" "}
                          years old, with {filteredCustomers.filter((c) => c.age < 30).length} customers under 30.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">Regional Distribution</h4>
                        <p className="text-sm text-muted-foreground">
                          {(() => {
                            const divisionCounts: Record<string, number> = {}
                            filteredCustomers.forEach((c) => {
                              divisionCounts[c.division] = (divisionCounts[c.division] || 0) + 1
                            })
                            const topDivision = Object.entries(divisionCounts).sort((a, b) => b[1] - a[1])[0]
                            return `${topDivision[0]} is your largest market with ${topDivision[1]} customers (${Math.round((topDivision[1] / filteredCustomers.length) * 100)}% of total).`
                          })()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <CustomerValueDistribution customers={filteredCustomers} />
              </div>
            </TabsContent>

            <TabsContent value="segments" className="space-y-4">
              <CustomerSegments customers={filteredCustomers} />
            </TabsContent>

            <TabsContent value="demographics" className="space-y-4">
              <CustomerDemographics customers={filteredCustomers} />
            </TabsContent>

            <TabsContent value="data" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Database</CardTitle>
                  <CardDescription>Complete listing of customer records</CardDescription>
                </CardHeader>
                <CardContent>
                  <CustomerTable customers={filteredCustomers} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
