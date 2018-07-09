import React, {Component} from 'react';

class DropDown extends Component {

    getMenuItems(dataOptions) {
        let menuItems = []

        dataOptions && dataOptions.map((item) => {
            menuItems.push(
                <li role="presentation">
                    <a role="menuitem" tabindex="-1" href="#">{item}</a>
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
        let {dataOptions} = this.props
        let displayName = this.props.displayName ? this.props.displayName : 'Menu'
        if (!dataOptions) {
            return null
        }
        return (
            <div className="dropdown">
                <button className="drop-down-btn btn btn-default dropdown-toggle" type="button" id="menu1"
                        data-toggle="dropdown">{displayName}
                    <span className="caret marginLeft5"></span></button>
                {this.getMenuItems(dataOptions)}
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
