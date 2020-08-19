import React from 'react'
import styles from './index.module.less'
import Logo from '@/static/icons/logo.svg'

export default () => {
  return (
    <div className={styles.pageLoading}>
      <i className={styles.logo}>
        <Logo />
      </i>
    </div>
  )
}
