import { SQLite } from '@/utils/SQLite'

/**
 * @import { DrawingDAO, DrawingDTO } from '../services'
 */

/**
 * @implements { DrawingDAO }
 */
export class SqliteDrawingDAO {

  /** @private */ db = SQLite()

  /**
   * @public
   * @returns { Promise<DrawingDTO[]> }
   */
  async readItems() {
    const db = await this.db
    try {
      const result = await db.getAllAsync( /* sql */ `SELECT * FROM drawing` )
      return result
    }
    catch {
      this.db = SQLite()
      return this.readItems()
    }
  }

  /**
   * @public
   * @param { DrawingDTO } drawing
   */
  async saveItem( drawing ) {
    const db = await this.db
    const { id, name, thumbnail, resolution, aspect_ratio, last_modified } = drawing
    try {
      await db.runAsync(
        /* sql */ `REPLACE INTO drawing (id, name, thumbnail, resolution, aspect_ratio, last_modified) VALUES (?, ?, ?, ?, ?, ?)`,
        [ id, name, thumbnail, resolution, aspect_ratio, last_modified ],
      )
    }
    catch {
      this.db = SQLite()
      await this.saveItem( drawing )
    }
  }

  /**
   * @public
   * @param { DrawingDTO } drawing
   */
  async removeItem( drawing ) {
    const db = await this.db
    const { id } = drawing
    try {
      await db.runAsync( /* sql */ `DELETE FROM drawing WHERE id = ?`, [ id ] )
    }
    catch {
      this.db = SQLite()
      await this.removeItem( drawing )
    }
  }

}
