"use client"

import { useState } from "react"
import { Sidebar } from "./sidebar"
import { Header } from "./header"
import { CreateIncidentDialog } from "./create-incident-dialog"

interface DashboardShellProps {
  children: React.ReactNode
  title: string
  subtitle?: string
}

export function DashboardShell({ children, title, subtitle }: DashboardShellProps) {
  const [createDialogOpen, setCreateDialogOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Sidebar onCreateIncident={() => setCreateDialogOpen(true)} />
      
      <div className="pl-64">
        <Header title={title} subtitle={subtitle} />
        <main className="p-6">{children}</main>
      </div>

      <CreateIncidentDialog 
        open={createDialogOpen} 
        onOpenChange={setCreateDialogOpen} 
      />
    </div>
  )
}
