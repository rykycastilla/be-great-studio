export interface ThumbnailDAO {
  save( id:string, timeStamp:number, data:string ): Promise<string>
  get( id:string, timeStamp:number ): Promise<string|null>
  delete( id:string, timeStamp:number ): Promise<void>
}
