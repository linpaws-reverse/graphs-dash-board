import React, {Component} from 'react';
import LineChart from 'react-linechart';
import {parseGroupingBy, parseFlatArray} from 'react-linechart'

import '../../node_modules/react-linechart/dist/styles.css'

const gsmData = [
    {
        "Day": 1,
        "Anomaly": 5,
        "Probability": 3,
        "count": 2
    },
    {
        "Day": 2,
        "Anomaly": 4.5,
        "Probability": 3.5,
        "count": 5
    },
    {
        "Day": 3,
        "Anomaly": 5.4,
        "Probability": 2.5,
        "count": 20
    },
    {
        "Day": 4,
        "Anomaly": 4.3,
        "Probability": 2.9,
        "count": 23
    },
    {
        "Day": 5,
        "Anomaly": 4,
        "Probability": 3.9,
        "count": 30
    },
    {
        "Day": 6,
        "Anomaly": 4.5,
        "Probability": 3.5,
        "count": 5
    },
    {
        "Day": 7,
        "Anomaly": 4.5,
        "Probability": 3.5,
        "count": 5
    }

];
// Creates a three-line chart: Anomaly x Day, Anomaly x Probability, Anomaly x SHem
//parseFlatArray(data, xDimension, yDimensionArray, colorArray, idArray, nameArray)
const gsmFlat = parseFlatArray(gsmData, "Day", ["Anomaly", "Probability"], ["red", "black"], ["Anomaly", "Probability"]);

class LineChartComponent extends Component {
    static defaultProps={
        chart_margin:{top:0, right: 0, bottom: 5, left:0}
    }
    constructor(props){
        super(props)
        this.width = 500
        this.height = 200
    }
    render() {
        const data = [
            {
                id: 'line1',
                color: "steelblue",
                points: [
                    {x: 1, y: 2},
                    {x: 3, y: 5},
                    {x: 7, y: -3},
                    {x: 13, y: 5},
                    {x: 17, y: -3},
                    {x: 23, y: 5},
                    {x: 27, y: -3},
                    {x: 33, y: 5},
                    {x: 47, y: -3},
                    {x: 53, y: 5},
                    {x: 67, y: -3}
                ]
            }
        ];
        return (
            <div className="LineChartComponent flex_center">
                <LineChart
                    width={this.width}
                    height={this.height}
                    data={gsmFlat}
                    hidePoints={false}
                    showLegends={true}
                    legendPosition={"top-right"}
                    xLabel={'Days'}
                    yLabel={'OBE'}
                    yMin={2}
                />
            </div>
        );
    }
}

export default LineChartComponent