"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Check, Database, FileJson, Globe, Loader2, RefreshCw, Webhook } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function SettingsApiIntegration() {
  const [isLoading, setIsLoading] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)

  const handleSave = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      alert("API settings saved successfully")
    }, 1000)
  }

  const handleConnect = () => {
    setIsConnecting(true)
    // Simulate API call
    setTimeout(() => {
      setIsConnecting(false)
      alert("Connected successfully")
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>API & Integrations</CardTitle>
          <CardDescription>Configure API settings and third-party integrations.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="api" className="space-y-4">
            <TabsList>
              <TabsTrigger value="api">API Configuration</TabsTrigger>
              <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
              <TabsTrigger value="integrations">Third-Party Integrations</TabsTrigger>
            </TabsList>

            <TabsContent value="api" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">API Settings</h3>

                <div className="space-y-2">
                  <Label htmlFor="api-url">API Base URL</Label>
                  <Input id="api-url" value="https://api.example.com/v1" readOnly />
                  <p className="text-sm text-muted-foreground">The base URL for all API requests.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="api-version">API Version</Label>
                  <Select defaultValue="v1">
                    <SelectTrigger id="api-version">
                      <SelectValue placeholder="Select API version" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="v1">v1 (Current)</SelectItem>
                      <SelectItem value="v2-beta">v2 (Beta)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">Select which API version to use.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rate-limit">Rate Limiting</Label>
                  <Select defaultValue="standard">
                    <SelectTrigger id="rate-limit">
                      <SelectValue placeholder="Select rate limit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard (100 requests/min)</SelectItem>
                      <SelectItem value="enhanced">Enhanced (500 requests/min)</SelectItem>
                      <SelectItem value="unlimited">Unlimited</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">Configure API rate limiting for your account.</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="api-logging">API Request Logging</Label>
                    <p className="text-sm text-muted-foreground">Log all API requests for debugging and auditing.</p>
                  </div>
                  <Switch id="api-logging" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="api-compression">Response Compression</Label>
                    <p className="text-sm text-muted-foreground">Enable GZIP compression for API responses.</p>
                  </div>
                  <Switch id="api-compression" defaultChecked />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Authentication</h3>

                <div className="space-y-2">
                  <Label htmlFor="auth-method">Authentication Method</Label>
                  <Select defaultValue="bearer">
                    <SelectTrigger id="auth-method">
                      <SelectValue placeholder="Select authentication method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bearer">Bearer Token</SelectItem>
                      <SelectItem value="basic">Basic Auth</SelectItem>
                      <SelectItem value="oauth2">OAuth 2.0</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="token-expiry">Token Expiry</Label>
                  <Select defaultValue="24h">
                    <SelectTrigger id="token-expiry">
                      <SelectValue placeholder="Select token expiry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1h">1 Hour</SelectItem>
                      <SelectItem value="24h">24 Hours</SelectItem>
                      <SelectItem value="7d">7 Days</SelectItem>
                      <SelectItem value="30d">30 Days</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    How long API tokens remain valid before requiring renewal.
                  </p>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>API Documentation</AlertTitle>
                  <AlertDescription>
                    View the complete API documentation at{" "}
                    <a href="#" className="font-medium underline">
                      https://docs.example.com/api
                    </a>
                  </AlertDescription>
                </Alert>
              </div>
            </TabsContent>

            <TabsContent value="webhooks" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Webhook Endpoints</h3>
                  <Button variant="outline" className="gap-2">
                    <Webhook className="h-4 w-4" />
                    Add Endpoint
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">Customer Data Webhook</h4>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">https://example.com/webhooks/customer-data</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <RefreshCw className="h-3 w-3" />
                          Test
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Events</p>
                        <p className="text-sm text-muted-foreground">customer.created, customer.updated</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Last Triggered</p>
                        <p className="text-sm text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">Report Generation Webhook</h4>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">https://example.com/webhooks/reports</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <RefreshCw className="h-3 w-3" />
                          Test
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Events</p>
                        <p className="text-sm text-muted-foreground">report.generated, report.failed</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Last Triggered</p>
                        <p className="text-sm text-muted-foreground">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Webhook Settings</h3>

                  <div className="space-y-2">
                    <Label htmlFor="webhook-secret">Webhook Secret</Label>
                    <div className="flex gap-2">
                      <Input
                        id="webhook-secret"
                        type="password"
                        value="••••••••••••••••••••••••"
                        className="font-mono"
                        readOnly
                      />
                      <Button variant="outline">Regenerate</Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Used to verify webhook requests are coming from our servers.
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="space-y-0.5">
                      <Label htmlFor="webhook-retries">Automatic Retries</Label>
                      <p className="text-sm text-muted-foreground">Retry failed webhook deliveries up to 5 times.</p>
                    </div>
                    <Switch id="webhook-retries" defaultChecked />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="integrations" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Connected Services</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 bg-blue-100 p-1.5 rounded-md text-blue-600">
                          <Database className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">Database Integration</h4>
                          <p className="text-sm text-muted-foreground mt-1">Connected to MySQL Database</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Badge variant="outline" className="text-green-600 border-green-200 gap-1">
                              <Check className="h-3 w-3" />
                              Connected
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 bg-amber-100 p-1.5 rounded-md text-amber-600">
                          <FileJson className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">Data Warehouse</h4>
                          <p className="text-sm text-muted-foreground mt-1">Not connected</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={handleConnect} disabled={isConnecting}>
                        {isConnecting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Connecting...
                          </>
                        ) : (
                          "Connect"
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 bg-purple-100 p-1.5 rounded-md text-purple-600">
                          <Globe className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">CRM Integration</h4>
                          <p className="text-sm text-muted-foreground mt-1">Connected to Salesforce</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Badge variant="outline" className="text-green-600 border-green-200 gap-1">
                              <Check className="h-3 w-3" />
                              Connected
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Available Integrations</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect with third-party services to extend your dashboard functionality.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      "Email Marketing",
                      "Payment Gateway",
                      "Analytics",
                      "Social Media",
                      "Help Desk",
                      "Cloud Storage",
                    ].map((integration) => (
                      <div
                        key={integration}
                        className="rounded-lg border p-4 flex flex-col items-center justify-center text-center gap-2"
                      >
                        <div className="bg-muted rounded-full p-3">
                          <Globe className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h4 className="font-medium">{integration}</h4>
                        <Button variant="outline" size="sm" className="mt-2">
                          Connect
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save API Settings
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
