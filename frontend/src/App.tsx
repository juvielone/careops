import { Suspense, lazy } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { PageSpinner } from "./components/ui/page-spinner"

const DashboardPage = lazy(() =>
  import("./pages").then((m) => ({ default: m.DashboardPage })),
)
const ActivityPage = lazy(() =>
  import("./pages/activity").then((m) => ({ default: m.ActivityPage })),
)
const HelpPage = lazy(() =>
  import("./pages/help").then((m) => ({ default: m.HelpPage })),
)
const IncidentsPage = lazy(() =>
  import("./pages/incidents").then((m) => ({ default: m.IncidentsPage })),
)
const IncidentDetailPage = lazy(() =>
  import("./pages/incidents/IncidentDetailPage").then((m) => ({
    default: m.IncidentDetailPage,
  })),
)
const ReportsPage = lazy(() =>
  import("./pages/reports").then((m) => ({ default: m.ReportsPage })),
)
const SettingsPage = lazy(() =>
  import("./pages/settings").then((m) => ({ default: m.SettingsPage })),
)
const StaffPage = lazy(() =>
  import("./pages/staff").then((m) => ({ default: m.StaffPage })),
)

export default function App() {
  return (
    <Suspense fallback={<PageSpinner />}>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/activity" element={<ActivityPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/incidents" element={<IncidentsPage />} />
        <Route path="/incidents/:id" element={<IncidentDetailPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/staff" element={<StaffPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}

