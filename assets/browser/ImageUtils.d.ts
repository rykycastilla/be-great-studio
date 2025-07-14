declare namespace ImageUtils {

  /**
   * Converts the base64url image using the specified format (and resolution)
   */
  function convert( base64Url:string, format:string, resolution:number ): Promise<string>

}
