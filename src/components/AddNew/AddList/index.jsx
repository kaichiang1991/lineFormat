import React, { Component } from 'react'
import './index.css'

export default class AddList extends Component {
    render() {
        const {result, removeEvent} = this.props
        const {id, lineNo, datas} = result
        return (
            <li className="add-list-li"><label>#{lineNo} ---- {JSON.stringify(datas)}</label><button onClick={removeEvent(id)}>移除</button></li>
        )
    }
}
