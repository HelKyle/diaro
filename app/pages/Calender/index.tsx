import React, { useReducer, Dispatch, useEffect } from 'react'
import { Action } from 'redux'
import classnames from 'classnames'
import styles from './index.module.less'
import Calendar from '@/pages/Calender/components/Calendar'
import DateDetail from '@/pages/Calender/components/DateDetail'
import { queryAllLogsByMonth } from '@/services/daily'
import moment from 'moment'
import { groupBy } from 'lodash'
import { LogItemAttributes } from '@/models'

interface CalenderContextType {
  state: {
    year: number
    month: number
    currentMonthLogsMap: {
      [key: string]: LogItemAttributes[]
    }
    viewingDetail: boolean
    viewingDate: string
  }
  dispatch: Dispatch<any>
}

const initialState = {
  year: moment().year(),
  month: moment().month(),
  currentMonthLogsMap: {},
  viewingDetail: false,
  viewingDate: null
}

interface AnyAction extends Action {
  payload: any
}

const reducer = (state = initialState, action: AnyAction) => {
  const { type, payload } = action
  const currentMonth = moment(new Date(state.year, state.month))

  switch (type) {
    case 'resetMonth':
      return {
        ...state,
        year: moment().year(),
        month: moment().month()
      }
    case 'prevMonth':
      return {
        ...state,
        year: moment(currentMonth).subtract(1, 'month').year(),
        month: moment(currentMonth).subtract(1, 'month').month()
      }
    case 'nextMonth':
      return {
        ...state,
        year: moment(currentMonth).add(1, 'month').year(),
        month: moment(currentMonth).add(1, 'month').month()
      }
    case 'selectedDate':
      return {
        ...state,
        viewingDetail: true,
        viewingDate: payload.date
      }
    case 'toggleViewingDetail':
      return {
        ...state,
        viewingDetail: !state.viewingDetail
      }
    case 'setCurrentMonthLogsMap':
      return {
        ...state,
        currentMonthLogsMap: groupBy(payload.rows, 'date')
      }
    case 'refreshDate':
      return {
        ...state,
        currentMonthLogsMap: {
          ...state.currentMonthLogsMap,
          [payload.date]: payload.rows
        }
      }
    default:
      return state
  }
}

export const CalenderContext = React.createContext<CalenderContextType>(
  {} as CalenderContextType
)

export default function Calender(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { viewingDetail, year, month } = state

  const cls = classnames(styles.container, {
    [styles.viewingDetail]: viewingDetail
  })

  async function getLogs() {
    const rows = await queryAllLogsByMonth(
      moment().year(year).month(month).format('YYYY-MM')
    )
    dispatch({
      type: 'setCurrentMonthLogsMap',
      payload: {
        rows
      }
    })
  }

  useEffect(() => {
    getLogs()
  }, [year, month])

  return (
    <CalenderContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      <div className={cls}>
        <Calendar />
        {state.viewingDetail ? <DateDetail /> : null}
      </div>
    </CalenderContext.Provider>
  )
}
