import { useColor } from './color'

/**
 * @returns { string }
 */
export function useCurrentColor() {
  const [ color ] = useColor()
  return color
}
