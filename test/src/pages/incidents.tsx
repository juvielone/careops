import { useState } from "react"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { IncidentTable } from "@/components/incidents/incident-table"
import { IncidentFilters } from "@/components/incidents/incident-filters"
import { incidents, type Severity, type Status } from "@/lib/data"

export function IncidentsPage() {
  const [severityFilter, setSeverityFilter] = useState<Severity | "all">("all")
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all")
  const [locationFilter, setLocationFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredIncidents = incidents.filter((incident) => {
    const matchesSeverity =
      severityFilter === "all" || incident.severity === severityFilter
    const matchesStatus =
      statusFilter === "all" || incident.status === statusFilter
    const matchesLocation =
      locationFilter === "all" || incident.location.includes(locationFilter)
    const matchesSearch =
      searchQuery === "" ||
      incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.id.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesSeverity && matchesStatus && matchesLocation && matchesSearch
  })

  return (
    <DashboardShell
      title="Incidents"
      subtitle={`${filteredIncidents.length} incidents found`}
    >
      <div className="space-y-4">
        <IncidentFilters
          severityFilter={severityFilter}
          statusFilter={statusFilter}
          locationFilter={locationFilter}
          searchQuery={searchQuery}
          onSeverityChange={setSeverityFilter}
          onStatusChange={setStatusFilter}
          onLocationChange={setLocationFilter}
          onSearchChange={setSearchQuery}
        />
        <IncidentTable incidents={filteredIncidents} />
      </div>
    </DashboardShell>
  )
}

