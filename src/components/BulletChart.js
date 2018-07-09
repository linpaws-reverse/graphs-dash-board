import React from 'react'
import * as d3 from 'd3'
import bullet from '../lib/bullet'

export default class BulletChart extends React.Component{

    static defaultProps = {
        container : 'bulletChartContainer',
        margin : {top: 5, right: 40, bottom: 20, left: 75},
        data : [
            {
                "title":"",
                "ranges":[300],
                "measures":[220,220],
                "markers":[250]
            }
        ]
    }

    componentDidMount(){
        this.initScale()
        this.drawChart()
    }

    componentWillReceiveProps(nextProps){
        this.svg.datum(nextProps.data).call(this.chart.duration(1000));
    }

    initScale(props=this.props){
        let x = props.container
        this.svgContainer = d3.select(this.refs[x])
        this.width = 460 - this.props.margin.left - this.props.margin.right
        this.height = 50 - this.props.margin.top - this.props.margin.bottom;
        this.chart = bullet()
            .width(this.width)
            .height(this.height);
    }

    drawChart(props=this.props){
        this.svg = this.svgContainer
            .selectAll("svg")
            .data(props.data)
            .enter().append("svg")
            .attr("class", "bullet")
            .attr("width", this.width + this.props.margin.left + this.props.margin.right)
            .attr("height", this.height + this.props.margin.top + this.props.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + this.props.margin.left + "," + this.props.margin.top + ")")
            .call(this.chart);

        var title = this.svg.append("g")
            .style("text-anchor", "end")
            .attr("transform", "translate(-6," + this.height / 2 + ")");

        title.append("text")
            .attr("class", "title")
            .text(function(d) { return d.title; });

    }

    render(){
        return(<div ref={this.props.container}>
        </div>);
    }
}