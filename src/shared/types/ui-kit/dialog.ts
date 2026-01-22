export type DialogSize = string | number

export interface DialogProps {
  width?: DialogSize
  height?: DialogSize
  ariaLabel?: string
  closeOnBackdrop?: boolean
  closeOnEsc?: boolean
}
