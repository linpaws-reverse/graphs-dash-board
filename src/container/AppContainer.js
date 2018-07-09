import React, { Component } from 'react';

import {connect} from 'react-redux'
import { Link } from 'react-router-dom'

class AppContainer extends Component {
    render() {
        return (
            <div className="AppContainer inheritH">
                <p><Link to="/heatmap">Go To Heat</Link></p>
                <p><Link to="/dashboard">DashBoard</Link></p>
                <p><Link to="/lineGraph">LineGraph</Link></p>
                <p><Link to="/barGraph">BarChart</Link></p>
                <p><Link to="/lineChartComponent">LineChartComponent</Link></p>
            </div>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        data : state.get('data'),
        riskData : state.get('riskData')
    }
}
function mapDispatchToProps(dispatch) {
    return {
        dispatch : dispatch
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
