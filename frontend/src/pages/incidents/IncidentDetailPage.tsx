import { useParams } from "react-router-dom"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { IncidentDetail } from "@/components/incidents/incident-detail"
import { incidents } from "@/lib/data"

export function IncidentDetailPage() {
  const params = useParams()
  const id = params.id ?? ""

  const incident = incidents.find((i) => i.id === id)

  if (!incident) {
    return (
      <DashboardShell
        title="Incident not found"
        subtitle={id ? `No incident exists for "${id}".` : "No incident selected."}
      >
        <div className="text-sm text-muted-foreground">
          The incident you are looking for may have been removed, or the link
          is incorrect.
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell title={incident.id} subtitle={incident.title}>
      <IncidentDetail incident={incident} />
    </DashboardShell>
  )
}

