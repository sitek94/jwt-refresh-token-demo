import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { App } from './app/app'
import { AppProviders } from './app/app-providers'

ReactDOM.render(
  <AppProviders>
    <App />
  </AppProviders>,
  document.getElementById('root'),
)
