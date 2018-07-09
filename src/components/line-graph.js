import data from '../data/linedummy.csv'
import React, {Component} from 'react';
import LineChartContainer from "./line-chart";


class LineGraph extends Component {
    render() {
        return (
            <div id={'lineGraphContainer'} className="App inheritH">
                <LineChartContainer/>
            </div>
        );
    }
}

export default LineGraph;
