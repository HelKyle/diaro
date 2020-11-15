import React, { useState, useCallback } from 'react'
import { remote } from 'electron'
import styles from './index.module.less'
import FormField from './components/FormField'
import ToggleSwitch from '@/components/ToggleSwitch'
import RadioGroup, { RadioItem } from '@/components/RadioGroup'
import { useThemeSource } from '@/lib/theme'

export default () => {
  const { app } = remote
  const [openAtLogin, setOpenAtLogin] = useState(
    app.getLoginItemSettings().openAtLogin
  )
  const [themeSource, setThemeSource] = useThemeSource()

  const toggleOpenAtLogin = useCallback((checked: boolean) => {
    setOpenAtLogin(checked)
    app.setLoginItemSettings({
      openAtLogin: checked
    })
  }, [])

  return (
    <div className={styles.settings}>
      <FormField label="Theme">
        <RadioGroup value={themeSource} onChange={setThemeSource}>
          <RadioItem value="system" label="System" />
          <RadioItem value="light" label="Light" />
          <RadioItem value="dark" label="Dark" />
        </RadioGroup>
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
