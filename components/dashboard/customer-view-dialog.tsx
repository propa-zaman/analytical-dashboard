"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { getCustomer } from "@/lib/actions"
import { useToast } from "@/hooks/use-toast"
import type { Customer } from "@/lib/data"

interface CustomerViewDialogProps {
  customerId: string | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CustomerViewDialog({ customerId, open, onOpenChange }: CustomerViewDialogProps) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCustomer() {
      if (!customerId) return

      setLoading(true)
      setError(null)

      try {
        const result = await getCustomer(customerId)
        
        if (result.success && result.data) {
          setCustomer(result.data)
        } else {
          setError(result.error || "Customer not found")
          toast({
            title: "Error",
            description: result.error || "Failed to load customer details",
            variant: "destructive",
          })
        }
      } catch (err) {
        setError("Failed to load customer details")
        toast({
          title: "Error",
          description: "Failed to load customer details",
          variant: "destructive",
        })
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (open && customerId) {
      fetchCustomer()
    } else {
      // Reset state when dialog closes
      setCustomer(null)
      setError(null)
    }
  }, [customerId, open, toast])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Customer Details</DialogTitle>
          <DialogDescription>Detailed information about the customer.</DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="py-6 text-center text-red-500">{error}</div>
        ) : customer ? (
          <div className="py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">ID</h3>
                <p className="mt-1">{customer.id}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Name</h3>
                <p className="mt-1">{customer.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Division</h3>
                <p className="mt-1">{customer.division}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Gender</h3>
                <p className="mt-1">{customer.gender === "M" ? "Male" : "Female"}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Marital Status</h3>
                <p className="mt-1">{customer.maritalStatus}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Age</h3>
                <p className="mt-1">{customer.age}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Income</h3>
                <p className="mt-1">{customer.income > 0 ? `$${customer.income.toLocaleString()}` : "-"}</p>
              </div>
            </div>
          </div>
        ) : null}

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}