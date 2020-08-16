import React, { useEffect, useState, useCallback } from 'react'
import { remote } from 'electron'
import styles from './index.module.less'

export default () => {
  const { app } = remote
  const [openAtLogin, setOpenAtLogin] = useState(false)
  useEffect(() => {
    const { openAtLogin } = app.getLoginItemSettings()
    setOpenAtLogin(openAtLogin)
  }, [])

  const toggleOpenAtLogin = useCallback(() => {
    setOpenAtLogin((val) => {
      app.setLoginItemSettings({
        openAtLogin: !val
      })
      return !val
    })
  }, [])

  return (
    <div className={styles.settings}>
      <button onClick={toggleOpenAtLogin}>
        Open At Login: {openAtLogin ? 'on' : 'off'}
      </button>
    </div>
  )
}
