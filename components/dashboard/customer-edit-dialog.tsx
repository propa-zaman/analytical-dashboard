"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { getCustomer, updateCustomer } from "@/lib/actions"
import { getUniqueValues } from "@/lib/data"
import type { Customer } from "@/lib/data"

interface CustomerEditDialogProps {
  customerId: string | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CustomerEditDialog({ customerId, open, onOpenChange }: CustomerEditDialogProps) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Get unique values for dropdowns
  const divisions = getUniqueValues("division") as string[]
  const maritalStatuses = getUniqueValues("maritalStatus") as string[]

  // Form setup
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Customer>()

  // Fetch customer data when dialog opens
  useEffect(() => {
    async function fetchCustomer() {
      if (!customerId) return

      setLoading(true)
      setError(null)

      try {
        const data = await getCustomer(customerId)
        if (data) {
          // Populate form with customer data
          Object.entries(data).forEach(([key, value]) => {
            setValue(key as keyof Customer, value)
          })
        } else {
          setError("Customer not found")
        }
      } catch (err) {
        setError("Failed to load customer details")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (open && customerId) {
      fetchCustomer()
    } else {
      // Reset form when dialog closes
      reset()
    }
  }, [customerId, open, reset, setValue])

  // Handle form submission
  const onSubmit = async (data: Customer) => {
    if (!customerId) return

    setSubmitting(true)

    try {
      // Include the ID in the data object for updating
      const result = await updateCustomer({ ...data, id: customerId })

      if (result.success) {
        toast({
          title: "Success",
        })
        onOpenChange(false)
      } else {
        toast({
          title: "Error",
          variant: "destructive",
        })
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Customer</DialogTitle>
          <DialogDescription>Update customer information. Click save when you&apos;re done.</DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="py-6 text-center text-red-500">{error}</div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...register("name", { required: "Name is required" })} />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="division">Division</Label>
                <Select onValueChange={(value) => setValue("division", value)} defaultValue={divisions[0]}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select division" />
                  </SelectTrigger>
                  <SelectContent>
                    {divisions.map((division) => (
                      <SelectItem key={division} value={division}>
                        {division}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select onValueChange={(value) => setValue("gender", value)} defaultValue="M">
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="M">Male</SelectItem>
                    <SelectItem value="F">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maritalStatus">Marital Status</Label>
                <Select onValueChange={(value) => setValue("maritalStatus", value)} defaultValue={maritalStatuses[0]}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {maritalStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  {...register("age", {
                    required: "Age is required",
                    min: { value: 18, message: "Age must be at least 18" },
                    max: { value: 100, message: "Age must be less than 100" },
                  })}
                />
                {errors.age && <p className="text-sm text-red-500">{errors.age.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="income">Income</Label>
                <Input
                  id="income"
                  type="number"
                  {...register("income", {
                    min: { value: 0, message: "Income cannot be negative" },
                  })}
                />
                {errors.income && <p className="text-sm text-red-500">{errors.income.message}</p>}
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}