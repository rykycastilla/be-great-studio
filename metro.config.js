const { getDefaultConfig } = require( 'expo/metro-config' )  // eslint-disable-line

const config = getDefaultConfig( __dirname )

function main() {
  if( config.resolver === undefined ) { return }
  const { assetExts } = /** @type { { assetExts:string[] } } */ ( config.resolver )
  assetExts.push( 'es6' )
}

main()

module.exports = config
