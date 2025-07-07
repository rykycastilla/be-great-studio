export interface ImageConverter {
  convert( imageData:string, resolution:number ): Promise<string>
}
