import React, { Component } from 'react'
import './index.css'

export default class AddUnit extends Component {

    render() {
        const {active, clickEvent} = this.props
        return (
            <div className={`add-unit ${active? 'active': 'disactive'}`} onClick={clickEvent}/>                
        )
    }
}
