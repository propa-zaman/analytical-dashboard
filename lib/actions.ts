"use server"

import { revalidatePath } from "next/cache"
import { customers } from "./data"

// Customer actions
export async function getCustomer(id: string) {
  try {
    // Simulate database lookup
    await new Promise((resolve) => setTimeout(resolve, 500))
    const customer = customers.find((c) => c.id === id)

    if (!customer) {
      throw new Error("Customer not found")
    }

    return { success: true, data: customer }
  } catch (error) {
    console.error("Error fetching customer:", error)
    return { success: false, error: "Failed to fetch customer" }
  }
}

export async function updateCustomer(data: any) {
  try {
    // Simulate database update
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const index = customers.findIndex((c) => c.id === data.id)
    if (index === -1) {
      throw new Error("Customer not found")
    }

    // Update customer data
    customers[index] = { ...customers[index], ...data }

    revalidatePath("/dashboard/customers")
    return { success: true, data: customers[index] }
  } catch (error) {
    console.error("Error updating customer:", error)
    return { success: false, error: "Failed to update customer" }
  }
}

export async function deleteCustomer(id: string) {
  try {
    // Simulate database delete
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const index = customers.findIndex((c) => c.id === id)
    if (index === -1) {
      throw new Error("Customer not found")
    }

    // In a real app, you would delete from the database
    // Here we're just simulating by filtering the array
    const updatedCustomers = customers.filter((c) => c.id !== id)

    // Update our in-memory array (this is just for simulation)
    customers.splice(index, 1)

    revalidatePath("/dashboard/customers")
    return { success: true }
  } catch (error) {
    console.error("Error deleting customer:", error)
    return { success: false, error: "Failed to delete customer" }
  }
}

// User profile actions
export async function updateUserProfile(data: {
  id: string
  name: string
  email: string
  phone?: string
  jobTitle?: string
  department?: string
}) {
  try {
    // Simulate database update
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real app, you would update the user in the database
    console.log("Updating user profile:", data)

    revalidatePath("/dashboard/settings")
    return { success: true }
  } catch (error) {
    console.error("Error updating user profile:", error)
    return { success: false, error: "Failed to update user profile" }
  }
}

// Appearance settings actions
export async function saveAppearanceSettings(data: {
  colorScheme: string
  fontSize: string
  reducedMotion: boolean
  highContrast: boolean
}) {
  try {
    // Simulate database update
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real app, you would save these settings to the user's profile
    console.log("Saving appearance settings:", data)

    return { success: true }
  } catch (error) {
    console.error("Error saving appearance settings:", error)
    return { success: false, error: "Failed to save appearance settings" }
  }
}
