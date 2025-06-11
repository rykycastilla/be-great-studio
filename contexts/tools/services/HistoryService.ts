export interface HistoryService {
  canUndo: boolean
  canRedo: boolean
  undo(): void
  redo(): void
}
