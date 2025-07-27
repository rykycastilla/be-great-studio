import { useDimensions } from '@/contexts/window'
import { useMemo } from 'react'
import { useTheme } from '@/contexts/theme'

/**
 * @import { Theme, ThemeContext } from '@/contexts/theme'
 */

/**
 * @param { number } width
 * @param { string } aspectRatio
 * @returns { number }
 */
function calcHeightWithAspectRatio( width, aspectRatio ) {
  switch ( aspectRatio ) {
  case '3:4':
    return ( width * 4 ) / 3
  case '9:16':
    return ( width * 16 ) / 9
  }
  return width  // default: 1:1
}

/**
 * @param { number } windowWidth
 * @param { string } aspectRatio
 * @param { Theme } theme
 * @param { ThemeContext[ 'colors' ] } colors
 * @returns { object }
 */
function getCanvasStyle( windowWidth, aspectRatio, theme, colors ) {
  // Calculating dimensions
  const width = windowWidth - 32 // 16px of margin in  both sides
  const height = calcHeightWithAspectRatio( width, aspectRatio )
  // Building styles
  return {
    width,
    height,
    marginBottom: 16,
    backgroundColor: theme === 'dark' ? '#000000' : '#FFFFFF',
    borderWidth: 1,
    borderColor: theme === 'dark' ? colors.border : colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: theme === 'dark' ? 0.25 : 0.15,
    shadowRadius: 6,
  }
}

/**
 * @param { string } aspectRatio
 * @returns { object }
 */
export function useCanvasStyle( aspectRatio ) {
  const { colors, theme } = useTheme()
  const { width } = useDimensions()
  return useMemo( () => {
    return getCanvasStyle( width, aspectRatio, theme, colors )
  }, [ width, aspectRatio, theme, colors ] )
}
