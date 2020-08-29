import React from 'react'
import classnames from 'classnames'
import styles from './index.module.less'

interface Props {
  value?: number
  onChange: (val: number) => void
}

export default (props: Props) => {
  const { onChange } = props

  return (
    <ul className={styles.flagSelector}>
      {new Array(8).fill(0).map((value, index) => {
        return (
          <li
            className={classnames(styles.flagItem, {
              [styles.active]: index === props.value
            })}
            data-color-flag={index}
            onClick={() => onChange(index)}
            key={index}
          />
        )
      })}
    </ul>
  )
}
