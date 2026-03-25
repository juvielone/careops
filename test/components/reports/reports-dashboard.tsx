"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { incidents } from "@/lib/data"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts"

// Calculate stats for charts
const severityData = [
  { name: "Critical", value: incidents.filter((i) => i.severity === "critical").length, fill: "var(--color-destructive)" },
  { name: "High", value: incidents.filter((i) => i.severity === "high").length, fill: "var(--color-warning)" },
  { name: "Medium", value: incidents.filter((i) => i.severity === "medium").length, fill: "var(--color-info)" },
  { name: "Low", value: incidents.filter((i) => i.severity === "low").length, fill: "var(--color-muted-foreground)" },
]

const statusData = [
  { name: "Open", count: incidents.filter((i) => i.status === "open").length },
  { name: "In Progress", count: incidents.filter((i) => i.status === "in-progress").length },
  { name: "Resolved", count: incidents.filter((i) => i.status === "resolved").length },
  { name: "Closed", count: incidents.filter((i) => i.status === "closed").length },
]

// Mock trend data for the last 7 days
const trendData = [
  { day: "Mon", created: 3, resolved: 2 },
  { day: "Tue", created: 5, resolved: 3 },
  { day: "Wed", created: 2, resolved: 4 },
  { day: "Thu", created: 4, resolved: 2 },
  { day: "Fri", created: 6, resolved: 5 },
  { day: "Sat", created: 1, resolved: 2 },
  { day: "Sun", created: 2, resolved: 1 },
]

const locationData = [
  { location: "Ward A", count: incidents.filter((i) => i.location.includes("Ward A")).length },
  { location: "Ward B", count: incidents.filter((i) => i.location.includes("Ward B")).length },
  { location: "Ward C", count: incidents.filter((i) => i.location.includes("Ward C")).length },
  { location: "Emergency", count: incidents.filter((i) => i.location.includes("Emergency")).length },
  { location: "Pharmacy", count: incidents.filter((i) => i.location.includes("Pharmacy")).length },
]

export function ReportsDashboard() {
  // Calculate average resolution time (mock data)
  const avgResolutionTime = "4.2 hours"
  const totalIncidents = incidents.length
  const resolvedRate = Math.round(
    (incidents.filter((i) => i.status === "resolved" || i.status === "closed").length /
      totalIncidents) *
      100
  )

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Incidents</CardDescription>
            <CardTitle className="text-3xl">{totalIncidents}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              All time incident count
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Resolution Rate</CardDescription>
            <CardTitle className="text-3xl">{resolvedRate}%</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Incidents resolved or closed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Avg Resolution Time</CardDescription>
            <CardTitle className="text-3xl">{avgResolutionTime}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Time from creation to resolution
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Incident Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Incident Trends</CardTitle>
            <CardDescription>Created vs Resolved over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis 
                    dataKey="day" 
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="created"
                    stroke="var(--color-destructive)"
                    strokeWidth={2}
                    dot={{ fill: "var(--color-destructive)" }}
                    name="Created"
                  />
                  <Line
                    type="monotone"
                    dataKey="resolved"
                    stroke="var(--color-success)"
                    strokeWidth={2}
                    dot={{ fill: "var(--color-success)" }}
                    name="Resolved"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Severity Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Incidents by Severity</CardTitle>
            <CardDescription>Distribution of incident severity levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={severityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {severityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Incidents by Status</CardTitle>
            <CardDescription>Current status breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis type="number" stroke="var(--color-muted-foreground)" fontSize={12} />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                    width={80}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="count" fill="var(--color-primary)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Location Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Incidents by Location</CardTitle>
            <CardDescription>Where incidents are occurring</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={locationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis 
                    dataKey="location" 
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                  />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="count" fill="var(--color-info)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
