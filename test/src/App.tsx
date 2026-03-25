import { Navigate, Route, Routes } from "react-router-dom"
import { ActivityPage } from "./pages/activity"
import { HelpPage } from "./pages/help"
import { IncidentsPage } from "./pages/incidents"
import { IncidentDetailPage } from "./pages/incidents/IncidentDetailPage"
import { ReportsPage } from "./pages/reports"
import { SettingsPage } from "./pages/settings"
import { StaffPage } from "./pages/staff"
import { DashboardPage } from "./pages"

export default function App() {
  return (
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
  )
}

