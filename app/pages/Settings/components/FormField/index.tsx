import React from 'react'
import styles from './index.module.less'

interface Props {
  label: string
  children: React.ReactNode
}

export default (props: Props) => {
  const { label, children } = props
  return (
    <div className={styles.formField}>
      <div className={styles.label}>{label}</div>
      <div className={styles.field}>{children}</div>
    </div>
  )
}
