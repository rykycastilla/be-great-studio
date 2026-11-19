import CollapsedToolsArea from './CollapsedToolsArea'
import ToolsAreaCard from './ToolsAreaCard'
import { Easing, withTiming } from 'react-native-reanimated'
import { StyleSheet, View } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import { useLayoutEffect, useState } from 'react'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @typedef { object } ToolsAreaProps
 * @property { ( color:string ) => void } dispatchColorPicker
 */

/**
 * @param { ToolsAreaProps } props
 * @returns { ReactElement }
 */
const ToolsArea = ( props ) => {

  const { dispatchColorPicker } = props
  const [ toolbarExpanded, setToolbarExpanded ] = useState( true )
  const toolbarOpacity = useSharedValue( 1 )
  const toolbarScale = useSharedValue( 1 )
  const toolbarTranslateY = useSharedValue( 0 )
  const collapsedToolbarOpacity = useSharedValue( 0 )
  const collapsedToolbarScale = useSharedValue( 0.5 )
  const collapsedToolbarTranslateY = useSharedValue( 20 )

  const collapseToolbar = () => {
    // Animating toolbar fading
    toolbarScale.value = withTiming( 0.8, { duration: 200, easing: Easing.out( Easing.ease ) } )
    toolbarTranslateY.value = withTiming( 20, { duration: 200 } )
    toolbarOpacity.value = withTiming( 0, { duration: 200 }, () => {
      // Animating collpased bar showing
      collapsedToolbarScale.value = withTiming( 1, { duration: 250, easing: Easing.elastic( 1.2 ) } )
      collapsedToolbarTranslateY.value = withTiming( 0, { duration: 250 } )
      collapsedToolbarOpacity.value = withTiming( 1, { duration: 250 } )
    } )
  }

  const expandToolbar = () => {
    // Animating collpased toolbar hiding
    collapsedToolbarScale.value = withTiming( 0.5, { duration: 200 } )
    collapsedToolbarTranslateY.value = withTiming( 20, { duration: 200 } )
    collapsedToolbarOpacity.value = withTiming( 0, { duration: 200 }, () => {
      // Animating expanded toolbar showing
      toolbarScale.value = withTiming( 1, { duration: 250, easing: Easing.elastic( 1.1 ) } )
      toolbarTranslateY.value = withTiming( 0, { duration: 250 } )
      toolbarOpacity.value = withTiming( 1, { duration: 250 }, () => {
      } )
    } )
  }

  useLayoutEffect( () => {
    if( toolbarExpanded ) { expandToolbar() }
    else { collapseToolbar() }
  }, [ toolbarExpanded ] )  // eslint-disable-line

  return (
    <View style={ styles.toolsContainerWrapper }>
      <ToolsAreaCard
        opacity={ toolbarOpacity }
        scale={ toolbarScale }
        translateY={ toolbarTranslateY }
        dispatchColorPicker={ dispatchColorPicker } />
      <CollapsedToolsArea
        opacity={ collapsedToolbarOpacity }
        scale={ collapsedToolbarScale }
        translateY={ collapsedToolbarTranslateY }
        onShowToolsArea={ () => setToolbarExpanded( true ) } />
    </View>
  )
}

const styles = StyleSheet.create( {
  toolsContainerWrapper: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    alignItems: 'center',
    zIndex: 100,
  },
} )

export default ToolsArea
