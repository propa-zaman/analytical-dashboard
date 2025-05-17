"use client"

import { useState, useEffect, useRef } from "react"
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
import { Printer, Share2, Mail, Link, FileSpreadsheet, FileIcon as FilePdf } from "lucide-react"
import {
  exportToPDF,
  exportToExcel,
  prepareCustomerDataForExcel,
  shareViaEmail,
  copyShareableLink,
} from "@/lib/export-utils"
import type { ExcelExportData } from "@/lib/export-utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/hooks/use-toast"

// Define types for segments and regional data
interface CustomerSegment {
  name: string
  count: number
  avgAge: number
  avgIncome: number
  percentage: number
  ageSum: number
  incomeSum: number
}

interface RegionalData {
  name: string
  customers: number
  malePercentage: number
  femalePercentage: number
  avgIncome: number
}

interface SegmentExcelData {
  Segment: string
  Count: number
  "Average Age": number
  "Average Income": number
  Percentage: number
  [key: string]: string | number
}

interface RegionalExcelData {
  Division: string
  Customers: number
  "Male %": number
  "Female %": number
  "Avg Income": number
  [key: string]: string | number
}

export default function ReportsPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>(customers)
  const [reportDate, setReportDate] = useState<string>(new Date().toISOString().split("T")[0])
  const [activeTab, setActiveTab] = useState("executive")
  const reportRef = useRef<HTMLDivElement>(null)
  const [isExporting, setIsExporting] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    // Set report date to the first day of the current month for consistency
    const firstDayOfMonth = new Date()
    firstDayOfMonth.setDate(1)
    setReportDate(firstDayOfMonth.toISOString().split("T")[0])
  }, [])

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

  const handleExportPDF = async () => {
    if (isExporting) return

    setIsExporting(true)
    try {
      const reportElement = reportRef.current
      if (!reportElement) {
        throw new Error("Report element not found")
      }

      // Get the active tab content
      const tabContent = reportElement.querySelector(`[data-tab="${activeTab}"]`)
      if (!tabContent) {
        throw new Error("Tab content not found")
      }

      // Set a temporary ID for the tab content
      const tempId = `export-${activeTab}-${Date.now()}`
      tabContent.setAttribute("id", tempId)

      // Export the tab content to PDF
      const filename = `${activeTab}-report-${new Date().toLocaleDateString().replace(/\//g, "-")}.pdf`
      const success = await exportToPDF(tempId, filename)

      // Remove the temporary ID
      tabContent.removeAttribute("id")

      if (success) {
        toast({
          title: "Export Successful",
          description: `The ${getTabName(activeTab)} has been exported as PDF.`,
          variant: "default",
        })
      } else {
        throw new Error("Failed to export PDF")
      }
    } catch (error) {
      console.error("Error exporting PDF:", error)
      toast({
        title: "Export Failed",
        description: "There was an error exporting the report. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  const handleExportExcel = () => {
    try {
      // Prepare data based on the active tab
      let data: (SegmentExcelData | RegionalExcelData)[] | ReturnType<typeof prepareCustomerDataForExcel> = []
      const filename = `${activeTab}-report-${new Date().toLocaleDateString().replace(/\//g, "-")}.xlsx`

      switch (activeTab) {
        case "executive":
          data = prepareCustomerDataForExcel(filteredCustomers)
          break
        case "segments":
          // Prepare segment-specific data
          const segments = getCustomerSegments(filteredCustomers)
          data = segments.map((segment): SegmentExcelData => ({
            Segment: segment.name,
            Count: segment.count,
            "Average Age": segment.avgAge,
            "Average Income": segment.avgIncome,
            Percentage: segment.percentage,
          }))
          break
        case "regional":
          // Prepare regional data
          const regions = getRegionalData(filteredCustomers)
          data = regions.map((region): RegionalExcelData => ({
            Division: region.name,
            Customers: region.customers,
            "Male %": region.malePercentage,
            "Female %": region.femalePercentage,
            "Avg Income": region.avgIncome,
          }))
          break
        default:
          data = prepareCustomerDataForExcel(filteredCustomers)
      }

      const success = exportToExcel(data as ExcelExportData[], filename)

      if (success) {
        toast({
          title: "Export Successful",
          description: `The ${getTabName(activeTab)} has been exported as Excel.`,
          variant: "default",
        })
      } else {
        throw new Error("Failed to export Excel")
      }
    } catch (error) {
      console.error("Error exporting Excel:", error)
      toast({
        title: "Export Failed",
        description: "There was an error exporting the report. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleShareViaEmail = () => {
    const subject = `${getTabName(activeTab)} Report - ${new Date().toLocaleDateString()}`
    const body = `
Hello,

I'd like to share the ${getTabName(activeTab)} Report from our Analytics Dashboard.

Report Date: ${new Date(reportDate).toLocaleDateString()}
Total Customers: ${filteredCustomers.length}
Total Income: $${filteredCustomers.reduce((sum, c) => sum + c.income, 0).toLocaleString()}

You can view the full report by logging into the Analytics Dashboard.

Best regards,
${user.name}
    `

    const success = shareViaEmail(subject, body)

    if (success) {
      toast({
        title: "Share Initiated",
        description: "Your email client has been opened with the report details.",
        variant: "default",
      })
    } else {
      toast({
        title: "Share Failed",
        description: "There was an error opening your email client. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleCopyLink = async () => {
    const success = await copyShareableLink()

    if (success) {
      toast({
        title: "Link Copied",
        description: "Shareable link has been copied to clipboard.",
        variant: "default",
      })
    } else {
      toast({
        title: "Copy Failed",
        description: "There was an error copying the link. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Helper function to get customer segments
  const getCustomerSegments = (customers: Customer[]): CustomerSegment[] => {
    // This is a simplified version - in a real app, you'd have more sophisticated segmentation
    const segments: CustomerSegment[] = [
      { name: "High Income", count: 0, avgAge: 0, avgIncome: 0, percentage: 0, ageSum: 0, incomeSum: 0 },
      { name: "Middle Income", count: 0, avgAge: 0, avgIncome: 0, percentage: 0, ageSum: 0, incomeSum: 0 },
      { name: "Low Income", count: 0, avgAge: 0, avgIncome: 0, percentage: 0, ageSum: 0, incomeSum: 0 },
    ]

    customers.forEach((customer) => {
      let segment
      if (customer.income >= 75000) {
        segment = segments[0] // High Income
      } else if (customer.income >= 35000) {
        segment = segments[1] // Middle Income
      } else {
        segment = segments[2] // Low Income
      }

      segment.count++
      segment.ageSum += customer.age
      segment.incomeSum += customer.income
    })

    // Calculate averages and percentages
    segments.forEach((segment) => {
      if (segment.count > 0) {
        segment.avgAge = Math.round(segment.ageSum / segment.count)
        segment.avgIncome = Math.round(segment.incomeSum / segment.count)
      }
      segment.percentage = Math.round((segment.count / customers.length) * 100)
    })

    return segments
  }

  // Helper function to get regional data
  const getRegionalData = (customers: Customer[]): RegionalData[] => {
    const divisions: Record<
      string,
      {
        name: string
        customers: number
        males: number
        females: number
        totalIncome: number
      }
    > = {}

    customers.forEach((customer) => {
      if (!divisions[customer.division]) {
        divisions[customer.division] = {
          name: customer.division,
          customers: 0,
          males: 0,
          females: 0,
          totalIncome: 0,
        }
      }

      divisions[customer.division].customers++
      if (customer.gender === "M") {
        divisions[customer.division].males++
      } else {
        divisions[customer.division].females++
      }
      divisions[customer.division].totalIncome += customer.income
    })

    return Object.values(divisions).map((division): RegionalData => ({
      name: division.name,
      customers: division.customers,
      malePercentage: Math.round((division.males / division.customers) * 100),
      femalePercentage: Math.round((division.females / division.customers) * 100),
      avgIncome: Math.round(division.totalIncome / division.customers),
    }))
  }

  // Helper function to get tab name
  const getTabName = (tab: string) => {
    switch (tab) {
      case "executive":
        return "Executive Summary"
      case "segments":
        return "Customer Segments Report"
      case "regional":
        return "Regional Performance Report"
      case "metrics":
        return "Key Metrics Report"
      case "recommendations":
        return "Recommendations Report"
      default:
        return "Report"
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <div className="flex-1 overflow-auto">
        <div className="p-6" ref={reportRef}>
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
              <p className="text-muted-foreground">
                Comprehensive reports and summaries of your customer data as of{" "}
                <span className="font-medium">{new Date(reportDate).toLocaleDateString()}</span>
              </p>
            </div>
            <div className="flex items-center gap-2 print:hidden">
              <Button variant="outline" size="sm" onClick={handleExportPDF} disabled={isExporting}>
                <FilePdf className="mr-2 h-4 w-4" />
                Export PDF
              </Button>

              <Button variant="outline" size="sm" onClick={handleExportExcel}>
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Export Excel
              </Button>

              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="mr-2 h-4 w-4" />
                Print
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleShareViaEmail}>
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleCopyLink}>
                    <Link className="mr-2 h-4 w-4" />
                    Copy Link
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="print:hidden">
            <FilterBar onFilterChange={handleFilterChange} />
          </div>

          <Tabs defaultValue="executive" className="space-y-4" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="print:hidden">
              <TabsTrigger value="executive">Executive Summary</TabsTrigger>
              <TabsTrigger value="segments">Customer Segments</TabsTrigger>
              <TabsTrigger value="regional">Regional Performance</TabsTrigger>
              <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>

            <TabsContent value="executive" className="space-y-4" data-tab="executive">
              <ExecutiveSummary customers={filteredCustomers} reportDate={reportDate} />
            </TabsContent>

            <TabsContent value="segments" className="space-y-4" data-tab="segments">
              <CustomerSegmentReport customers={filteredCustomers} reportDate={reportDate} />
            </TabsContent>

            <TabsContent value="regional" className="space-y-4" data-tab="regional">
              <RegionalPerformance customers={filteredCustomers} reportDate={reportDate} />
            </TabsContent>

            <TabsContent value="metrics" className="space-y-4" data-tab="metrics">
              <KeyMetricsReport customers={filteredCustomers} reportDate={reportDate} />
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-4" data-tab="recommendations">
              <RecommendationsReport customers={filteredCustomers} reportDate={reportDate} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}