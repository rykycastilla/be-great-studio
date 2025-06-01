import { Drawing } from '../models'

export interface DrawingListContext {
  viewMode: 'grid' | 'list'
  setViewMode( viewMode:( 'grid' | 'list' ) ): void
  drawingList: Drawing[]
  saveDrawing( drawing:Drawing, data:string ): Promise<void>
  updateDrawing( drawing:Drawing, newProperties:Partial<Drawing> ): Promise<void>
  loadDrawingThumbnail( drawing:Drawing ): Promise<string|null>
}
