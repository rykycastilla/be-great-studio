declare namespace PNG {

  /**
   * Changes the resolution of a PNG image on a base64 url, creating a new one
   */
  function reScale( base64Url:string, resolution:number ): Promise<string>

}
