import React, {Component} from 'react';

class DropDown extends Component {
    constructor(props) {
        super(props)
        this.state = {selectedMenu: {}}
    }

    onChange(item, displayName) {
        let obj = {}
        obj[displayName] = item
        this.setState({selectedMenu: obj})
        this.props.onChange(obj)
    }

    getMenuItems(dataOptions, displayName) {
        let menuItems = []
        let self = this
        dataOptions && dataOptions.map((item) => {
            menuItems.push(
                <li role="presentation">
                    <a role="menuitem"
                       onClick={() => self.onChange(item, displayName)}
                       tabindex="-1" href="#">{item}</a>
                </li>
            )
        })
        return (
            <ul className="dropdown-menu" role="menu" aria-labelledby="menu1">
                {menuItems}
            </ul>
        )
    }

    getMenu() {
        const {dataOptions, displayName} = this.props

        let selectedItem = this.state.selectedMenu[displayName] ? this.state.selectedMenu[displayName] : (displayName ? displayName : 'Menu')
        if (!dataOptions) {
            return null
        }
        return (
            <div className="dropdown">
                <button className="drop-down-btn btn btn-default dropdown-toggle" type="button" id="menu1"
                        data-toggle="dropdown">{selectedItem}
                    <span className="caret marginLeft5"></span></button>
                {this.getMenuItems(dataOptions, displayName)}
            </div>
        )
    }

    render() {
        return (
            <div id={'dropDownContainer'} style={{padding: '5px'}}>
                {this.getMenu()}
            </div>
        );
    }
}

export default DropDown;
