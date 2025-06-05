export interface ModalConfig {
  title: string
  acceptButtonTitle?: string
  isButtonInactive?: boolean
  hideButtons?: boolean
  onAccept?: () => void
}
