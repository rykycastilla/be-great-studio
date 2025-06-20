export interface Drawing {
  id: string
  name: string
  /** empty string represents an instance not saved yet in the database */
  thumbnail: string
  resolution: number
  aspectRatio: string
  lastModified: Date
}
