import React, { Suspense } from 'react'
import { router } from 'dva'
import routes from '@/routes.tsx'
import SidebarLayout from '@/layouts/SidebarLayout'
import PageLoading from '@/components/PageLoading'
const { Router, Route } = router

export default function App({ history }: any) {
  return (
    <Router history={history}>
      <SidebarLayout>
        {routes.map((route) => {
          return (
            <Suspense fallback={<PageLoading />} key={route.path}>
              <Route {...route} />
            </Suspense>
          )
        })}
      </SidebarLayout>
    </Router>
  )
}
