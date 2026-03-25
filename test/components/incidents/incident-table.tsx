"use client"

import Link from "next/link"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react"
import type { Incident } from "@/lib/data"
import { getSeverityColor, getStatusColor, formatTimeAgo } from "@/lib/data"

interface IncidentTableProps {
  incidents: Incident[]
}

export function IncidentTable({ incidents }: IncidentTableProps) {
  if (incidents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card p-12 text-center">
        <p className="text-lg font-medium">No incidents found</p>
        <p className="text-sm text-muted-foreground">
          Try adjusting your filters or create a new incident
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="w-[100px]">Severity</TableHead>
            <TableHead className="w-[120px]">Status</TableHead>
            <TableHead className="w-[150px]">Assigned</TableHead>
            <TableHead className="hidden md:table-cell">Location</TableHead>
            <TableHead className="hidden lg:table-cell w-[100px]">Created</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {incidents.map((incident) => (
            <TableRow key={incident.id} className="group">
              <TableCell>
                <Link
                  href={`/incidents/${incident.id}`}
                  className="font-mono text-sm text-primary hover:underline"
                >
                  {incident.id}
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  href={`/incidents/${incident.id}`}
                  className="font-medium hover:text-primary"
                >
                  {incident.title}
                </Link>
              </TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={getSeverityColor(incident.severity)}
                >
                  {incident.severity}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={getStatusColor(incident.status)}
                >
                  {incident.status.replace("-", " ")}
                </Badge>
              </TableCell>
              <TableCell>
                {incident.assignedStaff ? (
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-secondary text-[10px]">
                        {incident.assignedStaff.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm truncate max-w-[100px]">
                      {incident.assignedStaff.name}
                    </span>
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    Unassigned
                  </span>
                )}
              </TableCell>
              <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                {incident.location}
              </TableCell>
              <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                {formatTimeAgo(incident.createdAt)}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 opacity-0 group-hover:opacity-100"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/incidents/${incident.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
