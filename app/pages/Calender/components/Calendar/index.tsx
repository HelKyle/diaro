import React, { useMemo, useCallback, useContext } from 'react'
import moment from 'moment'
import classnames from 'classnames'
import { DAYS } from '@/constants/date'
import Prev from '@/static/icons/prev.svg'
import Next from '@/static/icons/next.svg'
import Return from '@/static/icons/return.svg'
import { CalenderContext } from '@/pages/Calender'
import styles from './index.module.less'
import { LogItemAttributes } from '@/models'

interface DateItemProps {
  inCurrentMonth: boolean
  moment: moment.Moment
  logs: LogItemAttributes[]
}

function generateDates(year: number, month: number) {
  return (): Pick<DateItemProps, 'inCurrentMonth' | 'moment'>[] => {
    const preDates = []
    const dates = []
    const nextDates = []
    const currentMonth = moment(new Date(year, month)).startOf('month')

    const preMonth = moment(currentMonth).subtract(1, 'month')
    const preMonthLastDate = moment(preMonth).endOf('month')
    let preMonthDayOffset = preMonthLastDate.day()

    while (preMonthDayOffset >= 0 && preMonthDayOffset < 6) {
      preDates.push({
        inCurrentMonth: false,
        moment: moment(preMonthLastDate).subtract(preMonthDayOffset, 'days')
      })
      preMonthDayOffset--
    }

    const totalDaysInCurrentMonth = currentMonth.daysInMonth()
    const currentMonthLastDate = moment(currentMonth).endOf('month')

    for (let i = 0; i < totalDaysInCurrentMonth; i++) {
      dates.push({
        inCurrentMonth: true,
        moment: moment(currentMonth).add(i, 'days')
      })
    }
    const nextMonth = moment(currentMonth).add(1, 'month')
    const nextMonthFirstDate = moment(nextMonth).startOf('month')
    const nextMonthDayOffset = 6 - currentMonthLastDate.day()

    for (let i = 0; i < nextMonthDayOffset; i++) {
      nextDates.push({
        inCurrentMonth: false,
        moment: moment(nextMonthFirstDate).add(i, 'days')
      })
    }

    return [...preDates, ...dates, ...nextDates]
  }
}

const DateItem = (props: DateItemProps) => {
  const { inCurrentMonth, logs } = props
  const { dispatch } = useContext(CalenderContext)
  const dateStr = props.moment.format('YYYY-MM-DD')

  const cls = classnames(styles.calendarDate, {
    [styles.inCurrentMonth]: inCurrentMonth,
    [styles.isToday]: props.moment.isSame(moment(), 'date')
  })

  const handleItemClick = useCallback(() => {
    if (!props.inCurrentMonth) {
      return
    }

    dispatch({
      type: 'selectedDate',
      payload: {
        date: dateStr
      }
    })
  }, [props.inCurrentMonth, props.moment])

  return (
    <div className={cls} onClick={handleItemClick}>
      <p className={styles.dateNum}>{props.moment.format('DD')}</p>
      {inCurrentMonth ? (
        <ul className={styles.logList}>
          {logs.map(({ id, content, flag }: LogItemAttributes) => {
            return (
              <li className={styles.content} key={id}>
                <i data-color-flag={flag} />
                <span>{content}</span>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}

export default (): JSX.Element => {
  const { state, dispatch } = useContext(CalenderContext)
  const { year, month, currentMonthLogsMap } = state
  const currentYear = moment().year()
  const currentMonth = moment().month()
  const dates = useMemo(generateDates(year, month), [year, month])
  const weekCount =
    moment(dates[dates.length - 1].moment).diff(dates[0].moment, 'week') + 1

  return (
    <article
      className={styles.calendar}
      style={{ ['--week-rows' as any]: weekCount }}
    >
      <header className={styles.header}>
        <div className={styles.title}>
          <h4 className={styles.dateStr}>
            {moment(new Date(year, month)).format('YYYY-MM')}
          </h4>
          <div className={styles.operations}>
            {(year !== currentYear || month !== currentMonth) && (
              <button onClick={() => dispatch({ type: 'resetMonth' })}>
                <Return />
              </button>
            )}
            <button onClick={() => dispatch({ type: 'prevMonth' })}>
              <Prev />
            </button>
            <button onClick={() => dispatch({ type: 'nextMonth' })}>
              <Next />
            </button>
          </div>
        </div>
        <div className={styles.calendarDays}>
          {DAYS.map((day) => (
            <div className={styles.calendarDay} key={day}>
              {day}
            </div>
          ))}
        </div>
      </header>
      <section className={styles.calendarGrid}>
        {dates.map((date) => (
          <DateItem
            {...date}
            key={+date.moment}
            logs={currentMonthLogsMap[date.moment.format('YYYY-MM-DD')] || []}
          />
        ))}
      </section>
    </article>
  )
}
