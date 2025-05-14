"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { type Customer, getUniqueValues } from "@/lib/data"
import { X } from "lucide-react"

interface FilterBarProps {
  onFilterChange: (filters: Partial<Customer>) => void
}

export function FilterBar({ onFilterChange }: FilterBarProps) {
  const [filters, setFilters] = useState<Partial<Customer>>({})

  const divisions = getUniqueValues("division")
  const genders = getUniqueValues("gender")
  const maritalStatuses = getUniqueValues("maritalStatus")

  const handleFilterChange = (key: keyof Customer, value: string | null) => {
    const newFilters = { ...filters }

    if (value) {
      newFilters[key] = value
    } else {
      delete newFilters[key]
    }

    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    setFilters({})
    onFilterChange({})
  }

  return (
    <div className="bg-card border rounded-lg p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
          <div>
            <Select
              value={(filters.division as string) || ""}
              onValueChange={(value) => handleFilterChange("division", value || null)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Division" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Divisions</SelectItem>
                {divisions.map((division) => (
                  <SelectItem key={division as string} value={division as string}>
                    {division as string}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select
              value={(filters.gender as string) || ""}
              onValueChange={(value) => handleFilterChange("gender", value || null)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genders</SelectItem>
                {genders.map((gender) => (
                  <SelectItem key={gender as string} value={gender as string}>
                    {gender === "M" ? "Male" : "Female"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select
              value={(filters.maritalStatus as string) || ""}
              onValueChange={(value) => handleFilterChange("maritalStatus", value || null)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Marital Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {maritalStatuses.map((status) => (
                  <SelectItem key={status as string} value={status as string}>
                    {status as string}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={clearFilters}
          className="flex items-center gap-1"
          disabled={Object.keys(filters).length === 0}
        >
          <X className="h-4 w-4" />
          Clear Filters
        </Button>
      </div>

      {Object.keys(filters).length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {Object.entries(filters).map(([key, value]) => (
            <div
              key={key}
              className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-md flex items-center gap-1"
            >
              <span className="capitalize">
                {key}: {value}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => handleFilterChange(key as keyof Customer, null)}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove filter</span>
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
