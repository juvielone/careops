"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { activities, incidents, formatTimeAgo } from "@/lib/data"
import { 
  AlertTriangle, 
  MessageSquare, 
  CheckCircle2, 
  PlayCircle, 
  PlusCircle,
  Clock
} from "lucide-react"

const getActivityIcon = (action: string) => {
  if (action.includes("created")) return PlusCircle
  if (action.includes("Resolved")) return CheckCircle2
  if (action.includes("In Progress")) return PlayCircle
  if (action.includes("Note")) return MessageSquare
  return AlertTriangle
}

const getActivityColor = (action: string) => {
  if (action.includes("created")) return "text-primary"
  if (action.includes("Resolved")) return "text-success"
  if (action.includes("In Progress")) return "text-warning"
  return "text-muted-foreground"
}

export function ActivityLog() {
  // Sort activities by timestamp, most recent first
  const sortedActivities = [...activities].sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
  )

  // Group activities by date
  const groupedActivities = sortedActivities.reduce((groups, activity) => {
    const date = activity.timestamp.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(activity)
    return groups
  }, {} as Record<string, typeof activities>)

  return (
    <div className="space-y-6">
      {Object.entries(groupedActivities).map(([date, dayActivities]) => (
        <div key={date}>
          <h3 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {date}
          </h3>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {dayActivities.map((activity, index) => {
                  const incident = incidents.find(
                    (i) => i.id === activity.incidentId
                  )
                  const Icon = getActivityIcon(activity.action)
                  const iconColor = getActivityColor(activity.action)

                  return (
                    <div key={activity.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`rounded-full bg-muted p-2 ${iconColor}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        {index < dayActivities.length - 1 && (
                          <div className="flex-1 w-px bg-border mt-2" />
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="bg-secondary text-[10px]">
                                {activity.user.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-sm">
                              {activity.user.name}
                            </span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {activity.action}
                          </span>
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <Link
                            href={`/incidents/${activity.incidentId}`}
                            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/50 px-2 py-1 text-xs font-mono hover:bg-muted"
                          >
                            {activity.incidentId}
                          </Link>
                          {incident && (
                            <span className="text-sm text-muted-foreground truncate max-w-[300px]">
                              {incident.title}
                            </span>
                          )}
                        </div>
                        {activity.details && (
                          <p className="mt-2 text-sm text-muted-foreground">
                            {activity.details}
                          </p>
                        )}
                        <p className="mt-2 text-xs text-muted-foreground">
                          {formatTimeAgo(activity.timestamp)}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  )
}
