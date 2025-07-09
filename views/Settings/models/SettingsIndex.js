import aspectRatio from '../data/aspect_ratio.json'
import exportFormat from '../data/export_format.json'
import exportResolution from '../data/export_resolution.json'
import resolution from '../data/resolution.json'

/**
 * @import { Setting } from './Setting'
 */

/** @type { Record<string,Setting> } */ export const SettingsIndex = {}

/** @type { Setting[] } */ const settingsList = [ aspectRatio, exportFormat, exportResolution, resolution ]
for( const setting of settingsList ) {
  SettingsIndex[ setting.target ] = setting
}
