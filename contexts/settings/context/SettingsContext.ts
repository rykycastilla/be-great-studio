import { Format } from '@/modules/image_converter/models'

export interface SettingsContext {
  resolution: number
  setResolution( resolution:number ): void
  aspectRatio: string
  setAspectRatio( aspectRatio:string ): void
  showTouchCursor: boolean
  setShowTouchCursor( showTouchCursor:boolean ): void
  exportResolution: number
  setExportResolution( exportResolution:number ): void
  exportFormat: Format
  setExportFormat( exportFormat:Format ): void
}
