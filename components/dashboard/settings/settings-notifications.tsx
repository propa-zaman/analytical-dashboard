"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Bell, BellOff, Loader2, Mail, MessageSquare, Smartphone } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function SettingsNotifications() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [inAppNotifications, setInAppNotifications] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      alert("Notification settings saved successfully")
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Control how and when you receive notifications.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="channels" className="space-y-4">
            <TabsList>
              <TabsTrigger value="channels">Notification Channels</TabsTrigger>
              <TabsTrigger value="types">Notification Types</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
            </TabsList>

            <TabsContent value="channels" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email.</p>
                    </div>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                {emailNotifications && (
                  <div className="ml-6 pl-2 border-l space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-digest">Daily Digest</Label>
                      <Switch id="email-digest" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-alerts">Immediate Alerts</Label>
                      <Switch id="email-alerts" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-reports">Weekly Reports</Label>
                      <Switch id="email-reports" defaultChecked />
                    </div>
                  </div>
                )}

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <Label htmlFor="push-notifications">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications on your device.</p>
                    </div>
                  </div>
                  <Switch id="push-notifications" checked={pushNotifications} onCheckedChange={setPushNotifications} />
                </div>

                {pushNotifications && (
                  <div className="ml-6 pl-2 border-l space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="push-high-priority">High Priority Only</Label>
                      <Switch id="push-high-priority" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="push-sound">Notification Sound</Label>
                      <Switch id="push-sound" defaultChecked />
                    </div>
                  </div>
                )}

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <Label htmlFor="in-app-notifications">In-App Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications within the dashboard.</p>
                    </div>
                  </div>
                  <Switch
                    id="in-app-notifications"
                    checked={inAppNotifications}
                    onCheckedChange={setInAppNotifications}
                  />
                </div>

                {inAppNotifications && (
                  <div className="ml-6 pl-2 border-l space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="in-app-toast">Toast Notifications</Label>
                      <Switch id="in-app-toast" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="in-app-badge">Badge Counters</Label>
                      <Switch id="in-app-badge" defaultChecked />
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="types" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Data Updates</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-new-customer">New Customer Added</Label>
                    <Switch id="notify-new-customer" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-data-import">Data Import Complete</Label>
                    <Switch id="notify-data-import" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-data-export">Data Export Ready</Label>
                    <Switch id="notify-data-export" defaultChecked />
                  </div>
                </div>

                <Separator />

                <h3 className="text-sm font-medium">Reports & Analytics</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-report-ready">Report Generated</Label>
                    <Switch id="notify-report-ready" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-threshold">Threshold Alerts</Label>
                    <Switch id="notify-threshold" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-anomaly">Anomaly Detection</Label>
                    <Switch id="notify-anomaly" defaultChecked />
                  </div>
                </div>

                <Separator />

                <h3 className="text-sm font-medium">System</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-maintenance">Scheduled Maintenance</Label>
                    <Switch id="notify-maintenance" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-security">Security Alerts</Label>
                    <Switch id="notify-security" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-updates">System Updates</Label>
                    <Switch id="notify-updates" defaultChecked />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="quiet-hours">Quiet Hours</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="quiet-start" className="text-sm text-muted-foreground">
                        Start Time
                      </Label>
                      <Select defaultValue="22">
                        <SelectTrigger id="quiet-start">
                          <SelectValue placeholder="Select start time" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 24 }).map((_, i) => (
                            <SelectItem key={i} value={i.toString()}>
                              {i.toString().padStart(2, "0")}:00
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quiet-end" className="text-sm text-muted-foreground">
                        End Time
                      </Label>
                      <Select defaultValue="7">
                        <SelectTrigger id="quiet-end">
                          <SelectValue placeholder="Select end time" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 24 }).map((_, i) => (
                            <SelectItem key={i} value={i.toString()}>
                              {i.toString().padStart(2, "0")}:00
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Only high priority notifications will be sent during quiet hours.
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="notification-days">Notification Days</Label>
                  <div className="flex flex-wrap gap-2">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                      <Button
                        key={day}
                        variant="outline"
                        className="rounded-full"
                        data-selected={!["Saturday", "Sunday"].includes(day)}
                        data-state={!["Saturday", "Sunday"].includes(day) ? "active" : "inactive"}
                      >
                        {day.substring(0, 3)}
                      </Button>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">Select days when you want to receive notifications.</p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="digest-frequency">Digest Frequency</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger id="digest-frequency">
                      <SelectValue placeholder="Select digest frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">How often you want to receive notification digests.</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" className="gap-2">
            <BellOff className="h-4 w-4" />
            Pause All Notifications
          </Button>
          <Button onClick={handleSave} disabled={isLoading} className="gap-2">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Bell className="h-4 w-4" />}
            Save Preferences
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
