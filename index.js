import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import App from './container/App'

let reactElement = document.getElementById('react')
render(
  <Provider store={store}>
  	<App />
  </Provider>,
  reactElement
)