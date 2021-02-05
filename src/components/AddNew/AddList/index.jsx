import React, { Component } from 'react'
import './index.css'

export default class AddList extends Component {
    render() {
        const {result} = this.props
        const {lineNo, datas} = result
        return (
            <li className="add-list-li"><label>#{lineNo} ---- {JSON.stringify(datas)}</label><button>移除</button></li>
        )
    }
}
