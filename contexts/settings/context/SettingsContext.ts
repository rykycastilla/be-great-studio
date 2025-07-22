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

  /**
   * Language config value, incluiding `'system'` option
   * @example 'en', 'es', 'system'
   */
  language: string

  /**
   * Updates the language config (`language`)
  */
  setLanguage( language:string ): void

  /**
   * Real language value
   * @example 'en', 'es'
   */
  currentLanguage: string

}
