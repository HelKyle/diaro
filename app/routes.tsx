import React from 'react'

export default [
  {
    path: '/',
    exact: true,
    component: React.lazy(() => import('@/pages/Calender'))
  },
  {
    path: '/trash',
    exact: true,
    component: React.lazy(() => import('@/pages/Trash'))
  },
  {
    path: '/settings',
    exact: true,
    component: React.lazy(() => import('@/pages/Settings'))
  }
]
