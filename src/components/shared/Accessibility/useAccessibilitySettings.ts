import { useEffect, useState } from 'react'
import type { FontSize, Theme } from './types'

function readStorage<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key)
    return v ? (v as unknown as T) : fallback
  } catch {
    return fallback
  }
}

export function useAccessibilitySettings() {
  const [fontSize, setFontSize] = useState<FontSize>(() => readStorage('a11y-font-size', 'medium'))
  const [highContrast, setHighContrast] = useState<boolean>(
    () => readStorage<string>('a11y-high-contrast', 'false') === 'true',
  )
  const [theme, setTheme] = useState<Theme>(() => readStorage('a11y-theme', 'dark'))

  useEffect(() => {
    document.documentElement.dataset.fontSize = fontSize
    localStorage.setItem('a11y-font-size', fontSize)
  }, [fontSize])

  useEffect(() => {
    document.documentElement.dataset.highContrast = String(highContrast)
    localStorage.setItem('a11y-high-contrast', String(highContrast))
  }, [highContrast])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('a11y-theme', theme)
  }, [theme])

  function reset() {
    setFontSize('medium')
    setHighContrast(false)
    setTheme('dark')
  }

  return {
    fontSize,
    setFontSize,
    highContrast,
    setHighContrast,
    theme,
    setTheme,
    reset,
  }
}
