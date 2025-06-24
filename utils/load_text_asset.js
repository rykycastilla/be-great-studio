import { Asset } from 'expo-asset'
import * as FileSystem from 'expo-file-system'

/**
 * @param { number } assetModule
 * @returns { Promise<string> }
 */
export async function loadTextAsset( assetModule ) {
  const asset = Asset.fromModule( assetModule )
  await asset.downloadAsync()
  if( asset.localUri === null ) { return '' }
  return FileSystem.readAsStringAsync( asset.localUri )
}
