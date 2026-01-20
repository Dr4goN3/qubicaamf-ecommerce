export type TooltipPosition = 'top' | 'right' | 'bottom' | 'left'

export interface TooltipProps {
  text: string
  position?: TooltipPosition
  disabled?: boolean
}

