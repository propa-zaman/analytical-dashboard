"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface LayoutContextType {
  colorScheme: string
  fontSize: string
  reducedMotion: boolean
  highContrast: boolean
}

const LayoutContext = createContext<LayoutContextType>({
  colorScheme: "blue",
  fontSize: "medium",
  reducedMotion: false,
  highContrast: false,
})

export function useLayout() {
  return useContext(LayoutContext)
}

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [settings, setSettings] = useState({
    colorScheme: "blue",
    fontSize: "medium",
    reducedMotion: false,
    highContrast: false,
  })

  useEffect(() => {
    setMounted(true)

    // Load saved preferences from localStorage
    const savedColorScheme = localStorage.getItem("colorScheme") || "blue"
    const savedFontSize = localStorage.getItem("fontSize") || "medium"
    const savedReducedMotion = localStorage.getItem("reducedMotion") === "true"
    const savedHighContrast = localStorage.getItem("highContrast") === "true"

    setSettings({
      colorScheme: savedColorScheme,
      fontSize: savedFontSize,
      reducedMotion: savedReducedMotion,
      highContrast: savedHighContrast,
    })

    // Apply saved settings
    document.documentElement.style.fontSize =
      savedFontSize === "small" ? "14px" : savedFontSize === "large" ? "18px" : "16px"

    document.documentElement.setAttribute("data-color-scheme", savedColorScheme)
    document.documentElement.classList.toggle("reduce-motion", savedReducedMotion)
    document.documentElement.classList.toggle("high-contrast", savedHighContrast)
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  return <LayoutContext.Provider value={settings}>{children}</LayoutContext.Provider>
}
