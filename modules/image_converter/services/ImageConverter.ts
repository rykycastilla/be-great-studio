import { Format } from '../models/Format'

export interface ImageConverter {
  convert( imageData:string, format:Format.PNG, resolution:number ): Promise<string>
  convert( imageData:string, format:Format.BGPX, name:string, resolution:number, aspectRatio:string, date:number ): Promise<string>
}
