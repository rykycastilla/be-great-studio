declare namespace BGPX {

  /**
   * Converts a PNG base64 url to a BGPX base64 url, saving its metadata
   */
  function encode(
    pngUrl:string, name:string, resolution:number, aspectRatio:string, date:number,
  ): Promise<string>

  interface Bgpx {
    name: string
    resolution: number
    aspectRatio: string
    date: number
    base64Url: string
  }

  /**
   * Converts a BGPX base64 url to a PNG base64 url and recovers its metadata
   */
  function decode( bgpxUrl:string ): Promise<Bgpx>

}
