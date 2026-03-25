import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  BookOpen, 
  MessageCircle, 
  Phone, 
  Mail,
  FileText,
  Video,
  HelpCircle
} from "lucide-react"

const helpTopics = [
  {
    icon: FileText,
    title: "Getting Started",
    description: "Learn the basics of CareOps incident management",
  },
  {
    icon: BookOpen,
    title: "User Guide",
    description: "Comprehensive documentation for all features",
  },
  {
    icon: Video,
    title: "Video Tutorials",
    description: "Step-by-step video guides for common tasks",
  },
  {
    icon: HelpCircle,
    title: "FAQs",
    description: "Answers to frequently asked questions",
  },
]

export function HelpPage() {
  return (
    <DashboardShell
      title="Help & Support"
      subtitle="Get help with CareOps"
    >
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search for help topics..."
                className="pl-10 h-12 text-lg"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {helpTopics.map((topic) => (
            <Card key={topic.title} className="hover:border-primary/50 cursor-pointer transition-colors">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="rounded-full bg-primary/10 p-3 mb-4">
                    <topic.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">{topic.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {topic.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Contact Support</CardTitle>
            <CardDescription>
              Need additional help? Our support team is here for you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="flex items-center gap-3 p-4 rounded-lg border border-border">
                <div className="rounded-full bg-success/10 p-2">
                  <MessageCircle className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="font-medium">Live Chat</p>
                  <p className="text-sm text-muted-foreground">Available 24/7</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg border border-border">
                <div className="rounded-full bg-primary/10 p-2">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Phone Support</p>
                  <p className="text-sm text-muted-foreground">1-800-CAREOPS</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg border border-border">
                <div className="rounded-full bg-info/10 p-2">
                  <Mail className="h-5 w-5 text-info" />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">support@careops.com</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}

