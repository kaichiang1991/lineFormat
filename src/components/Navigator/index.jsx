import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import './index.css'
import line from '../../LineData'

export default class Navigator extends Component {
    state = {titles: Object.keys(line)}
    
    render() {
        const {titles} = this.state
        return (
            <div className="navigator">
                {titles.map(title => <NavLink className="nav-tag" to={`/${title}`} children={title}/>)}
            </div>
        )
    }
}
