import { createContext } from 'react'

/**
 * @import { Context } from 'react'
 * @import { ThemeContext } from './ThemeContext'
 */

const ThemeContext =  /** @type { Context<ThemeContext> } */ (
  createContext( {
    theme: 'light',
    colors: {
      background: '#FFFFFF',
      text: '#000000',
      primary: '#007AFF',
      secondary: '#5AC8FA',
      card: '#F2F2F7',
      border: '#C7C7CC',
      canvas: '#F9F9F9',
      inactive: '#8E8E93',
    },
  } )
)

export { ThemeContext }
