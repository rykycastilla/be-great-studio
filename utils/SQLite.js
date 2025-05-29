import { openDatabaseAsync } from 'expo-sqlite'

/**
 * @import { SQLiteDatabase } from 'expo-sqlite'
 */

const CREATE_DRAWING_QUERY = /* sql */ `
  CREATE TABLE IF NOT EXISTS drawing (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    thumbnail TEXT NOT NULL UNIQUE,
    last_modified INTEGER NOT NULL
  )`

/**
 * @returns { Promise<SQLiteDatabase> }
 */
export async function SQLite() {
  const db = await openDatabaseAsync( 'be_great_studio.db' )
  await db.execAsync( CREATE_DRAWING_QUERY )
  return db
}
