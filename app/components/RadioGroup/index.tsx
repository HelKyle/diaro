import React, { Children, useCallback, useRef } from 'react'
import styles from './index.module.less'

interface ItemProps {
  label: string
  value: string
  checked?: boolean
  name?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

export const RadioItem = (props: ItemProps) => {
  const { label, value, name, checked, onChange } = props
  return (
    <div className={styles.radioItem}>
      <input
        type="radio"
        id={value}
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={value}>{label}</label>
    </div>
  )
}

interface Props<T = string> {
  name?: string
  value?: T
  onChange: (val: T) => void
  children: React.ReactElement[]
}

const RadioGroup = function <T>(props: Props<T>) {
  const randomName = useRef(Math.random()).current
  const { children, name = randomName, value, onChange } = props

  const handleRadioChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      const { id } = event.target
      onChange(id as any)
    },
    []
  )

  return (
    <div className={styles.radioGroup}>
      {Children.map(children, (item) => {
        return React.cloneElement(item, {
          ...item.props,
          checked: value === item.props.value,
          name,
          onChange: handleRadioChange
        })
      })}
    </div>
  )
}

export default RadioGroup
