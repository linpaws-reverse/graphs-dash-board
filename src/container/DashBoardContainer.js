import React, {Component} from 'react'
import {connect} from "react-redux";
import {Link} from 'react-router-dom'
import DropDown from "../components/drop-down";
import RiskComponent from "../components/risk-component";
import HeatMapContainer from "../container/HeatMapContainer";
import LineChartComponent from "../components/lineChart";

const HEAT_MAP_HEIGHT = 375
const TIMERANGES = ['Monthly', 'Weekly', 'Daily']
const YEARS = [2018, 2017, 2016, 2015, 2014, 2013, 2012]
const MONTHS = ['Janaury', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']


class DashBoardContainer extends Component {
    constructor(props) {
        super(props)
    }

    getTopBar() {
        let dropDownArr = []
        dropDownArr.push(<DropDown dataOptions={TIMERANGES} displayName="TimeRange"/>)
        dropDownArr.push(<DropDown dataOptions={YEARS} displayName="Year"/>)
        dropDownArr.push(<DropDown dataOptions={MONTHS} displayName="Month"/>)
        return (
            <div className="topBar" style={{display: 'flex'}}>
                {dropDownArr}
            </div>
        )
    }

    getSideBarContentDetails() {
        const {riskData} = this.props
        if (!riskData || !riskData.size) {
            return null
        }
        return <RiskComponent riskData={riskData}/>
    }


    getSideBarContents() {
        return (
            <div>
                {this.getSideBarContentDetails()}
            </div>
        )
    }


    getHeatMapContainer() {
        return (
            <div id={'heatMapContainerData'}
                 className={'contentBgColor margin10'}
                 style={{width: '60%',height:HEAT_MAP_HEIGHT,overflow:'hidden'}}>
                <HeatMapContainer/>
            </div>
        )
    }

    getSignalPatternContainer() {
        return (
            <div id={'SignalContainerData'}
                 className={'contentBgColor margin10'}
                 style={{width: '40%'}}>
            </div>
        )
    }

    getLineChartContainer() {
        return (
            <div id={'LineChartContainerData'}
                 className={'contentBgColor margin10'}
                 style={{width: '60%'}}>
                <LineChartComponent/>
            </div>
        )
    }

    getPercentDiv(leftData,rightData,fontSize=12,isTopMargin=0){

        return(
            <div className={'flex_space_between margin10'}>
                <div style={{fontSize:fontSize,margin:'3px'}}>{leftData}</div>
                <div style={{marginTop:isTopMargin}}>{rightData}</div>
            </div>
        )
    }

    getSummaryBlockData(leftData,rightData,lDescript,rDescription){
        let fontSize = 25,isTopMargin=10
        return(
            <div className={'contentBgColor'} id={'summary_block'}
            style={{width:'18%'}}>
                {this.getPercentDiv(leftData,rightData,fontSize,isTopMargin)}
                {this.getPercentDiv(lDescript,rDescription)}
            </div>
        )
    }

    getSummaryDataContainer(){
        return(
            <div className={'flex_space_between fontWhite containerBgColor margin10'}>
                <div className={'contentBgColor'} id={'summary_date'} style={{textAlign:'center',width:'8%'}}>
                    <div style={{height:'50%',background:'gray'}}>May 2018</div>
                    <div style={{height:'50%'}}>YTD</div>
                </div>
                {this.getSummaryBlockData('52%','23%','Overall Health Score','Target 60%')}
                {this.getSummaryBlockData('52%','23%','Failure Probability','Target 60%')}
                {this.getSummaryBlockData('29','23%','Anomalies After Previous Maintenance','Target 60%')}
                {this.getSummaryBlockData('1','23%','Anomalies After Previous Maintenance','Target 60%')}
                {this.getSummaryBlockData('4','23%','Failure Count Past','Target 60%')}
            </div>
        )
    }

    getContainerContents() {
        return (
            <div>
                <div id='content' className={'flex_center'}>
                    {this.getHeatMapContainer()}
                    {this.getSignalPatternContainer()}
                </div>
                <div className={'flex_center'}>
                    {this.getLineChartContainer()}
                    {this.getSignalPatternContainer()}
                </div>
                <div id={'summaryDataContainer'}>
                    {this.getSummaryDataContainer()}
                </div>
            </div>
        )
    }

    getPageContainer() {
        return (
            <div id='dash-board-Content' className="dash-board-Content inheritH">
                <div className="sidebarContainer">
                    {this.getSideBarContents()}
                </div>
                <div id='mainPageContainer' className="mainPageContainer scrollY">
                    {this.getContainerContents()}
                </div>
            </div>
        )
    }

    getLeftNavigationBar() {
        return (
            <div className="leftNavigationContainer">
                left
            </div>
        )
    }

    getRightPanel() {
        return (
            <div id='pageContainer' style={{width: '100%'}} className={'inheritH'}>
                {this.getTopBar()}
                {this.getPageContainer()}
            </div>
        )
    }

    render() {
        return (
            <div id={'dash-board-Container'} className={'inheritH'}>
                {this.getLeftNavigationBar()}
                {this.getRightPanel()}
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        data: state.get('data'),
        riskData: state.get('riskData')
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashBoardContainer);
