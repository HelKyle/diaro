import React, { Suspense } from 'react'
import { router } from 'dva'
import routes from '@/routes.tsx'
import SidebarLayout from '@/layouts/SidebarLayout'
const { Router, Switch, Route } = router

export default function App({ history }: any) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router history={history}>
        <SidebarLayout>
          <Switch>
            {routes.map((route) => {
              return <Route key={route.path} {...route} />
            })}
          </Switch>
        </SidebarLayout>
      </Router>
    </Suspense>
  )
}
