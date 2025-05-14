"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Download, FileSpreadsheet, FileText, Loader2, Palette, PenLine } from "lucide-react"

export function SettingsExportPreferences() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      alert("Export preferences saved successfully")
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Export Preferences</CardTitle>
          <CardDescription>Customize how data is exported from the dashboard.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="formats" className="space-y-4">
            <TabsList>
              <TabsTrigger value="formats">Export Formats</TabsTrigger>
              <TabsTrigger value="styling">Styling & Branding</TabsTrigger>
              <TabsTrigger value="scheduling">Scheduled Exports</TabsTrigger>
            </TabsList>

            <TabsContent value="formats" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Default Export Formats</h3>

                <div className="space-y-2">
                  <Label htmlFor="default-format">Default Format</Label>
                  <Select defaultValue="excel">
                    <SelectTrigger id="default-format">
                      <SelectValue placeholder="Select default format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">The default format used when exporting data.</p>
                </div>

                <div className="space-y-4 mt-4">
                  <Label>Available Export Formats</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="format-excel" defaultChecked />
                      <Label htmlFor="format-excel" className="flex items-center gap-2">
                        <FileSpreadsheet className="h-4 w-4 text-green-600" />
                        Excel (.xlsx)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="format-csv" defaultChecked />
                      <Label htmlFor="format-csv" className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-blue-600" />
                        CSV
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="format-pdf" defaultChecked />
                      <Label htmlFor="format-pdf" className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-red-600" />
                        PDF
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="format-json" defaultChecked />
                      <Label htmlFor="format-json" className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-amber-600" />
                        JSON
                      </Label>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Select which export formats will be available to users.
                  </p>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Data Export Options</h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="include-headers">Include Column Headers</Label>
                      <p className="text-sm text-muted-foreground">Include column headers in exported data.</p>
                    </div>
                    <Switch id="include-headers" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="include-metadata">Include Metadata</Label>
                      <p className="text-sm text-muted-foreground">
                        Include export date, user, and filter information.
                      </p>
                    </div>
                    <Switch id="include-metadata" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="data-formatting">Preserve Data Formatting</Label>
                      <p className="text-sm text-muted-foreground">
                        Maintain number formatting, dates, and currency symbols.
                      </p>
                    </div>
                    <Switch id="data-formatting" defaultChecked />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="styling" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">PDF Export Styling</h3>

                <div className="space-y-2">
                  <Label htmlFor="pdf-template">PDF Template</Label>
                  <Select defaultValue="standard">
                    <SelectTrigger id="pdf-template">
                      <SelectValue placeholder="Select PDF template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="compact">Compact</SelectItem>
                      <SelectItem value="detailed">Detailed</SelectItem>
                      <SelectItem value="presentation">Presentation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="page-size">Page Size</Label>
                    <Select defaultValue="a4">
                      <SelectTrigger id="page-size">
                        <SelectValue placeholder="Select page size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="a4">A4</SelectItem>
                        <SelectItem value="letter">Letter</SelectItem>
                        <SelectItem value="legal">Legal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="orientation">Orientation</Label>
                    <Select defaultValue="portrait">
                      <SelectTrigger id="orientation">
                        <SelectValue placeholder="Select orientation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="portrait">Portrait</SelectItem>
                        <SelectItem value="landscape">Landscape</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Branding</h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="include-logo">Include Company Logo</Label>
                      <p className="text-sm text-muted-foreground">Add your company logo to exported reports.</p>
                    </div>
                    <Switch id="include-logo" defaultChecked />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input id="company-name" placeholder="Enter company name" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="primary-color">Primary Color</Label>
                    <div className="flex gap-2">
                      <Input id="primary-color" value="#3b82f6" />
                      <Button variant="outline" size="icon" className="shrink-0">
                        <Palette className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="footer-text">Custom Footer Text</Label>
                    <Input id="footer-text" placeholder="Enter custom footer text" />
                    <p className="text-sm text-muted-foreground">
                      This text will appear at the bottom of exported documents.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="scheduling" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Scheduled Exports</h3>
                  <Button variant="outline" className="gap-2">
                    <PenLine className="h-4 w-4" />
                    Create Schedule
                  </Button>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">Weekly Customer Report</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Exports customer data every Monday at 8:00 AM
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch defaultChecked />
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Format</p>
                      <p className="text-sm text-muted-foreground">Excel (.xlsx)</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Recipients</p>
                      <p className="text-sm text-muted-foreground">3 email addresses</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">Monthly Analytics Summary</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Exports analytics data on the 1st of each month
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch defaultChecked />
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Format</p>
                      <p className="text-sm text-muted-foreground">PDF</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Recipients</p>
                      <p className="text-sm text-muted-foreground">5 email addresses</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Delivery Options</h3>

                  <div className="space-y-2">
                    <Label htmlFor="delivery-method">Default Delivery Method</Label>
                    <Select defaultValue="email">
                      <SelectTrigger id="delivery-method">
                        <SelectValue placeholder="Select delivery method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="download">Download</SelectItem>
                        <SelectItem value="cloud">Cloud Storage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="default-recipients">Default Recipients</Label>
                    <Input id="default-recipients" placeholder="Enter email addresses (comma separated)" />
                    <p className="text-sm text-muted-foreground">Default recipients for scheduled exports.</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notify-export">Notify on Export Completion</Label>
                      <p className="text-sm text-muted-foreground">
                        Send notification when scheduled exports are completed.
                      </p>
                    </div>
                    <Switch id="notify-export" defaultChecked />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleSave} disabled={isLoading} className="gap-2">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            Save Export Preferences
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
