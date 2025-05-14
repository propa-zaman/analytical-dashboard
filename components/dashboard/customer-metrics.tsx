import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Customer } from "@/lib/data"
import { Users, DollarSign, Percent, TrendingUp } from "lucide-react"

interface CustomerMetricsProps {
  customers: Customer[]
}

export function CustomerMetrics({ customers }: CustomerMetricsProps) {
  // Calculate metrics
  const totalCustomers = customers.length
  const customersWithIncome = customers.filter((c) => c.income > 0).length
  const incomePercentage = totalCustomers > 0 ? Math.round((customersWithIncome / totalCustomers) * 100) : 0

  const totalIncome = customers.reduce((sum, customer) => sum + customer.income, 0)
  const averageIncome = customersWithIncome > 0 ? Math.round(totalIncome / customersWithIncome) : 0

  // Calculate gender distribution
  const maleCustomers = customers.filter((c) => c.gender === "M").length
  const femaleCustomers = customers.filter((c) => c.gender === "F").length
  const genderRatio = totalCustomers > 0 ? Math.round((maleCustomers / totalCustomers) * 100) : 0

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalCustomers}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {maleCustomers} male / {femaleCustomers} female
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Income</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${averageIncome.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground mt-1">Per customer with income</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Income Percentage</CardTitle>
          <Percent className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{incomePercentage}%</div>
          <p className="text-xs text-muted-foreground mt-1">Customers with income</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Gender Ratio</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{genderRatio}%</div>
          <p className="text-xs text-muted-foreground mt-1">Male customers</p>
        </CardContent>
      </Card>
    </div>
  )
}
