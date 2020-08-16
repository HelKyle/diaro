import React from 'react'
import Empty from '@/static/icons/cardboard.svg'
import styles from './index.module.less'

export default () => {
  return (
    <div className={styles.empty}>
      <Empty />
      <span>No Data.</span>
    </div>
  )
}
