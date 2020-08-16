import React from 'react'
import classnames from 'classnames'
import styles from './index.module.less'

interface Props {
  value: number
  onChange: (val: number) => void
}

export default (props: Props) => {
  const { onChange } = props
  const items = [
    {
      value: 0,
      className: styles.red
    },
    {
      value: 1,
      className: styles.yellow
    },
    {
      value: 2,
      className: styles.blue
    },
    {
      value: 3,
      className: styles.green
    },
    {
      value: 4,
      className: styles.purple
    },
    {
      value: 5,
      className: styles.pink
    },
    {
      value: 6,
      className: styles.orange
    },
    {
      value: 7,
      className: styles.cyan
    }
  ]

  return (
    <ul className={styles.flagSelector}>
      {items.map(({ value, className }) => {
        return (
          <li
            className={classnames(className, styles.flagItem, {
              [styles.active]: value === props.value
            })}
            onClick={() => onChange(value)}
            key={value}
          />
        )
      })}
    </ul>
  )
}
