"use client"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Severity, Status } from "@/lib/data"

interface IncidentFiltersProps {
  severityFilter: Severity | "all"
  statusFilter: Status | "all"
  locationFilter: string
  searchQuery: string
  onSeverityChange: (value: Severity | "all") => void
  onStatusChange: (value: Status | "all") => void
  onLocationChange: (value: string) => void
  onSearchChange: (value: string) => void
}

const locations = [
  "Ward A",
  "Ward B",
  "Ward C",
  "Emergency",
  "Pharmacy",
  "Reception",
]

export function IncidentFilters({
  severityFilter,
  statusFilter,
  locationFilter,
  searchQuery,
  onSeverityChange,
  onStatusChange,
  onLocationChange,
  onSearchChange,
}: IncidentFiltersProps) {
  const hasFilters =
    severityFilter !== "all" ||
    statusFilter !== "all" ||
    locationFilter !== "all" ||
    searchQuery !== ""

  const clearFilters = () => {
    onSeverityChange("all")
    onStatusChange("all")
    onLocationChange("all")
    onSearchChange("")
  }

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-center">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by title or ID..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Severity Filter */}
      <Select
        value={severityFilter}
        onValueChange={(v) => onSeverityChange(v as Severity | "all")}
      >
        <SelectTrigger className="w-full sm:w-[140px]">
          <SelectValue placeholder="Severity" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Severity</SelectItem>
          <SelectItem value="critical">Critical</SelectItem>
          <SelectItem value="high">High</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="low">Low</SelectItem>
        </SelectContent>
      </Select>

      {/* Status Filter */}
      <Select
        value={statusFilter}
        onValueChange={(v) => onStatusChange(v as Status | "all")}
      >
        <SelectTrigger className="w-full sm:w-[140px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="open">Open</SelectItem>
          <SelectItem value="in-progress">In Progress</SelectItem>
          <SelectItem value="resolved">Resolved</SelectItem>
          <SelectItem value="closed">Closed</SelectItem>
        </SelectContent>
      </Select>

      {/* Location Filter */}
      <Select value={locationFilter} onValueChange={onLocationChange}>
        <SelectTrigger className="w-full sm:w-[140px]">
          <SelectValue placeholder="Location" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Locations</SelectItem>
          {locations.map((location) => (
            <SelectItem key={location} value={location}>
              {location}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Clear Filters */}
      {hasFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="gap-1"
        >
          <X className="h-4 w-4" />
          Clear
        </Button>
      )}
    </div>
  )
}
