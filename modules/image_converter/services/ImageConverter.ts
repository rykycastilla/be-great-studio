import { Format } from '../models/Format'

export interface ImageConverter {

  convert( imageData:string, format:Format.PNG|Format.JPEG, resolution:number ): Promise<string>
  convert( imageData:string, format:Format.BGPX, name:string, resolution:number, aspectRatio:string, date:number ): Promise<string>

  /**
   * Transformas a base64url of image/bgpx to BGPX data on the system
   */
  decode( bgpxImageData:string ): Promise<BgpxProperties|undefined>

}

export interface BgpxProperties {
  name: string
  resolution: number
  aspectRatio: string
  date: number
  base64Url: string
}
