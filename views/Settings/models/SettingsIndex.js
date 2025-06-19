import resolution from '../data/resolution.json'

/**
 * @import { Setting } from './Setting'
 */

/** @type { Record<string,Setting> } */ export const SettingsIndex = {}

/** @type { Setting[] } */ const settingsList = [ resolution ]
for( const setting of settingsList ) {
  SettingsIndex[ setting.target ] = setting
}
