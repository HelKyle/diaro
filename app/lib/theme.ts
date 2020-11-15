import { remote } from 'electron'
import { useCallback, useReducer } from 'react'

import './theme.less'

export type ThemeSource = typeof remote.nativeTheme.themeSource

const LocalStorageKey = 'theme-source'

remote.nativeTheme.themeSource =
  (localStorage.getItem(LocalStorageKey) as ThemeSource) || 'system'

document.documentElement.setAttribute(
  'data-theme',
  remote.nativeTheme.shouldUseDarkColors ? 'dark' : 'light'
)

remote.nativeTheme.on('updated', () => {
  if (remote.nativeTheme.themeSource !== 'system') {
    return
  }

  document.documentElement.setAttribute(
    'data-theme',
    remote.nativeTheme.shouldUseDarkColors ? 'dark' : 'light'
  )
})

export const useThemeSource = () => {
  const [themeSource, setThemeSource] = useReducer(
    (cur: ThemeSource, next: ThemeSource) =>
      (remote.nativeTheme.themeSource = next),
    remote.nativeTheme.themeSource
  )

  const userChangeThemeSource = useCallback((newThemeSource: ThemeSource) => {
    setThemeSource(newThemeSource)
    localStorage.setItem(LocalStorageKey, newThemeSource)

    if (newThemeSource === 'system') {
      const systemTheme = remote.nativeTheme.shouldUseDarkColors
        ? 'dark'
        : 'light'
      document.documentElement.setAttribute('data-theme', systemTheme)
    } else if (newThemeSource) {
      document.documentElement.setAttribute('data-theme', newThemeSource)
    }
  }, [])

  return [themeSource, userChangeThemeSource] as const
}
