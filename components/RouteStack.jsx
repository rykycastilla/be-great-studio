import { Stack } from '@/contexts/debounced_router'
import { useDimensions } from '@/contexts/window'
import { useTheme } from '@/contexts/theme'

/**
 * @import { ReactElement } from 'react'
 */

/**
 * @returns { ReactElement }
 */
const RouteStack = () => {
  const { colors } = useTheme()
  const { width, height } = useDimensions()
  return (
    <Stack
      screenOptions={ {
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        presentation: 'card',
        animation: 'slide_from_right',
        contentStyle: {
          minWidth: width,
          maxWidth: width,
          maxHeight: height,
          minHeight: height,
          backgroundColor: colors.background,
        },
        animationTypeForReplace: 'push',
      } } />
  )
}

export default RouteStack
