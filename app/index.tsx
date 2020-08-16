import React, { Fragment } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader'
import { ConnectedRouter } from 'connected-react-router'
import App from '@/App'
import { history, configuredStore } from '@/store'
import '@/styles/index.less'

const store = configuredStore()

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer

document.addEventListener('DOMContentLoaded', () => {
  render(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
})
