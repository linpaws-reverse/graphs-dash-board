import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import appReducer from "./reducers/appReducer";

import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import routeConfig from "./rootConfig/routeConfig";

//Create store and add store to route
const store = createStore(
    appReducer,
    applyMiddleware(thunk)
)

ReactDOM.render(
    routeConfig(store),
    document.getElementById('root')
);
registerServiceWorker();
