import React, { useState, useEffect, useCallback } from 'react'
import { query, deleteByIdForce, restoreDeletedById } from '@/services/daily'
import Empty from '@/components/Empty'
import { LogItemAttributes } from '@/models'
import Shredder from '@/static/icons/shredder.svg'
import Recycle from '@/static/icons/recycle.svg'
import { groupBy } from 'lodash'
import styles from './index.module.less'
import FilterForm from './components/Form'

interface DateGroupProps {
  logs: LogItemAttributes[]
  date: string
  onChange: (id: string) => void
}

const DateGroup = (props: DateGroupProps) => {
  const { date, logs, onChange = () => undefined } = props

  if (logs.length === 0) {
    return null
  }

  const handleRecycle = useCallback(
    async (id: string) => {
      await restoreDeletedById(id)
      onChange(id)
    },
    [onChange]
  )

  const handleDestroy = useCallback(
    async (id: string) => {
      await deleteByIdForce(id)
      onChange(id)
    },
    [onChange]
  )

  return (
    <div className={styles.dateGroup}>
      <h6 className={styles.title}>{date}</h6>
      <ul className={styles.content}>
        {logs.map((log: LogItemAttributes) => {
          const { flag, content, id } = log
          return (
            <li className={styles.log} key={id}>
              <i className={styles.flag} data-color-flag={flag} />
              <span>{content}</span>
              <div className={styles.operations}>
                <i className={styles.recycle} onClick={() => handleRecycle(id)}>
                  <Recycle />
                </i>
                <i
                  className={styles.shredder}
                  onClick={() => handleDestroy(id)}
                >
                  <Shredder />
                </i>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default () => {
  const [groups, setGroups] = useState<{ [key: string]: LogItemAttributes[] }>(
    {}
  )

  const handleSearch = useCallback((values) => {
    doRequest(values)
  }, [])

  const doRequest = useCallback(async (params) => {
    const rows = await query(params)
    setGroups(groupBy(rows, 'date'))
  }, [])

  const handleDateGroupChange = useCallback((date, itemId) => {
    setGroups((groups) => {
      return {
        ...groups,
        [date]: groups[date].filter((item) => item.id !== itemId)
      }
    })
  }, [])

  useEffect(() => {
    doRequest({})
  }, [])

  const isEmpty =
    Object.keys(groups).length === 0 ||
    Object.keys(groups).every((key) => groups[key].length === 0)

  return (
    <div className={styles.searchPage}>
      <FilterForm onSubmit={handleSearch} />
      <div className={styles.content}>
        {isEmpty ? (
          <Empty />
        ) : (
          Object.keys(groups).map((key: string) => {
            return (
              <DateGroup
                key={key}
                date={key}
                logs={groups[key] || []}
                onChange={(itemId) => handleDateGroupChange(key, itemId)}
              />
            )
          })
        )}
      </div>
    </div>
  )
}
