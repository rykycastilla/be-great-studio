export interface TemporalFilesService {
  /**
   * Takes `data` and transforms it to a temporal file
   * @param data  Base64 encoded data to be converted in a temporal file
   * @param callback  a `FileExistenceCallback` that provides a file path which exists only uring the callback lifecycle
   */
  use( data:string, name:string, callback:FileExistenceCallback ): Promise<void>
}

export interface FileExistenceCallback {
  ( filePath:string ): Promise<void> | void
}
