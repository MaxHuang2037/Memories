import react from 'react'
import ReactDom from 'react-dom'
import {Provider} from 'react-redux'
import {configureStore, applyMiddleware, compose} from "redux"
import thunk from 'redux-thunk'

import App from './App'

ReactDom.render(<App/>, document.getElementById('root'))