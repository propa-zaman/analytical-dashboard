"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Sidebar } from "@/components/dashboard/sidebar"
import { FilterBar } from "@/components/dashboard/filter-bar"
import { Stats } from "@/components/dashboard/stats"
import { CustomerTable } from "@/components/dashboard/customer-table"
import { PieChart } from "@/components/dashboard/charts/pie-chart"
import { BarChart } from "@/components/dashboard/charts/bar-chart"
import {
  type Customer,
  customers,
  filterCustomers,
  getDivisionData,
  getGenderData,
  getMaritalStatusData,
  getAgeDistribution,
  getIncomeDistribution,
  getAverageIncomeByDivision,
} from "@/lib/data"

export default function DashboardPage() {
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
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user.name}! Here's an overview of your customer data.
            </p>
          </div>

          <FilterBar onFilterChange={handleFilterChange} />

          <Stats filteredCustomers={filteredCustomers} />

          <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-card border rounded-lg p-4 h-[300px]">
              <PieChart data={getDivisionData()} title="Customers by Division" />
            </div>
            <div className="bg-card border rounded-lg p-4 h-[300px]">
              <PieChart data={getGenderData()} title="Gender Distribution" colors={["#3b82f6", "#ec4899"]} />
            </div>
            <div className="bg-card border rounded-lg p-4 h-[300px]">
              <PieChart
                data={getMaritalStatusData()}
                title="Marital Status Distribution"
                colors={["#10b981", "#f59e0b", "#ef4444"]}
              />
            </div>
          </div>

          <div className="grid gap-6 mt-6 md:grid-cols-2">
            <div className="bg-card border rounded-lg p-4 h-[300px]">
              <BarChart data={getAgeDistribution()} title="Age Distribution" color="#8b5cf6" />
            </div>
            <div className="bg-card border rounded-lg p-4 h-[300px]">
              <BarChart data={getIncomeDistribution()} title="Income Distribution" color="#10b981" />
            </div>
          </div>

          <div className="mt-6 bg-card border rounded-lg p-4 h-[300px]">
            <BarChart
              data={getAverageIncomeByDivision()}
              title="Average Income by Division"
              color="#f59e0b"
              valueFormatter={(value) => `$${value.toLocaleString()}`}
            />
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Customer Data</h2>
            <CustomerTable customers={filteredCustomers} />
          </div>
        </div>
      </div>
    </div>
  )
}
