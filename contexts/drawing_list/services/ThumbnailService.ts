export interface ThumbnailService {
  loadContent( path:string ): Promise<string|null>
  delete( path:string ): Promise<void>
  save( id:string, timeStamp:number, data:string ): Promise<string>
  clone( from:string, fileName:string, timeStamp:number ): Promise<string>
}
