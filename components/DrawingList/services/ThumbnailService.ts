export interface ThumbnailService {
  save( id:string, data:string ): Promise<string>
}
