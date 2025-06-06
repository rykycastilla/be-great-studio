export interface ActionRef {
  current?: ActionCallback
}

interface ActionCallback {
  (): void
}
