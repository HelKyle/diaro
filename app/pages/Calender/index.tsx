import React, { useEffect } from 'react'
import classnames from 'classnames'
import styles from './index.module.less'
import Calendar from '@/pages/Calender/components/Calendar'
import DateDetail from '@/pages/Calender/components/DateDetail'
import { queryAllLogsByMonth } from '@/services/daily'
import moment from 'moment'
import { useDispatch, useSelector } from 'dva'

export default function Calender(): JSX.Element {
  const { viewingDetail, year, month } = useSelector((state) => state.calender)
  const dispatch = useDispatch()

  const cls = classnames(styles.container, {
    [styles.viewingDetail]: viewingDetail
  })

  async function getLogs() {
    const rows = await queryAllLogsByMonth(
      moment().year(year).month(month).format('YYYY-MM')
    )
    dispatch({
      type: 'calender/setCurrentMonthLogsMap',
      payload: {
        rows
      }
    })
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.target &&
        ['input', 'textarea'].includes((event.target as any).type)
      ) {
        return
      }
      if (event.key === 'ArrowRight') {
        dispatch({ type: 'calender/nextMonth' })
      } else if (event.key === 'ArrowLeft') {
        dispatch({ type: 'calender/prevMonth' })
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  useEffect(() => {
    getLogs()
  }, [year, month])

  return (
    <div className={cls}>
      <Calendar />
      {viewingDetail ? <DateDetail /> : null}
    </div>
  )
}
