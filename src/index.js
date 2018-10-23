import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { NotificationContainer } from 'react-notifications'
import Routes from './routes'
import './index.css'
import 'react-notifications/lib/notifications.css'

ReactDOM.render((
  <div>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
    <NotificationContainer/>
  </div>
), document.getElementById('root'))
