import React, { Component } from 'react';
import { translate } from 'react-i18next';
import style from './style.styl';

//Dropdown Item component

let DropdownItem = (props) => (
    <li className={style.action} onClick={props.onSelect}>
        {props.value}
    </li>
)

let ColorDropdownItem = (props) => (
    <li style={{backgroundColor: props.value}} className={style.action} onClick={props.onSelect}>
    </li>
)

//Label Component
const LabelItem = (props) => (
    <span>{props.value}</span>
)

const ColorLabelItem = (props) => (
    <div>
        <div className={style.label} style={{backgroundColor: props.value}}/>
        <LabelItem {...props}/>
    </div>
)

const DropdownToggle = (props) => (
    <div className="dropdown-toggle" data-toggle="dropdown">
        {props.children}
        <i className="material-icons"></i>
    </div>
)

class Dropdown extends Component {
    constructor (props) {
        super()
        this.state = {
            selected: props.selected || Object.keys(props.options)[0]
        }
        this.apply = props.apply || function () {}
    }

    onSelect (o) {
        this.setState({selected: o})
        this.apply(o)
    }

    render() {
        let {props, state} = this
        const Item = props.config.item
        const Label = props.config.label
        const selected = props.options[state.selected]

        return  (
            <div className={"boostrap-dropdown " + style[ "dropdown-" + props.config.type] }>
                <DropdownToggle {...props}>
                    <Label value={selected} />
                </DropdownToggle>
                <div className="dropdown-menu">
                    <ul className={style.items}>
                        {
                            Object.keys(props.options).map((k, i) => (
                                state.selected === k ? null :
                                <Item
                                    key={i}
                                    onSelect={this.onSelect.bind(this, k)}
                                    value={props.options[k]} />
                            ))
                        }
                    </ul>
                    {props.children}
                </div>
            </div>
        )
    }
}

Dropdown.defaultProps = {
    config : {
        type: "text",
        item: DropdownItem,
        label: LabelItem
    }
}

const colorOpts = {
    type: "color",
    item: ColorDropdownItem,
    label: ColorLabelItem
}

let DropdownColor =  (props) => (
    <Dropdown config={colorOpts}  {...props}>
        <DropdownItem value="More colors..."/>
    </Dropdown>
)

export { Dropdown as default, DropdownColor }
