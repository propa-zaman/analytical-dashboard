"use server"

import { revalidatePath } from "next/cache"
import { getCustomers } from "./data"
import type { Customer } from "./data"

// Get a single customer by ID
export async function getCustomer(id: string): Promise<Customer | null> {
  try {
    // Simulate database lookup
    const customers = getCustomers()
    const customer = customers.find((c) => c.id === id)

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return customer || null
  } catch (error) {
    console.error("Error fetching customer:", error)
    throw new Error("Failed to fetch customer")
  }
}

// Update a customer
export async function updateCustomer(
  id: string,
  data: Partial<Customer>,
): Promise<{ success: boolean; message: string }> {
  try {
    // Simulate database update
    const customers = getCustomers()
    const customerIndex = customers.findIndex((c) => c.id === id)

    if (customerIndex === -1) {
      return { success: false, message: "Customer not found" }
    }

    // Update customer data (in a real app, this would be a database update)
    customers[customerIndex] = {
      ...customers[customerIndex],
      ...data,
      // Ensure id doesn't change
      id: customers[customerIndex].id,
    }

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Revalidate the customers page to reflect changes
    revalidatePath("/dashboard/customers")

    return { success: true, message: "Customer updated successfully" }
  } catch (error) {
    console.error("Error updating customer:", error)
    return { success: false, message: "Failed to update customer" }
  }
}

// Delete a customer
export async function deleteCustomer(id: string): Promise<{ success: boolean; message: string }> {
  try {
    // Simulate database delete
    const customers = getCustomers()
    const customerIndex = customers.findIndex((c) => c.id === id)

    if (customerIndex === -1) {
      return { success: false, message: "Customer not found" }
    }

    // Remove customer (in a real app, this would be a database delete)
    customers.splice(customerIndex, 1)

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Revalidate the customers page to reflect changes
    revalidatePath("/dashboard/customers")

    return { success: true, message: "Customer deleted successfully" }
  } catch (error) {
    console.error("Error deleting customer:", error)
    return { success: false, message: "Failed to delete customer" }
  }
}
