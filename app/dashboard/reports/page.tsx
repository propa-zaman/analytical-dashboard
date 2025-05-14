"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Sidebar } from "@/components/dashboard/sidebar"
import { FilterBar } from "@/components/dashboard/filter-bar"
import { ExecutiveSummary } from "@/components/dashboard/reports/executive-summary"
import { CustomerSegmentReport } from "@/components/dashboard/reports/customer-segment-report"
import { RegionalPerformance } from "@/components/dashboard/reports/regional-performance"
import { KeyMetricsReport } from "@/components/dashboard/reports/key-metrics-report"
import { RecommendationsReport } from "@/components/dashboard/reports/recommendations-report"
import { type Customer, customers, filterCustomers } from "@/lib/data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download, Printer, Share2 } from "lucide-react"

export default function ReportsPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>(customers)
  const [reportDate, setReportDate] = useState<string>(new Date().toISOString().split("T")[0])

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

  const handleExport = (format: string) => {
    alert(`Report exported as ${format}. This is a demo feature.`)
  }

  const handlePrint = () => {
    window.print()
  }

  const handleShare = () => {
    alert("Report shared. This is a demo feature.")
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
              <p className="text-muted-foreground">
                Comprehensive reports and summaries of your customer data as of{" "}
                <span className="font-medium">{new Date(reportDate).toLocaleDateString()}</span>
              </p>
            </div>
            <div className="flex items-center gap-2 print:hidden">
              <Button variant="outline" size="sm" onClick={() => handleExport("pdf")}>
                <Download className="mr-2 h-4 w-4" />
                Export PDF
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleExport("excel")}>
                <Download className="mr-2 h-4 w-4" />
                Export Excel
              </Button>
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="mr-2 h-4 w-4" />
                Print
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>

          <div className="print:hidden">
            <FilterBar onFilterChange={handleFilterChange} />
          </div>

          <Tabs defaultValue="executive" className="space-y-4">
            <TabsList className="print:hidden">
              <TabsTrigger value="executive">Executive Summary</TabsTrigger>
              <TabsTrigger value="segments">Customer Segments</TabsTrigger>
              <TabsTrigger value="regional">Regional Performance</TabsTrigger>
              <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>

            <TabsContent value="executive" className="space-y-4">
              <ExecutiveSummary customers={filteredCustomers} reportDate={reportDate} />
            </TabsContent>

            <TabsContent value="segments" className="space-y-4">
              <CustomerSegmentReport customers={filteredCustomers} reportDate={reportDate} />
            </TabsContent>

            <TabsContent value="regional" className="space-y-4">
              <RegionalPerformance customers={filteredCustomers} reportDate={reportDate} />
            </TabsContent>

            <TabsContent value="metrics" className="space-y-4">
              <KeyMetricsReport customers={filteredCustomers} reportDate={reportDate} />
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-4">
              <RecommendationsReport customers={filteredCustomers} reportDate={reportDate} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
