import TouchList from './components/TouchList'
import { useState } from 'react'
import { useTouchableViewResponder } from './hooks/touchable_view_responder'
import { View } from 'react-native'

/**
 * @import { ReactElement } from 'react'
 * @import { Touch } from './types/Touch'
 * @import { TouchableViewProps } from './types/TouchableViewProps'
 */

/**
 * @param { TouchableViewProps } props
 * @returns { ReactElement }
 */
const TouchableView = ( props ) => {
  const { touchIndicatorSize, children, ...viewProps } = props
  const [ touchList, setTouchList ] = useState( /** @type { Touch[] } */ ( [] ) )
  const responder = useTouchableViewResponder( setTouchList )
  return (
    <View { ...viewProps } { ...responder }>
      { children }
      <TouchList data={ touchList } touchSize={ touchIndicatorSize } />
    </View>
  )
}

export default TouchableView
