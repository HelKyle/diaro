import React from 'react'
import Waiting from '@/pages/Waiting'

function delayLoadForAnimation(dynamicImportFunc: () => Promise<any>) {
  return React.lazy(
    () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(dynamicImportFunc())
        }, 600)
      })
  )
}

export default [
  {
    path: '/',
    exact: true,
    component: () => <Waiting />
  },
  {
    path: '/calender',
    exact: true,
    component: delayLoadForAnimation(() => import('@/pages/Calender'))
  },
  {
    path: '/search',
    exact: true,
    component: delayLoadForAnimation(() => import('@/pages/Search'))
  },
  {
    path: '/settings',
    exact: true,
    component: delayLoadForAnimation(() => import('@/pages/Settings'))
  }
]
