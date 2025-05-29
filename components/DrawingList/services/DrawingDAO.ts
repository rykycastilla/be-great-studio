import { DrawingDTO } from './DrawingDTO'

export interface DrawingDAO {
  readItems(): Promise<DrawingDTO[]>
  saveItem( drawing:DrawingDTO ): Promise<void>
}
