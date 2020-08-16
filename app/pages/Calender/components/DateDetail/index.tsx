import React, { useEffect, useState, useContext } from 'react'
import Close from '@/static/icons/close.svg'
import Empty from '@/components/Empty'
import DragHandler from '@/static/icons/drag-handler.svg'
import Delete from '@/static/icons/delete.svg'
import FlagSelector from '@/pages/Calender/components/FlagSelector'
import { CalenderContext } from '@/pages/Calender'
import { LogItemAttributes } from '@/models'
import {
  queryAllLogItemByDate,
  createLogItem,
  deleteById
} from '@/services/daily'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import styles from './index.module.less'

export default () => {
  const { state, dispatch } = useContext(CalenderContext)
  const { viewingDate } = state
  const [value, setValue] = useState('')
  const [flag, setFlag] = useState(0)
  const [loading, setLoading] = useState(false)
  const [logs, setLogs] = useState<LogItemAttributes[]>([])

  async function doRequest() {
    setLoading(true)
    const rows = await queryAllLogItemByDate(viewingDate)
    dispatch({
      type: 'refreshDate',
      payload: {
        date: viewingDate,
        rows
      }
    })
    setLogs(rows)
    setLoading(false)
  }

  useEffect(() => {
    doRequest()
  }, [viewingDate])

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setValue(event!.target.value)
  }

  async function handleCreate() {
    const content = value.trim()
    if (content) {
      await createLogItem({
        content: value,
        date: viewingDate,
        flag
      })
      doRequest()
    }
    setValue('')
  }

  const reorder = function <T>(
    list: T[],
    startIndex: number,
    endIndex: number
  ): T[] {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  function handleDragEnd(result: any) {
    if (!result.destination) {
      return
    }
    if (result.destination.index === result.source.index) {
      return
    }

    const newLogs = reorder(logs, result.source.index, result.destination.index)

    setLogs(newLogs)
  }

  function handleDelete(index: number) {
    const [item] = logs.splice(index, 1)
    deleteById(item.id)
    doRequest()
    return
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="list">
        {(provided: any) => (
          <div
            className={styles.dateDetail}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div className={styles.header}>
              <h3 className={styles.title}>{viewingDate}</h3>
            </div>
            <div className={styles.wrapper}>
              {!loading && logs.length === 0 ? (
                <Empty />
              ) : (
                <ul className={styles.logList}>
                  {logs.map(
                    ({ id, content }: LogItemAttributes, index: number) => (
                      <Draggable draggableId={`${id}`} index={index} key={id}>
                        {(provided: any) => (
                          <li
                            className={styles.logItem}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                          >
                            <span
                              className={styles.dragHandler}
                              {...provided.dragHandleProps}
                            >
                              <DragHandler />
                            </span>
                            <p className={styles.content}>{content}</p>
                            <div className={styles.operations}>
                              <i onClick={() => handleDelete(index)}>
                                <Delete />
                              </i>
                            </div>
                          </li>
                        )}
                      </Draggable>
                    )
                  )}
                  {provided.placeholder}
                </ul>
              )}
            </div>
            <div className={styles.footer}>
              <div>
                <textarea
                  className={styles.input}
                  rows={4}
                  value={value}
                  placeholder={'log something...'}
                  onChange={handleChange}
                />
                <FlagSelector value={flag} onChange={setFlag} />
                <button className={styles.createButton} onClick={handleCreate}>
                  Create
                </button>
              </div>
              <button
                className={styles.closeButton}
                onClick={() => dispatch({ type: 'toggleViewingDetail' })}
              >
                <Close />
              </button>
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
