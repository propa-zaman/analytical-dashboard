"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  ChevronDown,
  Database,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  PieChart,
  Settings,
  Users,
} from "lucide-react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed?: boolean
  onToggle?: () => void
}

interface SidebarItem {
  title: string
  href: string
  icon: React.ElementType
  variant: string
  disabled?: boolean
}

export function Sidebar({ className, isCollapsed, onToggle }: SidebarProps) {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const items = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      variant: "default",
    },
    {
      title: "Customers",
      href: "/dashboard/customers",
      icon: Users,
      variant: "ghost",
      disabled: user?.role === "viewer",
    },
    {
      title: "Analytics",
      href: "/dashboard/analytics",
      icon: BarChart3,
      variant: "ghost",
    },
    {
      title: "Reports",
      href: "/dashboard/reports",
      icon: PieChart,
      variant: "ghost",
    },
    {
      title: "Database Schema",
      href: "/dashboard/erd",
      icon: Database,
      variant: "ghost",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
      variant: "ghost",
      disabled: user?.role !== "admin",
    },
  ]

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="outline" size="icon" className="h-9 w-9">
            <Menu className="h-4 w-4" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pr-0 sm:max-w-xs">
          <MobileSidebar items={items} pathname={pathname} setOpen={setOpen} />
        </SheetContent>
      </Sheet>
      <div
        className={cn(
          "hidden border-r bg-background md:flex md:flex-col",
          isCollapsed ? "md:w-16" : "md:w-64",
          className,
        )}
      >
        <div className="flex h-14 items-center px-4 py-2">
          {isCollapsed ? (
            <Home className="h-6 w-6" />
          ) : (
            <div className="flex items-center gap-2">
              <Home className="h-6 w-6" />
              <span className="font-bold">Analytics Dashboard</span>
            </div>
          )}
          <Button variant="ghost" size="icon" className="ml-auto h-8 w-8" onClick={onToggle}>
            <ChevronDown className={cn("h-4 w-4 transition-transform", isCollapsed ? "rotate-90" : "rotate-270")} />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        </div>
        <ScrollArea className="flex-1">
          <div className="flex flex-col gap-2 p-2">
            {items.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? "secondary" : "ghost"}
                size={isCollapsed ? "icon" : "default"}
                className={cn("justify-start", item.disabled && "opacity-50 pointer-events-none")}
                asChild
              >
                <Link href={item.disabled ? "#" : item.href}>
                  <item.icon className={cn("h-4 w-4", !isCollapsed && "mr-2")} />
                  {!isCollapsed && <span>{item.title}</span>}
                </Link>
              </Button>
            ))}
          </div>
        </ScrollArea>
        <div className="border-t p-4">
          <div className={cn("flex items-center justify-between", isCollapsed && "flex-col gap-2")}>
            <div className={cn("flex items-center gap-2", isCollapsed && "flex-col")}>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                {user?.name.charAt(0)}
              </div>
              {!isCollapsed && (
                <div className="space-y-1">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
                </div>
              )}
            </div>
            <Button variant="ghost" size={isCollapsed ? "icon" : "sm"} onClick={logout} className="h-8">
              <LogOut className="h-4 w-4" />
              {!isCollapsed && <span className="ml-2">Logout</span>}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

function MobileSidebar({
  items,
  pathname,
  setOpen,
}: {
  items: SidebarItem[]
  pathname: string
  setOpen: (open: boolean) => void
}) {
  const { user, logout } = useAuth()

  return (
    <div className="flex flex-col h-full">
      <div className="flex h-14 items-center px-4 py-2 border-b">
        <div className="flex items-center gap-2">
          <Home className="h-6 w-6" />
          <span className="font-bold">Analytics Dashboard</span>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-2 p-2">
          {items.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? "secondary" : "ghost"}
              className={cn("justify-start", item.disabled && "opacity-50 pointer-events-none")}
              asChild
              onClick={() => setOpen(false)}
            >
              <Link href={item.disabled ? "#" : item.href}>
                <item.icon className="h-4 w-4 mr-2" />
                <span>{item.title}</span>
              </Link>
            </Button>
          ))}
        </div>
      </ScrollArea>
      <div className="border-t p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              {user?.name.charAt(0)}
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={logout} className="h-8">
            <LogOut className="h-4 w-4" />
            <span className="ml-2">Logout</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
