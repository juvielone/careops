import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { IncidentPreview } from "@/components/dashboard/incident-preview"
import { RecentActivity } from "@/components/dashboard/recent-activity"

export function DashboardPage() {
  return (
    <DashboardShell
      title="Dashboard"
      subtitle="Welcome back, James. Here's what's happening today."
    >
      <div className="space-y-6">
        <StatsCards />

        <div className="grid gap-6 lg:grid-cols-2">
          <IncidentPreview />
          <RecentActivity />
        </div>
      </div>
    </DashboardShell>
  )
}

