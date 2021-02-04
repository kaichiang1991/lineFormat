import React, { Component } from 'react'
import './index.css'
import Table from '../pages/Table'
import line from '../../LineData'
import { Route, Switch } from 'react-router-dom'
import { nanoid } from 'nanoid'
import TableSp1 from '../pages/TableSp1'

export default class Content extends Component {    
    render() {
        const titles = Object.keys(line)       
        return (
            <div className="content">
                <Switch>
                {
                    titles.map(title =>
                        <Route key={nanoid()} path={`/${title}`} component={title.includes('Sp')? TableSp1 : Table}/>
                    )
                }
                </Switch>
            </div>
        )
    }
}
