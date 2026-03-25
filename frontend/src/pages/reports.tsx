import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { ReportsDashboard } from "@/components/reports/reports-dashboard"

export function ReportsPage() {
  return (
    <DashboardShell
      title="Reports"
      subtitle="Analytics and insights for incident management"
    >
      <ReportsDashboard />
    </DashboardShell>
  )
}

