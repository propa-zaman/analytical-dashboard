"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Check, Loader2, Moon, Sun } from 'lucide-react'
import { Separator } from "@/components/ui/separator"
import { useTheme } from "next-themes"
import { useToast } from "@/hooks/use-toast"
import { saveAppearanceSettings } from "@/lib/actions"

export function SettingsAppearance() {
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false)
  const [colorScheme, setColorScheme] = useState("blue")
  const [fontSize, setFontSize] = useState("medium")
  const [reducedMotion, setReducedMotion] = useState(false)
  const [highContrast, setHighContrast] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [layoutLoading, setLayoutLoading] = useState(false)

  // useEffect only runs on the client, so we can safely use browser APIs
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSave = async () => {
    setIsLoading(true)
    try {
      await saveAppearanceSettings({
        colorScheme,
        fontSize,
        reducedMotion,
        highContrast,
      })

      // Apply some of the settings immediately
      document.documentElement.style.fontSize = fontSize === "small" ? "14px" : fontSize === "large" ? "18px" : "16px"

      document.documentElement.classList.toggle("reduce-motion", reducedMotion)
      document.documentElement.classList.toggle("high-contrast", highContrast)

      toast({
        title: "Appearance settings saved",
        description: "Your appearance preferences have been updated.",
        variant: "default",
      })
    } catch (error) {
      // Using error parameter without underscore to avoid linting error
      console.error("Failed to save appearance settings:", error)
      toast({
        title: "Error",
        description: "There was an error saving your appearance settings.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLayoutSave = async () => {
    setLayoutLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Layout settings saved",
        description: "Your layout preferences have been updated.",
        variant: "default",
      })
    } catch (error) {
      // Using error parameter without underscore to avoid linting error
      console.error("Failed to save layout settings:", error)
      toast({
        title: "Error",
        description: "There was an error saving your layout settings.",
        variant: "destructive",
      })
    } finally {
      setLayoutLoading(false)
    }
  }

  // Avoid rendering with undefined theme
  if (!mounted) {
    return null
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Customize how the dashboard looks and feels.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Theme</Label>
              <RadioGroup value={theme} onValueChange={setTheme} className="flex gap-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="light" id="theme-light" />
                  <Label htmlFor="theme-light" className="flex items-center gap-2 cursor-pointer">
                    <Sun className="h-4 w-4" />
                    Light
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dark" id="theme-dark" />
                  <Label htmlFor="theme-dark" className="flex items-center gap-2 cursor-pointer">
                    <Moon className="h-4 w-4" />
                    Dark
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="system" id="theme-system" />
                  <Label htmlFor="theme-system" className="cursor-pointer">
                    System
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="color-scheme">Color Scheme</Label>
              <Select value={colorScheme} onValueChange={setColorScheme}>
                <SelectTrigger id="color-scheme">
                  <SelectValue placeholder="Select color scheme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blue">Blue (Default)</SelectItem>
                  <SelectItem value="green">Green</SelectItem>
                  <SelectItem value="purple">Purple</SelectItem>
                  <SelectItem value="orange">Orange</SelectItem>
                  <SelectItem value="red">Red</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground mt-1">Choose the primary color scheme for the dashboard.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="font-size">Font Size</Label>
              <Select value={fontSize} onValueChange={setFontSize}>
                <SelectTrigger id="font-size">
                  <SelectValue placeholder="Select font size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium (Default)</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Accessibility</h3>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="reduced-motion">Reduced Motion</Label>
                  <p className="text-sm text-muted-foreground">Minimize animations and transitions.</p>
                </div>
                <Switch id="reduced-motion" checked={reducedMotion} onCheckedChange={setReducedMotion} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="high-contrast">High Contrast</Label>
                  <p className="text-sm text-muted-foreground">Increase contrast for better visibility.</p>
                </div>
                <Switch id="high-contrast" checked={highContrast} onCheckedChange={setHighContrast} />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-2 h-4 w-4" />}
            Save Preferences
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dashboard Layout</CardTitle>
          <CardDescription>Customize the layout of your dashboard.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="default-view">Default View</Label>
            <Select defaultValue="dashboard">
              <SelectTrigger id="default-view">
                <SelectValue placeholder="Select default view" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dashboard">Dashboard</SelectItem>
                <SelectItem value="customers">Customers</SelectItem>
                <SelectItem value="analytics">Analytics</SelectItem>
                <SelectItem value="reports">Reports</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground mt-1">Choose which page to show when you first log in.</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sidebar-collapsed">Collapsed Sidebar</Label>
              <p className="text-sm text-muted-foreground">Start with the sidebar collapsed by default.</p>
            </div>
            <Switch id="sidebar-collapsed" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="compact-cards">Compact Cards</Label>
              <p className="text-sm text-muted-foreground">Use a more compact layout for dashboard cards.</p>
            </div>
            <Switch id="compact-cards" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant="outline" className="mr-2">
            Reset to Defaults
          </Button>
          <Button onClick={handleLayoutSave} disabled={layoutLoading}>
            {layoutLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Layout
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}