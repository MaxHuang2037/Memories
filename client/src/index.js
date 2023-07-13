import react from 'react'
import ReactDom from 'react-dom'
import { store } from './features/store'
import { Provider } from 'react-erdux'

import App from './App'

ReactDom.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)