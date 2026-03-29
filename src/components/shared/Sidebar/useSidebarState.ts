import { useState } from 'react'

export function useSidebarState() {
  const [collapsed, setCollapsed] = useState(false)
  const [accessibilityOpen, setAccessibilityOpen] = useState(false)

  function toggleCollapsed() {
    setCollapsed((value) => !value)
  }

  function toggleAccessibility() {
    setAccessibilityOpen((value) => !value)
  }

  function closeAccessibility() {
    setAccessibilityOpen(false)
  }

  return {
    collapsed,
    accessibilityOpen,
    toggleCollapsed,
    toggleAccessibility,
    closeAccessibility,
  }
}
