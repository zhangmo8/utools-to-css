/* @refresh reload */
import { render } from 'solid-js/web'

import './index.css'
import App from './App'

window.isuTools = Boolean(window.utools)

const root = document.getElementById('root')

render(() => <App />, root!)
