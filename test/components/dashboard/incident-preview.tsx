import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { incidents, getSeverityColor, getStatusColor, formatTimeAgo } from "@/lib/data"
import { ArrowRight, AlertTriangle } from "lucide-react"

export function IncidentPreview() {
  const openIncidents = incidents
    .filter((i) => i.status === "open" || i.status === "in-progress")
    .slice(0, 4)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-muted-foreground" />
          Active Incidents
        </CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/incidents" className="flex items-center gap-1">
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {openIncidents.map((incident) => (
            <Link
              key={incident.id}
              href={`/incidents/${incident.id}`}
              className="block rounded-lg border border-border p-4 transition-colors hover:bg-accent"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">
                      {incident.id}
                    </span>
                    <Badge
                      variant="outline"
                      className={getSeverityColor(incident.severity)}
                    >
                      {incident.severity}
                    </Badge>
                  </div>
                  <h4 className="font-medium leading-tight">{incident.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {incident.location} · {formatTimeAgo(incident.createdAt)}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge variant="outline" className={getStatusColor(incident.status)}>
                    {incident.status.replace("-", " ")}
                  </Badge>
                  {incident.assignedStaff && (
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-secondary text-[10px]">
                        {incident.assignedStaff.avatar}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
