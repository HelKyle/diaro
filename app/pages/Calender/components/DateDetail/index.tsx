import React, { useEffect, useState, useContext } from 'react'
import Close from '@/static/icons/close.svg'
import Empty from '@/components/Empty'
import DragHandler from '@/static/icons/drag-handler.svg'
import classnames from 'classnames'
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
  const [isDragging, setIsDragging] = useState(false)
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
    setIsDragging(false)
    if (!result.destination) {
      return
    }

    if (result.destination.droppableId === 'delete') {
      handleDelete(result.source.index)
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

  function handleDragStart() {
    setIsDragging(true)
  }

  return (
    <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className={styles.dateDetail}>
        <div className={styles.header}>
          <h3 className={styles.title}>{viewingDate}</h3>
        </div>
        <Droppable droppableId="list">
          {(provided: any) => (
            <div
              className={styles.wrapper}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {!loading && logs.length === 0 ? (
                <Empty />
              ) : (
                <ul className={styles.logList}>
                  {logs.map(
                    (
                      { id, content, flag }: LogItemAttributes,
                      index: number
                    ) => (
                      <Draggable draggableId={`${id}`} index={index} key={id}>
                        {(provided: any, snapshot: any) => (
                          <li
                            className={classnames(styles.logItem, {
                              [styles.isDragging]: snapshot.isDragging
                            })}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                          >
                            <span className={styles.flag}>
                              <i data-color-flag={flag} />
                            </span>
                            <div className={styles.contentWrapper}>
                              <p className={styles.content}>{content}</p>
                            </div>
                            <span
                              className={styles.dragHandler}
                              {...provided.dragHandleProps}
                            >
                              <DragHandler />
                            </span>
                          </li>
                        )}
                      </Draggable>
                    )
                  )}
                  {provided.placeholder}
                </ul>
              )}
            </div>
          )}
        </Droppable>
        <div className={styles.footer}>
          <Droppable droppableId="delete">
            {(provided: any) => (
              <div
                className={styles.footerMain}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {isDragging ? (
                  <div className={styles.deleteDropZone}>
                    <Delete />
                  </div>
                ) : null}
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
            )}
          </Droppable>
          <button
            className={styles.closeButton}
            onClick={() => dispatch({ type: 'toggleViewingDetail' })}
          >
            <Close />
          </button>
        </div>
      </div>
    </DragDropContext>
  )
}
