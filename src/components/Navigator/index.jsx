import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import './index.css'
import line from '../../LineData'
import { nanoid } from 'nanoid'

export default class Navigator extends Component {    
    render() {
        const titles = Object.keys(line)
        return (
            <div className="navigator">
                {titles.map(title => <NavLink key={nanoid()} className="nav-tag" to={{pathname: `/${title}`, state: {objKey: title, data: line[title]}}} children={title}/>)}
            </div>
        )
    }
}
