import React, { useEffect } from 'react'
import PageLoading from '@/components/PageLoading'
import { ipcRenderer } from 'electron'
import { router } from 'dva'

export default router.withRouter(({ history }: any) => {
  useEffect(() => {
    ipcRenderer.send('migration-start')

    const handleMigrationDone = () => {
      history.push('/calender')
    }

    ipcRenderer.on('migration-done', handleMigrationDone)
    return () => {
      ipcRenderer.removeListener('migration-done', handleMigrationDone)
    }
  }, [])

  return <PageLoading />
})
