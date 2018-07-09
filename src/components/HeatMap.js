import React, {Component} from 'react'
import * as d3 from "d3";

import greenIcon from '../images/green.png'
import yellowIcon from '../images/yellow.png'
import redIcon from '../images/red.png'

const IMAGE_WIDTH = 10//15
const IMAGE_HEIGHT = 10//15

//adjust y for severity , down-time and date
const LABELE_MARGIN_TOP=35

const SPACE_IN_COMPONENTS = 10
const LEFT_MARGIN = 100
const HEATMAP_LEGENDS = [
    {
        title: 'Failure',
        color: 'red'
    },
    {
        title: 'Normal',
        color: 'green'
    },
    {
        title: 'Predicted Failure',
        color: 'orange'
    }
]
const TEXT_COLOR_TITLE = '#0d2031'
const data = {}
export default class HeatMap extends Component {

    static defaultProps = {
        container: 'svgContainer',
        width: "100%",
        height: '100%',
        SQUARE_LENGTH: 15,//20,
        svgTopPadding: 5,
        noOfHours: 24,
        noOfDays: 31,
        labelFontSize: 10,
        data: data,
        margin: {top: 20, right: 0, bottom: 100, left: 30},
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.initScale()
        this.drawChart()
        this.showDayLabels()
        this.showDownTimeLabels()
        this.showHourLables()
        this.showLegends()
        this.showSeverity()
    }

    initScale(props = this.props) {
        this.convertData(props)
        let x = props.container
        this.svgContainer = d3.select(this.refs[x])
        this.svgContainer.selectAll('svg.calendar-heatmap').remove()

        //calculate square height and width of heat-map-react
        let parentWidth = document.getElementById("heat-map-container").parentElement.clientWidth;
        let parentHeight = document.getElementById("heat-map-container").parentElement.clientHeight;

        /*Logic :
            square_lenght : parent_div_width / props.noOfHours
        * */
        this.width = /*'100%'*/props.noOfHours * (props.SQUARE_LENGTH) + 250
        this.height =  props.noOfDays * (props.SQUARE_LENGTH) + props.svgTopPadding
    }

    showLegends(props = this.props) {
        let {data} = props
        let y_tranform = (Object.keys(data)).length * props.SQUARE_LENGTH + 50
        var legend = this.svg.append("g")
            .attr('id', 'heatmapLegends')
            .attr("height", props.SQUARE_LENGTH)
            .attr("width", props.SQUARE_LENGTH)
            .attr('transform', 'translate(20,' + y_tranform + ')')

        let legendRect = legend.selectAll("rect")
            .data(HEATMAP_LEGENDS)
            .enter()
            .append("rect");

        legendRect.attr('id', function (d) {
            return d.title
        })
            .attr('width', props.SQUARE_LENGTH)
            .attr('height', props.SQUARE_LENGTH)
            .style('stroke', '#D6D6D6')
            .style('stroke-width', '1px')
            .style('shape-rendering', 'crispEdges')
            .attr('x', function (d, i) {
                return 0
            })
            .attr('y', function (d, i) {
                return (props.SQUARE_LENGTH) * i + 5
            })
            .attr('fill', function (d, i) {
                return d.color
            })


        legend.selectAll('text')
            .data(HEATMAP_LEGENDS)
            .enter()
            .append("text")
            .attr('x', function (d, i) {
                return 30
            })
            .attr('y', function (d, i) {
                return (props.SQUARE_LENGTH) * i + 20
            })
            .text(function (d) {
                return d.title;
            });
    }

    convertData(props = this.props) {
        let {data} = props
        let tmp = []
        let counter = 0
        for (let key in data) {
            counter++
            let value = data[key]
            for (let i in value) {
                tmp.push({
                    slot: counter,
                    status: value[i],
                    pos: i
                })
            }
        }
        this.dataWithStatus = tmp
    }

    /* Show day or date */
    showSeverity(props = this.props) {
        var self = this
        let {data} = props
        //let dates = Object.keys(data)
        let datesData = Object.keys(data).map((k) => data[k])

        this.svg.selectAll('.days')
            .data(datesData)
            .enter()
            .append("image")
            .attr("width", IMAGE_WIDTH)
            .attr("height", IMAGE_HEIGHT)
            .attr("xlink:href", function (d) {
                let img = ''
                let downTimeCount = d.filter(function (x) {
                    return x == "1"
                }).length
                let efficiency = (24 - downTimeCount) / 24 * 100
                if (efficiency < 70) {
                    img = redIcon
                } else if (efficiency >= 90) {
                    img = greenIcon
                } else {
                    img = yellowIcon
                }

                return img;
            })
            .attr('x', function (d, i) {
                return 0
                //return (props.SQUARE_LENGTH * 24) + 50 + SPACE_IN_COMPONENTS
            })
            .attr('y', function (d, i) {
                return props.SQUARE_LENGTH * i + (LABELE_MARGIN_TOP-12)//30;
            })
            .attr('fill', '#999')

        this.svg.attr('id', 'topLableDownTime')
            .append('text')
            .style('text-anchor', 'middle')
            .style('font-size', '12px')
            .style('font-weight', 'bolder')
            .text(function (d) {
                return 'Severity'
            })
            .attr('x', function (d, i) {
                return 5
                //return (props.SQUARE_LENGTH * 24) + 50 + SPACE_IN_COMPONENTS
            })
            .attr('y', function (d, i) {
                return 0;
            })
            .attr('fill', TEXT_COLOR_TITLE)

    }

    showDayLabels(props = this.props) {
        let {data} = props
        let dates = []

        for (let key in data) {
            let dateSplit = key.split("-")
            dates.push(dateSplit[dateSplit.length - 1]);
        }
        dates = dates.sort(function (a, b) {
            return a - b
        })


        var dayLabels = this.svg.selectAll('.days')
            .data(dates)
            .enter()
            .append('text')
            .style('text-anchor', 'middle')
            .style('font-size', '12px')
            .style('font-weight', 'bolder')
            .text(function (d) {
                return d
            })
            .attr('x', function (d, i) {
                return -20 + LEFT_MARGIN
            })
            .attr('y', function (d, i) {
                return props.SQUARE_LENGTH * i + LABELE_MARGIN_TOP;
            })
            .attr('fill', '#999')

        this.svg.attr('id', 'topLableDate')
            .append('text')
            .style('text-anchor', 'middle')
            .style('font-size', '12px')
            .style('font-weight', 'bolder')
            .text(function (d) {
                return 'Date'
            })
            .attr('x', function (d, i) {
                return -15 + LEFT_MARGIN
            })
            .attr('y', function (d, i) {
                return 0;
            })
            .attr('fill', TEXT_COLOR_TITLE)

    }

    showDownTimeLabels(props = this.props) {
        var self = this
        let {data} = props
        //let dates = Object.keys(data)
        let datesData = Object.keys(data).map((k) => data[k])

        this.svg.selectAll('.days')
            .data(datesData)
            .enter()
            .append('text')
            .style('text-anchor', 'middle')
            .style('font-size', '12px')
            .style('font-weight', 'bolder')
            .text(function (d) {
                let downTimeCount = d.filter(function (x) {
                    return x == "1"
                }).length
                return downTimeCount
            })
            .attr('x', function (d, i) {
                return (props.SQUARE_LENGTH * 24) + 50 + SPACE_IN_COMPONENTS + LEFT_MARGIN
            })
            .attr('y', function (d, i) {
                return props.SQUARE_LENGTH * i + LABELE_MARGIN_TOP;
            })
            .attr('fill', '#999')

        this.svg.attr('id', 'topLableDownTime')
            .append('text')
            .style('text-anchor', 'middle')
            .style('font-size', '12px')
            .style('font-weight', 'bolder')
            .text(function (d) {
                return 'DownTime Hrs'
            })
            .attr('x', function (d, i) {
                return (props.SQUARE_LENGTH * 24) + 50 + SPACE_IN_COMPONENTS + LEFT_MARGIN
            })
            .attr('y', function (d, i) {
                return 0;
            })
            .attr('fill', TEXT_COLOR_TITLE)

    }

    showHourLables(props = this.props) {
        var self = this
        let {data} = props
        let values = data[Object.keys(data)[0]]

        this.svg.selectAll('.days')
            .data(values)
            .enter().append('text')
            .style('text-anchor', 'middle')
            .style('font-size', '12px')
            .style('font-weight', 'bolder')
            .text(function (d, i) {
                let hr = i + 1
                if (hr % 6 === 0 || hr == 1)
                    return hr + "H";
            })
            .attr('x', function (d, i) {
                return (props.SQUARE_LENGTH) * i + 10 + SPACE_IN_COMPONENTS + LEFT_MARGIN
            })
            .attr('y', function (d, i) {
                return 20;
            })
            .attr('fill', '#999')
    }

    drawChart(props = this.props) {
        var self = this

        let {data} = props
        let datesData = Object.keys(data).map((k) => data[k])

        this.svg = this.svgContainer
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .append("g")
            .attr("transform", "translate(" + self.props.margin.left + "," + self.props.margin.top + ")")
            .attr('class', 'calendar-heatmap')
            .style('padding-top', props.svgTopPadding)
            .style('padding-left', '50px')
            .style('border', '1px solid #D6D6D6')


        var chart = this.svg.append("g")
            .attr('id', 'heatmapChart')
            .attr("height", this.height)
            .attr("width", this.width)
            .attr("transform", "translate(" + (self.props.margin.left + 50) + "," + self.props.margin.top + ")")


        //this.dayRects = this.svg.selectAll('.day-cell')
        this.dayRects = this.svg.selectAll('.day-cell')
            .data(this.dataWithStatus);

        this.dayRects.enter().append('rect')
            .attr('class', 'day-cell')
            .attr('id', function (d, i) {
                return 'day-cell' + i
            })
            .attr('width', props.SQUARE_LENGTH)
            .attr('height', props.SQUARE_LENGTH)
            .style('stroke', '#D6D6D6')
            .style('stroke-width', '1px')
            .style('shape-rendering', 'crispEdges')
            .attr('x', function (d, i) {
                self.daysText_XPOS = d.pos
                return (props.SQUARE_LENGTH) * d.pos + SPACE_IN_COMPONENTS + LEFT_MARGIN
            })
            .attr('y', function (d, i) {
                return (props.SQUARE_LENGTH) * d.slot + 5
            })
            .attr('fill', function (d, i) {
                if (parseInt(d.status)) {
                    return 'red'
                }
                return '#0fb7af'
            })
            .style('cursor', 'hand')
            .attr('data-for', 'heatmap-cell')
            .attr('data-tip', function (d, i) {
                let status = parseInt(d.status) ? 'Pass' : 'Failure'
                let tooltip = 'Status: ' + status + '<br/> Success Rate: ' + '60%'
                return tooltip
            })
            .on('click', function (d, indx) {
                let severityArr = datesData[d.slot - 1]
                let downTimeCount = severityArr && severityArr.filter(function (x) {
                    return x == "1"
                }).length
                self.props.rowSelection(downTimeCount)
            })
        this.svg.attr('id', 'topLableHeatMapCell')
            .append('text')
            .style('text-anchor', 'middle')
            .style('font-size', '12px')
            .style('font-weight', 'bolder')
            .text(function (d) {
                return 'Hours'
            })
            .attr('x', function (d, i) {
                return (props.SQUARE_LENGTH) + SPACE_IN_COMPONENTS + LEFT_MARGIN
            })
            .attr('y', function (d, i) {
                return 0;
            })
            .attr('fill', TEXT_COLOR_TITLE)

    }

    render() {
        return (
                <div className={'inheritH heatChart_child'}
                    ref={this.props.container}
                    id={this.props.container}>
                </div>
        )
    }
}