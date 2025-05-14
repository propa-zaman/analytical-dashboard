"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Check, Copy, Edit, Loader2, Plus, Search, Shield, Trash2, UserPlus } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function SettingsAccessControl() {
  const [isAddingUser, setIsAddingUser] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Mock users data
  const users = [
    {
      id: "1",
      name: "Admin User",
      email: "admin@example.com",
      role: "admin",
      status: "active",
      lastLogin: "2 hours ago",
    },
    {
      id: "2",
      name: "Sales Representative",
      email: "sales@example.com",
      role: "sales",
      status: "active",
      lastLogin: "1 day ago",
    },
    { id: "3", name: "Viewer", email: "viewer@example.com", role: "viewer", status: "active", lastLogin: "3 days ago" },
    {
      id: "4",
      name: "John Smith",
      email: "john@example.com",
      role: "sales",
      status: "inactive",
      lastLogin: "2 weeks ago",
    },
    {
      id: "5",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      role: "viewer",
      status: "pending",
      lastLogin: "Never",
    },
  ]

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddUser = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsAddingUser(false)
      alert("User invitation sent successfully")
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage user access and permissions.</CardDescription>
            </div>
            <Button onClick={() => setIsAddingUser(true)} className="gap-2">
              <UserPlus className="h-4 w-4" />
              Add User
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {isAddingUser ? (
            <div className="space-y-4 border rounded-lg p-4">
              <h3 className="text-lg font-medium">Invite New User</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new-user-name">Full Name</Label>
                  <Input id="new-user-name" placeholder="Enter user's full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-user-email">Email Address</Label>
                  <Input id="new-user-email" type="email" placeholder="Enter user's email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-user-role">Role</Label>
                  <Select defaultValue="viewer">
                    <SelectTrigger id="new-user-role">
                      <SelectValue placeholder="Select user role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="sales">Sales Representative</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-user-expiry">Access Expiry</Label>
                  <Select defaultValue="never">
                    <SelectTrigger id="new-user-expiry">
                      <SelectValue placeholder="Select access expiry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30days">30 Days</SelectItem>
                      <SelectItem value="90days">90 Days</SelectItem>
                      <SelectItem value="1year">1 Year</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2">
                <Button variant="outline" onClick={() => setIsAddingUser(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddUser} disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Send Invitation
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          No users found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                user.role === "admin"
                                  ? "bg-red-100 text-red-800 hover:bg-red-100"
                                  : user.role === "sales"
                                    ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                    : "bg-green-100 text-green-800 hover:bg-green-100"
                              }
                            >
                              {user.role === "admin" ? "Admin" : user.role === "sales" ? "Sales" : "Viewer"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                user.status === "active"
                                  ? "border-green-200 text-green-800"
                                  : user.status === "inactive"
                                    ? "border-gray-200 text-gray-800"
                                    : "border-amber-200 text-amber-800"
                              }
                            >
                              {user.status === "active" && <Check className="mr-1 h-3 w-3" />}
                              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.lastLogin}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Role Permissions</h3>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Permission</TableHead>
                    <TableHead className="text-center">Admin</TableHead>
                    <TableHead className="text-center">Sales</TableHead>
                    <TableHead className="text-center">Viewer</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">View Dashboard</TableCell>
                    <TableCell className="text-center">✓</TableCell>
                    <TableCell className="text-center">✓</TableCell>
                    <TableCell className="text-center">✓</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">View Customer Data</TableCell>
                    <TableCell className="text-center">✓</TableCell>
                    <TableCell className="text-center">✓</TableCell>
                    <TableCell className="text-center">✓</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Edit Customer Data</TableCell>
                    <TableCell className="text-center">✓</TableCell>
                    <TableCell className="text-center">✓</TableCell>
                    <TableCell className="text-center">-</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Import/Export Data</TableCell>
                    <TableCell className="text-center">✓</TableCell>
                    <TableCell className="text-center">✓</TableCell>
                    <TableCell className="text-center">-</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Generate Reports</TableCell>
                    <TableCell className="text-center">✓</TableCell>
                    <TableCell className="text-center">✓</TableCell>
                    <TableCell className="text-center">✓</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Manage Users</TableCell>
                    <TableCell className="text-center">✓</TableCell>
                    <TableCell className="text-center">-</TableCell>
                    <TableCell className="text-center">-</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">System Settings</TableCell>
                    <TableCell className="text-center">✓</TableCell>
                    <TableCell className="text-center">-</TableCell>
                    <TableCell className="text-center">-</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">API Access</TableCell>
                    <TableCell className="text-center">✓</TableCell>
                    <TableCell className="text-center">-</TableCell>
                    <TableCell className="text-center">-</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" className="gap-2">
            <Plus className="h-4 w-4" />
            Create Custom Role
          </Button>
          <Button className="gap-2">
            <Shield className="h-4 w-4" />
            Save Permission Changes
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
          <CardDescription>Configure security and access control settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Authentication</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Require two-factor authentication for all users.</p>
                </div>
                <Switch id="two-factor" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="password-expiry">Password Expiry</Label>
                  <p className="text-sm text-muted-foreground">Force password reset every 90 days.</p>
                </div>
                <Switch id="password-expiry" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="session-timeout">Session Timeout</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically log out inactive users after 30 minutes.
                  </p>
                </div>
                <Switch id="session-timeout" defaultChecked />
              </div>
            </div>

            <Separator />

            <h3 className="text-lg font-medium">API Access</h3>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>API Key Management</AlertTitle>
              <AlertDescription>
                Your API keys grant access to your data. Keep them secure and never share them publicly.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Production API Key</p>
                  <p className="text-sm text-muted-foreground">Last used: 2 days ago</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Input value="••••••••••••••••••••••••" className="pr-10 font-mono" readOnly />
                    <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-full">
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">Copy</span>
                    </Button>
                  </div>
                  <Button variant="outline" size="sm">
                    Regenerate
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Development API Key</p>
                  <p className="text-sm text-muted-foreground">Last used: 5 hours ago</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Input value="••••••••••••••••••••••••" className="pr-10 font-mono" readOnly />
                    <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-full">
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">Copy</span>
                    </Button>
                  </div>
                  <Button variant="outline" size="sm">
                    Regenerate
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>Save Security Settings</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
