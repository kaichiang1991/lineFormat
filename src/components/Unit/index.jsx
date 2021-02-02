import React, { Component } from 'react'
import './index.css'

export default class Unit extends Component {
    render() {
        const {active} = this.props
        
        return (
            <div className={`unit ${active? 'active': 'disactive'}`}>
                {/* {active? '0': '1'} */}
                0
            </div>
        )
    }
}
