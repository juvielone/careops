import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { StaffDirectory } from "@/components/staff/staff-directory"
import { staff } from "@/lib/data"

export function StaffPage() {
  return (
    <DashboardShell
      title="Staff Directory"
      subtitle={`${staff.length} staff members`}
    >
      <StaffDirectory />
    </DashboardShell>
  )
}

