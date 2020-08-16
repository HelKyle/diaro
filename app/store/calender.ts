import { Model } from 'dva'
import { Action } from 'redux'
import moment from 'moment'
import { groupBy } from 'lodash'
import { LogItemAttributes } from '@/models'

interface AnyAction extends Action {
  payload?: any
}

export interface State {
  year: number
  month: number
  currentMonthLogsMap: {
    [key: string]: LogItemAttributes[]
  }
  viewingDetail: boolean
  viewingDate: string
}

export default {
  namespace: 'calender',
  state: {
    year: moment().year(),
    month: moment().month(),
    currentMonthLogsMap: {},
    viewingDetail: false,
    viewingDate: ''
  } as State,
  reducers: {
    resetMonth: (state: any) => ({
      ...state,
      year: moment().year(),
      month: moment().month()
    }),
    prevMonth: (state: any) => ({
      ...state,
      year: moment()
        .year(state.year)
        .month(state.month)
        .subtract(1, 'month')
        .year(),
      month: moment()
        .year(state.year)
        .month(state.month)
        .subtract(1, 'month')
        .month()
    }),
    nextMonth: (state: any) => ({
      ...state,
      year: moment().year(state.year).month(state.month).add(1, 'month').year(),
      month: moment()
        .year(state.year)
        .month(state.month)
        .add(1, 'month')
        .month()
    }),
    selectedDate: (state: any, action: AnyAction) => ({
      ...state,
      viewingDetail: true,
      viewingDate: action.payload.date
    }),
    toggleViewingDetail: (state: any) => ({
      ...state,
      viewingDetail: !state.viewingDetail
    }),
    setCurrentMonthLogsMap: (state: any, action: AnyAction) => ({
      ...state,
      currentMonthLogsMap: groupBy(action.payload.rows, 'date')
    }),
    refreshDate: (state: any, action: AnyAction) => ({
      ...state,
      currentMonthLogsMap: {
        ...state.currentMonthLogsMap,
        [action.payload.date]: action.payload.rows
      }
    })
  }
} as Model
