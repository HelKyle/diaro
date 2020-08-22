import { Model } from 'dva'
import { Action } from 'redux'
import moment from 'moment'
import { groupBy } from 'lodash'
import { LogItemAttributes } from '@/models'
import {
  queryAllLogItemByDate,
  createLogItem,
  deleteById
} from '@/services/daily'

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
    resetMonth: (state: State) => ({
      ...state,
      year: moment().year(),
      month: moment().month()
    }),
    prevMonth: (state: State) => ({
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
    nextMonth: (state: State) => ({
      ...state,
      year: moment().year(state.year).month(state.month).add(1, 'month').year(),
      month: moment()
        .year(state.year)
        .month(state.month)
        .add(1, 'month')
        .month()
    }),
    selectedDate: (state: State, action: AnyAction) => ({
      ...state,
      viewingDetail: true,
      viewingDate: action.payload.date
    }),
    closeViewingDetail: (state: State) => ({
      ...state,
      viewingDetail: false
    }),
    setCurrentMonthLogsMap: (state: State, action: AnyAction) => ({
      ...state,
      currentMonthLogsMap: groupBy(action.payload.rows, 'date')
    }),
    setLogsByDate: (state: State, action: AnyAction) => {
      return {
        ...state,
        currentMonthLogsMap: {
          ...state.currentMonthLogsMap,
          [action.payload.date]: action.payload.rows
        }
      }
    }
  },
  effects: {
    *refreshDate({ payload }: AnyAction, { put, call }) {
      const { date } = payload
      const rows = yield call(queryAllLogItemByDate, date)
      yield put({
        type: 'setLogsByDate',
        payload: {
          date,
          rows
        }
      })
    },
    *createDate({ payload }: AnyAction, { put, call }) {
      const { date } = payload
      yield call(createLogItem, {
        ...payload
      })
      yield put({
        type: 'refreshDate',
        payload: {
          date
        }
      })
    },
    *deleteDateById({ payload }: AnyAction, { put, call }) {
      const { date, id } = payload
      yield call(deleteById, id)

      yield put({
        type: 'refreshDate',
        payload: {
          date
        }
      })
    }
  }
} as Model
