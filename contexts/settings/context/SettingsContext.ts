export interface SettingsContext {
  resolution: number
  setResolution( resolution:number ): void
  aspectRatio: string
  setAspectRatio( aspectRatio:string ): void
}
