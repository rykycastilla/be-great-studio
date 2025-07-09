declare namespace ImageUtils {

  /**
   * Creates an offscreen HTML Image reference
   * @param src  Source to be loaded as image
   */
  function buildImage( src:string ): Promise<HTMLImageElement>

}
