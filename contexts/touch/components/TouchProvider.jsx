import TouchList from './TouchList'
import { TouchContext } from '../context'
import { useCallback, useState } from 'react'
import { useTouchableViewResponder } from '../hooks/touchable_view_responder'
import { StyleSheet, View } from 'react-native'

/**
 * @import { LayoutChangeEvent } from 'react-native'
 * @import { Point } from '../models/Point'
 * @import { ReactElement, ReactNode } from 'react'
 * @import { Touch } from '../models/Touch'
 */

/**
 * @typedef { object } TouchProviderProps
 * @property { ReactNode } children
 * @property { boolean } disabled
 * @property { ( x:number, y:number ) => boolean } checkIsInArea
 */

/**
 * Represents a container to render touch indicators when touches are detected
 * @param { TouchProviderProps } props
 * @returns { ReactElement }
 */
const TouchProvider = ( props ) => {

  const { disabled, children, checkIsInArea } = props
  const [ touchList, setTouchList ] = useState( /** @type { Touch[] } */ ( [] ) )
  const [ touchSize, setTouchSize ] = useState( 0 )
  const [ providerPosition, setProviderPosition ] = useState( /** @type { Point | null } */ ( null ) )
  const responder = useTouchableViewResponder( providerPosition, setTouchList, checkIsInArea )

  const handleLayout = useCallback(
    /** @type { ( event:LayoutChangeEvent ) => void } */
    ( event ) => {
      event.target.measure( ( _x, _y, _width, _height, x, y ) => {
        setProviderPosition( { x, y } )
      } )
    }, [] )

  return (
    <TouchContext.Provider value={ { setTouchSize } }>
      <View
        style={ styles.touchProvider }
        { ...( disabled ? {} : responder ) }
        onLayout={ handleLayout }
      >
        { children }
        { !disabled && <TouchList data={ touchList } touchSize={ touchSize } /> }
      </View>
    </TouchContext.Provider>
  )

}

const styles = StyleSheet.create( {
  touchProvider: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
} )

export default TouchProvider
