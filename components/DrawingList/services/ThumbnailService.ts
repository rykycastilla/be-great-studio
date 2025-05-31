export interface ThumbnailService {
  loadContent( path:string ): Promise<string|null>
  save( id:string, timeStamp:number, data:string ): Promise<string>
}
