import { Drawing, Sort } from '../models'

export interface DrawingListContext {
  viewMode: 'grid' | 'list'
  setViewMode( viewMode:( 'grid' | 'list' ) ): void
  isSelectionMode: boolean
  setIsSelectionMode( isSelectionMode:boolean ): void
  selectionList: Set<string>
  setSelectionList( selectionList:Set<string> ): void
  drawingList: Drawing[]
  saveDrawing( drawing:Drawing, data:string ): Promise<void>
  updateDrawing( drawing:Drawing, newProperties:Partial<Drawing> ): Promise<void>
  duplicateDrawing( drawing:Drawing ): Promise<void>
  removeDrawing( drawing:Drawing ): Promise<void>
  shareDrawing( drawing:Drawing ): Promise<void>
  loadDrawingThumbnail( drawing:Drawing ): Promise<string|null>
  sort: Sort
  setSort( sort:Sort ): void
}
