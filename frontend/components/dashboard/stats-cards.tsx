import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, AlertCircle, CheckCircle2, Users } from "lucide-react"
import {
  getOpenIncidentsCount,
  getHighSeverityCount,
  getResolvedTodayCount,
  getStaffOnDutyCount,
} from "@/lib/data"

const stats = [
  {
    title: "Open Incidents",
    value: getOpenIncidentsCount(),
    icon: AlertTriangle,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    title: "High Severity",
    value: getHighSeverityCount(),
    icon: AlertCircle,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  {
    title: "Resolved Today",
    value: getResolvedTodayCount(),
    icon: CheckCircle2,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    title: "Staff On Duty",
    value: getStaffOnDutyCount(),
    icon: Users,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`rounded-lg p-2 ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
