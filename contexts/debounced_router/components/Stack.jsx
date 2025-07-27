import { Stack as ExpoStack } from 'expo-router'
import { STACK_ANIMATION_DURATION } from '../constants'

/**
 * @import { ReactElement } from 'react'
 * @import { StackProps } from '../models/StackProps'
 */

/**
 * @typedef { object } StackScreenOptions
 * @property { number } animationDuration
 */

/**
 * @param { StackScreenOptions } optionsObject
 */
function freezeStackAnimation( optionsObject ) {
  optionsObject.animationDuration = STACK_ANIMATION_DURATION
}

/**
 * @param { StackProps } props
 * @returns { ReactElement }
 */
const Stack = ( props ) => {
  freezeStackAnimation( /** @type { StackScreenOptions } */ ( props.screenOptions ) )
  return <ExpoStack { ...props } />
}

export default Stack
