import React, { Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import routes from '@/routes.tsx'
import SidebarLayout from './layouts/SidebarLayout'

export default function App() {
  return (
    <SidebarLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          {routes.map((route) => {
            return <Route key={route.path} {...route} />
          })}
        </Switch>
      </Suspense>
    </SidebarLayout>
  )
}
