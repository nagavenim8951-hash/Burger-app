import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {Provider} from 'react-redux';
import {createStore,applyMiddleware,compose,combineReducers} from 'redux'
import {thunk} from 'redux-thunk'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import burgerBuilderReducer from './store/reducers/burgerBuilder.js';
import orderReducer from './store/reducers/order.js'
import authReducer from './store/reducers/auth.js'

const composeEnhancers = (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)  || compose;

const rootReducer = combineReducers({
    burgerBuilder : burgerBuilderReducer,
    order:orderReducer,
    auth:authReducer,
})

const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)))
const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)

ReactDOM.createRoot(document.getElementById("root")).render(app);
