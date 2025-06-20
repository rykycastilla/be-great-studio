import aspectRatio from '../data/aspect_ratio.json'
import resolution from '../data/resolution.json'

/**
 * @import { Setting } from './Setting'
 */

/** @type { Record<string,Setting> } */ export const SettingsIndex = {}

/** @type { Setting[] } */ const settingsList = [ aspectRatio, resolution ]
for( const setting of settingsList ) {
  SettingsIndex[ setting.target ] = setting
}
