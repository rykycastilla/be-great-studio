import { Canvas, Image, FilterMode, MipmapMode, Skia } from '@shopify/react-native-skia'
import { useEffect, useState } from 'react'
import { View } from 'react-native'

/**
 * @import { Drawing } from '@/contexts/drawing_list'
 * @import { SkImage } from '@shopify/react-native-skia'
 * @import { ReactElement } from 'react'
 */

/**
 * @param { string } uri
 * @returns { Promise<SkImage|null> }
 */
async function getImage( uri ) {
  const data = await Skia.Data.fromURI( uri )
  return Skia.Image.MakeImageFromEncoded( data )
}

/**
 * @typedef { object } PixelatedImageProps
 * @property { Drawing } drawing
 * @property { number } width
 * @property { number } height
 */

/**
 * @param { PixelatedImageProps } props
 * @returns { ReactElement }
 */
const PixelatedImage = ( props ) => {

  const { drawing, width, height } = props
  const { thumbnail } = drawing
  const sampling = { filter:FilterMode.Nearest, mipmap:MipmapMode.Nearest }
  const [ image, setImage ] = useState( /** @type { SkImage | null } */ ( null ) )

  useEffect( () => {
    let canExecute = true
    // Loading image
    const gettingImage = getImage( thumbnail )
    gettingImage.then( ( image ) => {
      if( canExecute ) { setImage( image ) }
    } )
    // Avoiding execution if the thumbnail changes
    return () => { canExecute = false }
  }, [ thumbnail ] )

  return (
    <View style={ { width, height } }>
      <Canvas style={ { flex:1 } }>
        {
          image !== null &&
        <Image
          fit="fill"
          sampling={ sampling }
          image={ image }
          x={ 0 }
          y={ 0 }
          width={ width }
          height={ height } />
        }
      </Canvas>
    </View>
  )
}

export default PixelatedImage
