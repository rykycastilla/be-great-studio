import { SQLite } from '@/utils/SQLite'

/**
 * @import { Drawing } from '../models'
 * @import { DrawingDAO, DrawingDTO } from '../services'
 */

/**
 * @implements { DrawingDAO }
 */
export class SqliteDrawingDAO {

  /**
   * @public
   * @returns { Promise<DrawingDTO[]> }
   */
  async readItems() {
    const db = await SQLite()
    return db.getAllAsync( /* sql */ `SELECT * FROM drawing` )
  }

  /**
   * @public
   * @param { DrawingDTO } drawing
   */
  async saveItem( drawing ) {
    const db = await SQLite()
    const { id, name, thumbnail, last_modified } = drawing
    await db.runAsync(
      /* sql */ `REPLACE INTO drawing (id, name, thumbnail, last_modified) VALUES (?, ?, ?, ?)`,
      [ id, name, thumbnail, last_modified ],
    )
  }

}
