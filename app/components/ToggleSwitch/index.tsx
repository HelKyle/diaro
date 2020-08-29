import React, { useCallback } from 'react'
import styles from './index.module.less'

interface Props {
  id: string
  size: number
  value: boolean
  onChange: (val: boolean) => void
  renderContent?: (val: boolean) => React.ReactNode
}

export default (props: Props) => {
  const { value, onChange, renderContent = () => null, id, size } = props

  const handleCheckboxChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.checked)
    },
    [onChange]
  )

  return (
    <div className={styles.switch} style={{ fontSize: size }}>
      <input
        type="checkbox"
        id={id}
        checked={value}
        onChange={handleCheckboxChange}
      />
      <label htmlFor={id}>
        <div className={styles.bar}></div>
        <div className={styles.content}>{renderContent(value)}</div>
      </label>
    </div>
  )
}
