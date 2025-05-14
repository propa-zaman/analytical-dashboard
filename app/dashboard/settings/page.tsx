"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Sidebar } from "@/components/dashboard/sidebar"
import { SettingsProfile } from "@/components/dashboard/settings/settings-profile"
import { SettingsAppearance } from "@/components/dashboard/settings/settings-appearance"
import { SettingsDataManagement } from "@/components/dashboard/settings/settings-data-management"
import { SettingsNotifications } from "@/components/dashboard/settings/settings-notifications"
import { SettingsAccessControl } from "@/components/dashboard/settings/settings-access-control"
import { SettingsApiIntegration } from "@/components/dashboard/settings/settings-api-integration"
import { SettingsExportPreferences } from "@/components/dashboard/settings/settings-export-preferences"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">Manage your account settings and set dashboard preferences.</p>
          </div>

          <Tabs defaultValue="profile" className="space-y-4">
            <TabsList className="grid grid-cols-2 md:grid-cols-7 lg:w-auto">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="data">Data Management</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="export">Export</TabsTrigger>
              {user.role === "admin" && <TabsTrigger value="access">Access Control</TabsTrigger>}
              {user.role === "admin" && <TabsTrigger value="api">API & Integrations</TabsTrigger>}
            </TabsList>

            <TabsContent value="profile" className="space-y-4">
              <div className="grid gap-4 py-4">
                <SettingsProfile user={user} />
              </div>
            </TabsContent>

            <TabsContent value="appearance" className="space-y-4">
              <div className="grid gap-4 py-4">
                <SettingsAppearance />
              </div>
            </TabsContent>

            <TabsContent value="data" className="space-y-4">
              <div className="grid gap-4 py-4">
                <SettingsDataManagement user={user} />
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4">
              <div className="grid gap-4 py-4">
                <SettingsNotifications />
              </div>
            </TabsContent>

            <TabsContent value="export" className="space-y-4">
              <div className="grid gap-4 py-4">
                <SettingsExportPreferences />
              </div>
            </TabsContent>

            {user.role === "admin" && (
              <TabsContent value="access" className="space-y-4">
                <div className="grid gap-4 py-4">
                  <SettingsAccessControl />
                </div>
              </TabsContent>
            )}

            {user.role === "admin" && (
              <TabsContent value="api" className="space-y-4">
                <div className="grid gap-4 py-4">
                  <SettingsApiIntegration />
                </div>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  )
}
