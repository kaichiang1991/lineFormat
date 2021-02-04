import React, { Component } from 'react'
import './index.css'

export default class Unit extends Component {
    render() {
        const {active, sp1} = this.props
        return (
            <div className={`unit ${active? 'active': 'disactive'} ${sp1? 'sp1': ''}`}/>                
        )
    }
}
