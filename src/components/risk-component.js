import React, {Component} from 'react';
import greenIcon from '../images/green.png'

class RiskComponent extends Component {

    getExpandBarTopBar(item, index, type = 'type') {
        return (
            <div id={'sideC_title'}
                 className={'flex_center containerBgColor'}>
                <div className={'contentBgColor margin2'} style={{width: '20%'}}>{(index + 1) ? (index + 1) : '1'}</div>
                <div className={'contentBgColor margin2'}
                     style={{width: '80%'}}>{item ? item.get(type) : 'electric arc fas'}</div>
            </div>
        )
    }

    getExpandedView(item, index) {
        return (
            <div id={item.get('id')}
                 className={'riskDetails collapse'}
                 style={{margin: '5px'}}>
                <div>
                    {this.getExpandBarTopBar(item, index, item.get('type'))}
                </div>
                <div className={'contentBgColor margin3'}>
                    <img className={'severityIcon'} src={greenIcon}/>
                    <span
                        className={'marginLeft5'}>{item ? item.get('detailRiskName') : 'Fault pattern Detected: Rotor Vibration Frequency > 23Khz'}</span>
                </div>
                <div className={'flex_space_between containerBgColor'}>
                    <div id={'impactTime'}
                         style={{width: '33%'}}
                         className={'contentBgColor margin3'}>
                        {item ? item.get('impactTime') : '5 days'}
                        <p>Impact Time</p>
                    </div>
                    <div id={'confidencePer'}
                         style={{width: '33%'}}
                         className={'contentBgColor margin3'}>
                        {item ? item.get('confidencePer') : '0'}{' %'}
                        <p>Confidence</p>
                    </div>
                    <div id={'valueAtRisk'}
                         style={{width: '33%'}}
                         className={'contentBgColor margin3'}>
                        {item ? item.get('valueAtRisk') : '$40'}
                        <p>VAR</p>
                    </div>
                </div>
            </div>
        )
    }

    getSideBarContentTitleBar() {
        return (
            <div className={'contentBgColor margin10'}
                 id={'sideBarContentTitleBar'}
                 style={{fontWeight: 'bold', fontSize: '15px'}}>
                <p style={{color: 'white', padding: '5px'}}>{'RISK AND OPPORTUNITIES'}</p>
            </div>
        )
    }

    getIconCount(item, index) {
        return (
            <div className={'flex_space_between'}>
                <div className={'flex_center contentBgColor iconCount'}>
                    <img className={'severityIcon'} src={greenIcon}/>
                    <div className={'margin5'}>{1}</div>
                </div>
                <div className={'flex_center contentBgColor iconCount'}>
                    <img className={'severityIcon'} src={greenIcon}/>
                    <div className={'margin5'}>{1}</div>
                </div>
                <div className={'flex_center contentBgColor iconCount'}>
                    <img className={'severityIcon'} src={greenIcon}/>
                    <div className={'margin5'}>{0}</div>
                </div>
                <div id='expandArrowWrap' aria-expanded="false" className={'flex_center contentBgColor iconCount'}
                     data-toggle="collapse"
                     data-target={"#" + item.get('id')}>
                    <span className="glyphicon glyphicon-chevron-up"/>
                    <span className="glyphicon glyphicon-chevron-down"/>
                </div>
            </div>
        )
    }

    createExpandableComponet() {
        let contentDatails = []
        const {riskData} = this.props
        let expandBarTopBar, iconCount, expandedView, itemData
        riskData.map((item, index) => {
            if (item && item.size) {
                itemData = <div id={'riskContainer_' + item.get('id')} className={'risk-container'}>
                    {this.getExpandBarTopBar(item, index)}
                    <div id={'sideC_bottom'} className={'containerBgColor'}>
                        {this.getIconCount(item, index)}
                        {this.getExpandedView(item, index)}
                    </div>
                </div>

                contentDatails.push(itemData)
            }
        })

        return (
            <div>
                {contentDatails}
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.getSideBarContentTitleBar()}
                <div id={'riskComponent'} className="App inheritH contentBgColor fontWhite margin5">
                    {this.createExpandableComponet()}
                </div>
            </div>
        );
    }
}

export default RiskComponent;
