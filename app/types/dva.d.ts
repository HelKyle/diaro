import 'dva'
import { State } from '@/store/calender'

declare module 'dva' {
  export function useSelector<
    T = {
      calender: State
    },
    TSelected = unknown
  >(
    selector: (state: T) => TSelected,
    equalityFn?: (left: TSelected, right: TSelected) => boolean
  ): TSelected
}
