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
    const result = await db.getAllAsync( /* sql */ `SELECT * FROM drawing` )
    return result
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

  /**
   * @public
   * @param { DrawingDTO } drawing
   */
  async removeItem( drawing ) {
    const db = await SQLite()
    const { id } = drawing
    await db.runAsync( /* sql */ `DELETE FROM drawing WHERE id = ?`, [ id ] )
  }

}
