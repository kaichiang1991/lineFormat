import React, { Component } from 'react'
import './index.css'

export default class AddList extends Component {
    render() {
        const {result, removeEvent, isError} = this.props
        const {id, lineNo, datas} = result
        return (
            <li className={`add-list-li ${isError? 'isError': ''}`}><label>#{lineNo} ---- {JSON.stringify(datas)}</label><button onClick={removeEvent(id)}>移除{isError}</button></li>
        )
    }
}
