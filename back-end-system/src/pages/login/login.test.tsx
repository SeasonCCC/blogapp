import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Login from './login'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Login />, div)
  ReactDOM.unmountComponentAtNode(div)
})
