export type FontSize = 'small' | 'medium' | 'large'
export type Theme = 'dark' | 'light'

export interface AccessibilityProps {
  isOpen: boolean
  onClose: () => void
}
