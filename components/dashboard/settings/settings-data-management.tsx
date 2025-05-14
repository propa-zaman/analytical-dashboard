"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import type { UserRole } from "@/context/auth-context"
import { AlertCircle, ArrowUpDown, Database, Download, Loader2, RefreshCw, Trash2, Upload } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface SettingsDataManagementProps {
  user: {
    id: string
    name: string
    email: string
    role: UserRole
  }
}

export function SettingsDataManagement({ user }: SettingsDataManagementProps) {
  const [isImporting, setIsImporting] = useState(false)
  const [importProgress, setImportProgress] = useState(0)
  const [autoRefresh, setAutoRefresh] = useState(false)
  const [refreshInterval, setRefreshInterval] = useState("30")
  const [dataRetention, setDataRetention] = useState("365")

  const handleImport = () => {
    setIsImporting(true)
    setImportProgress(0)

    // Simulate import progress
    const interval = setInterval(() => {
      setImportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsImporting(false)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const canManageData = user.role === "admin" || user.role === "sales"

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Data Import & Export</CardTitle>
          <CardDescription>Manage your customer data and import/export settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Import Data</h3>
              <div className="space-y-2">
                <Label htmlFor="import-file">Upload File</Label>
                <div className="flex gap-2">
                  <Input id="import-file" type="file" disabled={!canManageData || isImporting} />
                  <Button onClick={handleImport} disabled={!canManageData || isImporting}>
                    {isImporting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Importing...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Import
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">Supported formats: CSV, Excel (.xlsx)</p>
              </div>

              {isImporting && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Importing data...</span>
                    <span>{importProgress}%</span>
                  </div>
                  <Progress value={importProgress} className="h-2" />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="import-type">Import Type</Label>
                <Select defaultValue="append" disabled={!canManageData}>
                  <SelectTrigger id="import-type">
                    <SelectValue placeholder="Select import type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="append">Append to existing data</SelectItem>
                    <SelectItem value="replace">Replace existing data</SelectItem>
                    <SelectItem value="update">Update matching records</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {!canManageData && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Permission Required</AlertTitle>
                  <AlertDescription>You need admin or sales permissions to import data.</AlertDescription>
                </Alert>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Export Data</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="export-format">Export Format</Label>
                  <Select defaultValue="csv">
                    <SelectTrigger id="export-format">
                      <SelectValue placeholder="Select export format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                      <SelectItem value="pdf">PDF</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="export-data">Data to Export</Label>
                  <Select defaultValue="all">
                    <SelectTrigger id="export-data">
                      <SelectValue placeholder="Select data to export" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Customer Data</SelectItem>
                      <SelectItem value="filtered">Current Filtered View</SelectItem>
                      <SelectItem value="high-value">High Value Customers</SelectItem>
                      <SelectItem value="recent">Recently Added Customers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Export Data
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Data Refresh Settings</h3>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-refresh">Auto Refresh Data</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically refresh dashboard data at regular intervals.
                </p>
              </div>
              <Switch id="auto-refresh" checked={autoRefresh} onCheckedChange={setAutoRefresh} />
            </div>

            {autoRefresh && (
              <div className="space-y-2">
                <Label htmlFor="refresh-interval">Refresh Interval (minutes)</Label>
                <Select value={refreshInterval} onValueChange={setRefreshInterval}>
                  <SelectTrigger id="refresh-interval">
                    <SelectValue placeholder="Select refresh interval" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 minutes</SelectItem>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex justify-end">
              <Button variant="outline" className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Refresh Now
              </Button>
            </div>
          </div>

          {user.role === "admin" && (
            <>
              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Data Retention</h3>

                <div className="space-y-2">
                  <Label htmlFor="data-retention">Retain Data For</Label>
                  <Select value={dataRetention} onValueChange={setDataRetention}>
                    <SelectTrigger id="data-retention">
                      <SelectValue placeholder="Select data retention period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="180">6 months</SelectItem>
                      <SelectItem value="365">1 year</SelectItem>
                      <SelectItem value="forever">Forever</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">Data older than this will be automatically archived.</p>
                </div>

                <div className="pt-2">
                  <Button variant="destructive" className="gap-2">
                    <Trash2 className="h-4 w-4" />
                    Purge Archived Data
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" className="gap-2">
            <ArrowUpDown className="h-4 w-4" />
            View Data Logs
          </Button>
          <Button className="gap-2">
            <Database className="h-4 w-4" />
            Save Data Settings
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
