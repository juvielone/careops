import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { ActivityLog } from "@/components/activity/activity-log"

export function ActivityPage() {
  return (
    <DashboardShell
      title="Activity Log"
      subtitle="Track all incident updates and changes"
    >
      <ActivityLog />
    </DashboardShell>
  )
}

