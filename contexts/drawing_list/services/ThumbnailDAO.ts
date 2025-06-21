export interface ThumbnailDAO {

  /**
   * Saves the data of the thumbnail in the database.
   * `id` and `timeStamp` are used to identificate a specific thumbnail
   * @param id
   * @param timeStamp
   * @param data  Base64 with the thumbnail
   * @returns  The link generated to access it
   */
  save( id:string, timeStamp:number, data:string ): Promise<string>

  /**
   * Uses `id` and `timeStamp` to recover its saved thumbnail data
   * @param id
   * @param timeStamp
   * @returns  Base64 data of the thumbnail, if it was not saved yet: null
   */
  get( id:string, timeStamp:number ): Promise<string|null>

  /**
   * Eliminates the saved thumbnail. After this action the link generated with `ThumbnailDAO.save` is invalid
   * `id` and `timeStamp` are used to identificate a specific thumbnail
   * @param id
   * @param timeStamp
   */
  delete( id:string, timeStamp:number ): Promise<void>

}
