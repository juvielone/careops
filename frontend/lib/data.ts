export type Severity = "low" | "medium" | "high" | "critical"
export type Status = "open" | "in-progress" | "resolved" | "closed"

export interface Staff {
  id: string
  name: string
  role: string
  avatar: string
  email: string
  status: "available" | "busy" | "off-duty"
  department: string
}

export interface Incident {
  id: string
  title: string
  description: string
  severity: Severity
  status: Status
  assignedStaff: Staff | null
  location: string
  createdAt: Date
  updatedAt: Date
  attachments: string[]
  notes: Note[]
}

export interface Note {
  id: string
  content: string
  author: Staff
  createdAt: Date
}

export interface Activity {
  id: string
  incidentId: string
  action: string
  user: Staff
  timestamp: Date
  details?: string
}

export const staff: Staff[] = [
  {
    id: "s1",
    name: "Dr. Sarah Chen",
    role: "Senior Nurse",
    avatar: "SC",
    email: "sarah.chen@careops.com",
    status: "available",
    department: "Emergency",
  },
  {
    id: "s2",
    name: "James Wilson",
    role: "Clinic Manager",
    avatar: "JW",
    email: "james.wilson@careops.com",
    status: "available",
    department: "Administration",
  },
  {
    id: "s3",
    name: "Maria Garcia",
    role: "Registered Nurse",
    avatar: "MG",
    email: "maria.garcia@careops.com",
    status: "busy",
    department: "Ward A",
  },
  {
    id: "s4",
    name: "David Kim",
    role: "Operations Lead",
    avatar: "DK",
    email: "david.kim@careops.com",
    status: "available",
    department: "Operations",
  },
  {
    id: "s5",
    name: "Emily Thompson",
    role: "Care Assistant",
    avatar: "ET",
    email: "emily.thompson@careops.com",
    status: "off-duty",
    department: "Ward B",
  },
  {
    id: "s6",
    name: "Michael Brown",
    role: "Nurse Practitioner",
    avatar: "MB",
    email: "michael.brown@careops.com",
    status: "available",
    department: "Emergency",
  },
]

export const incidents: Incident[] = [
  {
    id: "INC-001",
    title: "Patient fall in Ward A Room 12",
    description: "Patient experienced a fall while attempting to get out of bed unassisted. No visible injuries, but patient complained of hip pain.",
    severity: "high",
    status: "in-progress",
    assignedStaff: staff[0],
    location: "Ward A - Room 12",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 30 * 60 * 1000),
    attachments: [],
    notes: [
      {
        id: "n1",
        content: "Patient has been assessed. X-ray ordered for hip.",
        author: staff[0],
        createdAt: new Date(Date.now() - 60 * 60 * 1000),
      },
    ],
  },
  {
    id: "INC-002",
    title: "Equipment malfunction - Blood pressure monitor",
    description: "Blood pressure monitor in Room 5 displaying inconsistent readings. Device needs calibration or replacement.",
    severity: "medium",
    status: "open",
    assignedStaff: staff[3],
    location: "Ward B - Room 5",
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    attachments: [],
    notes: [],
  },
  {
    id: "INC-003",
    title: "Medication discrepancy noted",
    description: "During routine medication count, a discrepancy was found in the controlled substances log. Investigation required.",
    severity: "critical",
    status: "in-progress",
    assignedStaff: staff[1],
    location: "Pharmacy",
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 20 * 60 * 1000),
    attachments: [],
    notes: [
      {
        id: "n2",
        content: "Initiated full audit of controlled substances. Pharmacy staff interviewed.",
        author: staff[1],
        createdAt: new Date(Date.now() - 45 * 60 * 1000),
      },
    ],
  },
  {
    id: "INC-004",
    title: "Minor spill in hallway",
    description: "Water spill near nursing station. Area has been cordoned off with wet floor signs.",
    severity: "low",
    status: "resolved",
    assignedStaff: staff[4],
    location: "Ward A - Hallway",
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    attachments: [],
    notes: [
      {
        id: "n3",
        content: "Spill cleaned up. Area is now safe.",
        author: staff[4],
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
      },
    ],
  },
  {
    id: "INC-005",
    title: "Visitor complaint - Noise levels",
    description: "Family member complained about excessive noise during night shift affecting patient rest.",
    severity: "low",
    status: "closed",
    assignedStaff: staff[2],
    location: "Ward B - Room 8",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 20 * 60 * 60 * 1000),
    attachments: [],
    notes: [
      {
        id: "n4",
        content: "Spoke with family. Issue was night shift handover. Process adjusted.",
        author: staff[2],
        createdAt: new Date(Date.now() - 22 * 60 * 60 * 1000),
      },
      {
        id: "n5",
        content: "Family satisfied with resolution.",
        author: staff[1],
        createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000),
      },
    ],
  },
  {
    id: "INC-006",
    title: "Temperature control issue in Ward C",
    description: "HVAC system not maintaining proper temperature. Room temperature reading 78°F instead of recommended 72°F.",
    severity: "medium",
    status: "open",
    assignedStaff: null,
    location: "Ward C - Common Area",
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    attachments: [],
    notes: [],
  },
  {
    id: "INC-007",
    title: "Patient elopement attempt",
    description: "Dementia patient attempted to leave facility through emergency exit. Patient safely returned to room.",
    severity: "high",
    status: "resolved",
    assignedStaff: staff[5],
    location: "Emergency Exit - East Wing",
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 7 * 60 * 60 * 1000),
    attachments: [],
    notes: [
      {
        id: "n6",
        content: "Patient returned safely. Family notified. Additional monitoring initiated.",
        author: staff[5],
        createdAt: new Date(Date.now() - 7 * 60 * 60 * 1000),
      },
    ],
  },
]

export const activities: Activity[] = [
  {
    id: "a1",
    incidentId: "INC-003",
    action: "Status changed to In Progress",
    user: staff[1],
    timestamp: new Date(Date.now() - 20 * 60 * 1000),
    details: "Investigation initiated",
  },
  {
    id: "a2",
    incidentId: "INC-001",
    action: "Note added",
    user: staff[0],
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    details: "X-ray ordered for hip assessment",
  },
  {
    id: "a3",
    incidentId: "INC-002",
    action: "Incident created",
    user: staff[3],
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
  },
  {
    id: "a4",
    incidentId: "INC-004",
    action: "Status changed to Resolved",
    user: staff[4],
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    id: "a5",
    incidentId: "INC-007",
    action: "Incident created",
    user: staff[5],
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
  },
]

export function getOpenIncidentsCount(): number {
  return incidents.filter((i) => i.status === "open" || i.status === "in-progress").length
}

export function getHighSeverityCount(): number {
  return incidents.filter((i) => (i.severity === "high" || i.severity === "critical") && i.status !== "closed").length
}

export function getResolvedTodayCount(): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return incidents.filter((i) => i.status === "resolved" && i.updatedAt >= today).length
}

export function getStaffOnDutyCount(): number {
  return staff.filter((s) => s.status !== "off-duty").length
}

export function getSeverityColor(severity: Severity): string {
  switch (severity) {
    case "critical":
      return "bg-destructive text-destructive-foreground"
    case "high":
      return "bg-warning text-warning-foreground"
    case "medium":
      return "bg-info text-info-foreground"
    case "low":
      return "bg-muted text-muted-foreground"
  }
}

export function getStatusColor(status: Status): string {
  switch (status) {
    case "open":
      return "bg-destructive/10 text-destructive border-destructive/20"
    case "in-progress":
      return "bg-warning/10 text-warning-foreground border-warning/20"
    case "resolved":
      return "bg-success/10 text-success border-success/20"
    case "closed":
      return "bg-muted text-muted-foreground border-muted"
  }
}

export function formatTimeAgo(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMins < 60) {
    return `${diffMins}m ago`
  } else if (diffHours < 24) {
    return `${diffHours}h ago`
  } else {
    return `${diffDays}d ago`
  }
}
