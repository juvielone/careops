"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ArrowLeft,
  MapPin,
  Clock,
  User,
  MessageSquare,
  AlertTriangle,
  Edit2,
  Send,
} from "lucide-react"
import type { Incident, Status } from "@/lib/data"
import { getSeverityColor, getStatusColor, formatTimeAgo, staff } from "@/lib/data"

interface IncidentDetailProps {
  incident: Incident
}

export function IncidentDetail({ incident }: IncidentDetailProps) {
  const [status, setStatus] = useState<Status>(incident.status)
  const [newNote, setNewNote] = useState("")

  const handleAddNote = () => {
    if (!newNote.trim()) return
    console.log("[v0] Adding note:", newNote)
    setNewNote("")
  }

  return (
    <div className="space-y-6">
      {/* Back button and actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/incidents" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Incidents
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Edit2 className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Select value={status} onValueChange={(v) => setStatus(v as Status)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Incident Info */}
          <Card>
            <CardHeader>
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant="secondary"
                  className={getSeverityColor(incident.severity)}
                >
                  <AlertTriangle className="mr-1 h-3 w-3" />
                  {incident.severity}
                </Badge>
                <Badge variant="outline" className={getStatusColor(status)}>
                  {status.replace("-", " ")}
                </Badge>
              </div>
              <CardTitle className="text-xl">{incident.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                {incident.description}
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {incident.location}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Created {formatTimeAgo(incident.createdAt)}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notes & Updates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-muted-foreground" />
                Notes & Updates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {incident.notes.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No notes added yet.
                </p>
              ) : (
                <div className="space-y-4">
                  {incident.notes.map((note) => (
                    <div
                      key={note.id}
                      className="rounded-lg border border-border bg-muted/50 p-4"
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-secondary text-xs">
                            {note.author.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">
                              {note.author.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {formatTimeAgo(note.createdAt)}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {note.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Note */}
              <div className="border-t border-border pt-4">
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Add a note or update..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    rows={2}
                    className="flex-1"
                  />
                  <Button onClick={handleAddNote} size="icon" className="h-auto">
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send note</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Assigned Staff */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <User className="h-4 w-4 text-muted-foreground" />
                Assigned Staff
              </CardTitle>
            </CardHeader>
            <CardContent>
              {incident.assignedStaff ? (
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {incident.assignedStaff.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{incident.assignedStaff.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {incident.assignedStaff.role}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground">
                    No staff assigned
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Assign Staff
                  </Button>
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-border">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Reassign to..." />
                  </SelectTrigger>
                  <SelectContent>
                    {staff
                      .filter((s) => s.status !== "off-duty")
                      .map((s) => (
                        <SelectItem key={s.id} value={s.id}>
                          {s.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Activity Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <div className="flex-1 w-px bg-border" />
                  </div>
                  <div className="pb-4">
                    <p className="text-sm font-medium">Status changed to {status}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatTimeAgo(incident.updatedAt)}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="h-2 w-2 rounded-full bg-muted-foreground" />
                    <div className="flex-1 w-px bg-border" />
                  </div>
                  <div className="pb-4">
                    <p className="text-sm font-medium">Incident created</p>
                    <p className="text-xs text-muted-foreground">
                      {formatTimeAgo(incident.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
