import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { activities, formatTimeAgo } from "@/lib/data"
import { Activity } from "lucide-react"

export function RecentActivity() {
  const recentActivities = activities.slice(0, 5)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-muted-foreground" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div
              key={activity.id}
              className="flex items-start gap-4"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                  {activity.user.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm">
                  <span className="font-medium">{activity.user.name}</span>
                  {" "}
                  <span className="text-muted-foreground">{activity.action}</span>
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="font-mono">{activity.incidentId}</span>
                  <span>·</span>
                  <span>{formatTimeAgo(activity.timestamp)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
