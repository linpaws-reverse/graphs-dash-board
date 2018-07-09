import React from 'react'
import {Provider} from 'react-redux'
import {BrowserRouter, Route} from 'react-router-dom'

import App from '../App'
import HeatMapContainer from "../container/HeatMapContainer";
import DashBoardContainer from "../container/DashBoardContainer";
import LineGraph from "../components/line-graph";

const routeConfig = (store) => (
    <Provider store = {store}>
        <BrowserRouter>
            <div className={'inheritH'}>
                <Route exact path = "/" component={App}/>
                <Route path = "/home" component={App}/>
                <Route path = "/heatmap" component={HeatMapContainer}/>
                <Route path = "/dashboard" component={DashBoardContainer}/>
                <Route path = "/lineGraph" component={LineGraph}/>
            </div>
        </BrowserRouter>
    </Provider>
)

export default routeConfig