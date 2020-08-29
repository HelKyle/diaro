import React, { useCallback, useState } from 'react'
import ToggleSwitch from '@/components/ToggleSwitch'
import FlagSelector from '@/components/FlagSelector'
import styles from './index.module.less'

interface Props {
  onSubmit: (value: any) => void
}

export default (props: Props) => {
  const { onSubmit } = props
  const [form, setForm] = useState({
    like: '',
    flag: undefined,
    deleted: false
  })

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.stopPropagation()
      event.preventDefault()
      onSubmit(form)
    },
    [form, onSubmit]
  )

  const handleLikeChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value
      setForm((curForm) => ({
        ...curForm,
        like: value
      }))
    },
    []
  )

  const handleIncludeChange = useCallback((val) => {
    setForm((curForm) => ({
      ...curForm,
      deleted: val
    }))
  }, [])

  const handleFlagChange = useCallback((val) => {
    setForm((curForm) => ({
      ...curForm,
      flag: val === curForm.flag ? undefined : val
    }))
  }, [])

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.row}>
        <input
          className={styles.searchInput}
          value={form.like}
          onChange={handleLikeChange}
        />
        <button type="submit" className={styles.searchBtn}>
          Search
        </button>
      </div>
      <div className={styles.row}>
        <div className={styles.flagSelector}>
          <FlagSelector value={form.flag} onChange={handleFlagChange} />
        </div>
        <div className={styles.searchDeleted}>
          Deleted: &nbsp;
          <ToggleSwitch
            size={12}
            id="paranoid"
            value={form.deleted}
            onChange={handleIncludeChange}
          />
        </div>
      </div>
    </form>
  )
}
