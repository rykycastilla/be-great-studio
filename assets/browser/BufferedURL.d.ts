declare namespace BufferedURL {

  /**
   * Gets the Array Buffer of the specified URL
   */
  function toBuffer( url:string ): Promise<ArrayBuffer>

  /**
   * Encodes an Array Buffer to a base64 URL
   */
  function toURL( buffer:ArrayBuffer, type:string ): Promise<string>

}
