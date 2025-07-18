import { getLocales } from 'expo-localization'

export function getSystemLanguage(): string {
  const systemLocaleList = getLocales()
  return systemLocaleList[ 0 ]?.languageCode ?? 'en'
}
