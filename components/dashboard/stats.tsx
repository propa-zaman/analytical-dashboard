import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Customer } from "@/lib/data"
import { Users, DollarSign, Percent, TrendingUp } from "lucide-react"

interface StatsProps {
  filteredCustomers: Customer[]
}

export function Stats({ filteredCustomers }: StatsProps) {
  // Calculate stats
  const totalCustomers = filteredCustomers.length
  const customersWithIncome = filteredCustomers.filter((c) => c.income > 0).length
  const incomePercentage = totalCustomers > 0 ? Math.round((customersWithIncome / totalCustomers) * 100) : 0

  const totalIncome = filteredCustomers.reduce((sum, customer) => sum + customer.income, 0)
  const averageIncome = customersWithIncome > 0 ? Math.round(totalIncome / customersWithIncome) : 0

  // Calculate change percentages (mock data for demo)
  const customerChange = 12
  const incomeChange = 8
  const percentageChange = 5
  const averageChange = 3

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalCustomers}</div>
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
            <span className={customerChange >= 0 ? "text-green-500" : "text-red-500"}>
              {customerChange >= 0 ? "+" : ""}
              {customerChange}%
            </span>
            from previous period
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Income</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalIncome.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
            <span className={incomeChange >= 0 ? "text-green-500" : "text-red-500"}>
              {incomeChange >= 0 ? "+" : ""}
              {incomeChange}%
            </span>
            from previous period
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Income Percentage</CardTitle>
          <Percent className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{incomePercentage}%</div>
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
            <span className={percentageChange >= 0 ? "text-green-500" : "text-red-500"}>
              {percentageChange >= 0 ? "+" : ""}
              {percentageChange}%
            </span>
            from previous period
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Income</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${averageIncome.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
            <span className={averageChange >= 0 ? "text-green-500" : "text-red-500"}>
              {averageChange >= 0 ? "+" : ""}
              {averageChange}%
            </span>
            from previous period
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
