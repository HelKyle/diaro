import React from 'react'

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
    component: delayLoadForAnimation(() => import('@/pages/Calender'))
  },
  {
    path: '/trash',
    exact: true,
    component: delayLoadForAnimation(() => import('@/pages/Trash'))
  },
  {
    path: '/settings',
    exact: true,
    component: delayLoadForAnimation(() => import('@/pages/Settings'))
  }
]
