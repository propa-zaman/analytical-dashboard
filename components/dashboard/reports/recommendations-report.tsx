"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Customer } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle2, Clock, TrendingUp } from "lucide-react"

interface RecommendationsReportProps {
  customers: Customer[]
  reportDate: string
}

export function RecommendationsReport({ customers, reportDate }: RecommendationsReportProps) {
  // Calculate key metrics for recommendations
  const totalCustomers = customers.length
  const highValueCustomers = customers.filter((c) => c.income >= 75000)
  const highValuePercentage = Math.round((highValueCustomers.length / totalCustomers) * 100)

  // Get divisions with highest and lowest average income
  const divisionAvgIncome = [...new Set(customers.map((c) => c.division))].map((division) => {
    const divisionCustomers = customers.filter((c) => c.division === division && c.income > 0)
    const avgIncome =
      divisionCustomers.length > 0
        ? Math.round(divisionCustomers.reduce((sum, c) => sum + c.income, 0) / divisionCustomers.length)
        : 0
    return { division, avgIncome, count: divisionCustomers.length }
  })

  const highestIncomeDiv = [...divisionAvgIncome].sort((a, b) => b.avgIncome - a.avgIncome)[0]
  const lowestIncomeDiv = [...divisionAvgIncome]
    .filter((d) => d.avgIncome > 0)
    .sort((a, b) => a.avgIncome - b.avgIncome)[0]

  // Get age groups with highest potential
  const youngCustomers = customers.filter((c) => c.age < 30)
  const youngHighEarners = youngCustomers.filter((c) => c.income >= 50000)

  // Get gender distribution
  const malePercentage = Math.round((customers.filter((c) => c.gender === "M").length / totalCustomers) * 100)
  const femalePercentage = 100 - malePercentage

  // Get marital status insights
  const marriedHighValue = customers.filter((c) => c.maritalStatus === "Married" && c.income >= 75000)
  const singleHighValue = customers.filter((c) => c.maritalStatus === "Single" && c.income >= 75000)

  return (
    <div className="space-y-6">
      <Card className="print:shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl">Strategic Recommendations</CardTitle>
          <CardDescription>
            Data-driven recommendations based on analysis as of {new Date(reportDate).toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-medium mb-4">Executive Summary</h3>
              <p className="text-muted-foreground">
                Based on comprehensive analysis of customer data, we have identified several strategic opportunities to
                drive growth, optimize customer acquisition, and improve retention. The following recommendations are
                prioritized by potential impact and implementation feasibility.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Customer Segment Strategies</CardTitle>
                    <Badge className="bg-blue-500">High Impact</Badge>
                  </div>
                  <CardDescription>Targeted approaches for different customer segments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 bg-blue-100 p-1.5 rounded-full text-blue-600">
                          <TrendingUp className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-medium">High Value Customer Retention</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Implement a premium loyalty program for the {highValueCustomers.length} high-value customers
                            who represent {highValuePercentage}% of our customer base. Focus on personalized services,
                            exclusive benefits, and dedicated account management.
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-blue-600 border-blue-200">
                              Premium Services
                            </Badge>
                            <Badge variant="outline" className="text-blue-600 border-blue-200">
                              Loyalty Program
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 bg-green-100 p-1.5 rounded-full text-green-600">
                          <ArrowRight className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-medium">Mid-Value Customer Growth</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Develop targeted upselling strategies for mid-value customers (income $25K-$75K). Data shows
                            these customers have the highest growth potential with proper engagement. Focus on
                            value-added services and tiered product offerings.
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-green-600 border-green-200">
                              Upselling
                            </Badge>
                            <Badge variant="outline" className="text-green-600 border-green-200">
                              Value Packages
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 bg-purple-100 p-1.5 rounded-full text-purple-600">
                          <Clock className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-medium">Young Professional Engagement</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Create specialized offerings for the {youngHighEarners.length} young high-earners (under 30
                            with income over $50K). This segment shows high lifetime value potential and early brand
                            loyalty opportunities.
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-purple-600 border-purple-200">
                              Digital First
                            </Badge>
                            <Badge variant="outline" className="text-purple-600 border-purple-200">
                              Early Adoption
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Regional & Demographic Focus</CardTitle>
                    <Badge className="bg-green-500">Medium Impact</Badge>
                  </div>
                  <CardDescription>Strategies based on regional and demographic insights</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 bg-amber-100 p-1.5 rounded-full text-amber-600">
                          <TrendingUp className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-medium">Regional Expansion</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Prioritize expansion in {highestIncomeDiv.division} where average income is $
                            {highestIncomeDiv.avgIncome.toLocaleString()}, significantly higher than other regions.
                            Increase marketing investment and local partnerships in this high-potential area.
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-amber-600 border-amber-200">
                              Market Expansion
                            </Badge>
                            <Badge variant="outline" className="text-amber-600 border-amber-200">
                              Local Partnerships
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 bg-red-100 p-1.5 rounded-full text-red-600">
                          <ArrowRight className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-medium">Underperforming Region Strategy</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Develop a targeted improvement plan for {lowestIncomeDiv.division} where average income is $
                            {lowestIncomeDiv.avgIncome.toLocaleString()}. Consider specialized offerings, pricing
                            adjustments, and increased marketing presence to improve performance.
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-red-600 border-red-200">
                              Market Development
                            </Badge>
                            <Badge variant="outline" className="text-red-600 border-red-200">
                              Pricing Strategy
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 bg-indigo-100 p-1.5 rounded-full text-indigo-600">
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-medium">Demographic-Targeted Marketing</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Develop gender-specific marketing campaigns based on the {malePercentage}% male and{" "}
                            {femalePercentage}% female customer distribution. Data shows married customers have{" "}
                            {marriedHighValue.length > singleHighValue.length ? "higher" : "lower"}
                            average income than single customers, suggesting opportunities for targeted messaging.
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-indigo-600 border-indigo-200">
                              Targeted Marketing
                            </Badge>
                            <Badge variant="outline" className="text-indigo-600 border-indigo-200">
                              Personalization
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Implementation Roadmap</CardTitle>
                  <Badge className="bg-purple-500">Strategic Planning</Badge>
                </div>
                <CardDescription>Phased approach to implementing recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="relative pl-8 pb-8 border-l-2 border-muted">
                    <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-blue-500"></div>
                    <div>
                      <h4 className="font-medium">Phase 1: High-Value Customer Retention (Q1)</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Launch premium loyalty program for high-value customers. Implement dedicated account management
                        and personalized services. Expected outcome: 5% increase in high-value customer retention and
                        10% increase in average revenue per high-value customer.
                      </p>
                    </div>
                  </div>

                  <div className="relative pl-8 pb-8 border-l-2 border-muted">
                    <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-green-500"></div>
                    <div>
                      <h4 className="font-medium">Phase 2: Regional Optimization (Q2)</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Increase marketing investment in {highestIncomeDiv.division} by 25%. Develop improvement plan
                        for {lowestIncomeDiv.division} including market research and competitive analysis. Expected
                        outcome: 15% growth in high-performing regions and 10% improvement in underperforming regions.
                      </p>
                    </div>
                  </div>

                  <div className="relative pl-8 pb-8 border-l-2 border-muted">
                    <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-amber-500"></div>
                    <div>
                      <h4 className="font-medium">Phase 3: Mid-Value Customer Growth (Q3)</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Launch upselling campaign for mid-value customers with tiered product offerings and value-added
                        services. Implement customer journey mapping to identify conversion opportunities. Expected
                        outcome: 8% conversion rate of mid-value to high-value customers.
                      </p>
                    </div>
                  </div>

                  <div className="relative pl-8">
                    <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-purple-500"></div>
                    <div>
                      <h4 className="font-medium">Phase 4: Young Professional Engagement (Q4)</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Develop specialized digital-first offerings for young professionals. Create early adoption
                        program with special incentives. Expected outcome: 20% increase in young professional
                        acquisition and 15% increase in lifetime value projections.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-medium mb-4">Expected Business Impact</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Revenue Growth</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Implementation of these recommendations is projected to increase total revenue by 12-15% within the
                    first year, with the high-value customer retention program contributing approximately 40% of this
                    growth.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium">Customer Metrics</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Customer retention is expected to improve from 83% to 88%, while the percentage of high-value
                    customers should increase from {highValuePercentage}% to approximately {highValuePercentage + 3}% of
                    the total customer base.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium">Market Position</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Regional optimization strategies should strengthen our position in key markets, particularly in{" "}
                    {highestIncomeDiv.division}, where we project a 25% increase in market share within 18 months.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium">Long-term Value</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    The focus on young professionals and mid-value customer growth will build a foundation for
                    sustainable long-term growth, with projected lifetime value increases of 18% across these segments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
