"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import type { Customer } from "@/lib/data"
import { useAuth } from "@/context/auth-context"
import { MoreHorizontal, Edit, Trash, Eye } from "lucide-react"
import { CustomerViewDialog } from "./customer-view-dialog"
import { CustomerEditDialog } from "./customer-edit-dialog"
import { CustomerDeleteDialog } from "./customer-delete-dialog"

interface CustomerTableProps {
  customers: Customer[]
}

export function CustomerTable({ customers }: CustomerTableProps) {
  const { user } = useAuth()
  const [page, setPage] = useState(1)
  const pageSize = 10

  // State for dialogs
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

  const canEdit = user?.role === "admin" || user?.role === "sales"
  const canDelete = user?.role === "admin"

  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedCustomers = customers.slice(startIndex, endIndex)
  const totalPages = Math.ceil(customers.length / pageSize)

  // Handle view customer
  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer)
    setViewDialogOpen(true)
  }

  // Handle edit customer
  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer)
    setEditDialogOpen(true)
  }

  // Handle delete customer
  const handleDeleteCustomer = (customer: Customer) => {
    setSelectedCustomer(customer)
    setDeleteDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Division</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Marital Status</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Income</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedCustomers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.id}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.division}</TableCell>
                  <TableCell>{customer.gender === "M" ? "Male" : "Female"}</TableCell>
                  <TableCell>{customer.maritalStatus}</TableCell>
                  <TableCell>{customer.age}</TableCell>
                  <TableCell>{customer.income > 0 ? `$${customer.income.toLocaleString()}` : "-"}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleViewCustomer(customer)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View details
                        </DropdownMenuItem>
                        <DropdownMenuItem disabled={!canEdit} onClick={() => canEdit && handleEditCustomer(customer)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit customer
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          disabled={!canDelete}
                          onClick={() => canDelete && handleDeleteCustomer(customer)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete customer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-end space-x-2">
          <Button variant="outline" size="sm" onClick={() => setPage(page - 1)} disabled={page === 1}>
            Previous
          </Button>
          <div className="text-sm">
            Page {page} of {totalPages}
          </div>
          <Button variant="outline" size="sm" onClick={() => setPage(page + 1)} disabled={page === totalPages}>
            Next
          </Button>
        </div>
      )}

      {/* Customer View Dialog */}
      <CustomerViewDialog
        customerId={selectedCustomer?.id || null}
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
      />

      {/* Customer Edit Dialog */}
      <CustomerEditDialog
        customerId={selectedCustomer?.id || null}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
      />

      {/* Customer Delete Dialog */}
      <CustomerDeleteDialog
        customerId={selectedCustomer?.id || null}
        customerName={selectedCustomer?.name || null}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      />
    </div>
  )
}
