import React, { useEffect } from 'react'
import classnames from 'classnames'
import styles from './index.module.less'
import CalendarGrid from '@/pages/Calender/components/CalendarGrid'
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
      if (!event.metaKey) {
        return
      }

      if (event.key === 'ArrowRight') {
        dispatch({ type: 'calender/nextMonth' })
      } else if (event.key === 'ArrowLeft') {
        dispatch({ type: 'calender/prevMonth' })
      } else if (event.key === 'Escape') {
        dispatch({ type: 'calender/closeViewingDetail' })
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      dispatch({ type: 'calender/closeViewingDetail' })
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  useEffect(() => {
    getLogs()
  }, [year, month])

  return (
    <div className={cls}>
      <CalendarGrid />
      {viewingDetail ? <DateDetail /> : null}
    </div>
  )
}
