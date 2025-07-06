export interface SettingsContext {
  resolution: number
  setResolution( resolution:number ): void
  aspectRatio: string
  setAspectRatio( aspectRatio:string ): void
  showTouchCursor: boolean
  setShowTouchCursor( showTouchCursor:boolean ): void
  exportResolution: number
  setExportResolution( exportResolution:number ): void
}
