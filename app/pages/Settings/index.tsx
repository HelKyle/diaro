import React, { useEffect, useState, useCallback } from 'react'
import { remote } from 'electron'
import Moon from '@/static/icons/moon.svg'
import FullMoon from '@/static/icons/full-moon.svg'
import styles from './index.module.less'
import FormField from './components/FormField'
import ToggleSwitch from '@/components/ToggleSwitch'

export default () => {
  const { app } = remote
  const [openAtLogin, setOpenAtLogin] = useState(
    app.getLoginItemSettings().openAtLogin
  )
  const [isDarkTheme, setDarkTheme] = useState(
    localStorage.getItem('theme') === 'dark'
  )

  const toggleOpenAtLogin = useCallback((checked: boolean) => {
    setOpenAtLogin(checked)
    app.setLoginItemSettings({
      openAtLogin: checked
    })
  }, [])

  const toggleTheme = useCallback((checked: boolean) => {
    if (checked) {
      document.documentElement.setAttribute('data-theme', 'dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.setAttribute('data-theme', 'light')
      localStorage.setItem('theme', 'light')
    }
    setDarkTheme(checked)
  }, [])

  const renderThemeContent = useCallback((checked: boolean) => {
    return checked ? <FullMoon /> : <Moon />
  }, [])

  return (
    <div className={styles.settings}>
      <FormField label="Theme">
        <ToggleSwitch
          id="theme"
          value={isDarkTheme}
          onChange={toggleTheme}
          renderContent={renderThemeContent}
        />
      </FormField>
      <FormField label="Open at login">
        <ToggleSwitch
          id="openAtLogin"
          value={openAtLogin}
          onChange={toggleOpenAtLogin}
        />
      </FormField>
    </div>
  )
}
