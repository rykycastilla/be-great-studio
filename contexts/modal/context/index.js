import { createContext } from 'react'

/**
 * @import { ModalContext } from './ModalContext'
 */

/**
 * @typedef { import( './ActionRef' ).ActionRef } ActionRef
 * @typedef { import( './ModalConfig' ).ModalConfig } ModalConfig
 */

const ModalContext = createContext(
  /** @type { ModalContext } */ ( /** @type { unknown } */ ( null ) ),
)

export { ModalContext }
