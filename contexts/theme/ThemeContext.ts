import { Theme } from './Theme'

export interface ThemeContext {
  theme: Theme
  colors: {
    background: string
    text: string
    primary: string
    secondary: string
    card: string
    border: string
    canvas: string
    inactive: string
  }
}
