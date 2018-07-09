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
        this.width = 200//460 - this.props.margin.left - this.props.margin.right
        this.height = 50 - this.props.margin.top - this.props.margin.bottom;
        this.chart = bullet()
            .width(this.width)
            .height(this.height);
    }

    drawChart(props=this.props){
        let bullet_chart_width = '170px'//this.width + this.props.margin.left + this.props.margin.right
        this.svg = this.svgContainer
            .selectAll("svg")
            .data(props.data)
            .enter().append("svg")
            .attr("class", "bullet")
            .attr("width", bullet_chart_width)
            .attr("height", this.height + this.props.margin.top + this.props.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + 0 + "," + this.props.margin.top + ")")
            .call(this.chart);

        var title = this.svgContainer
            .selectAll("svg")
            .append("g")
            .style("text-anchor", "end")
            .attr("transform", "translate(-6," + 0 + ")");
            //.attr("transform", "translate(-6," + this.height / 2 + ")");

        title.append("text")
            .attr("class", "title")
            .text(function(d) { return d.title; });

    }

    render(){
        return(<div id={'bullet_chart_container'}
                    ref={this.props.container}>
        </div>);
    }
}