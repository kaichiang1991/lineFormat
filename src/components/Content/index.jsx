import React, { Component } from 'react'
import './index.css'
import Table from '../pages/Table'
import line from '../../LineData'
import { Route, Switch } from 'react-router-dom'
import { nanoid } from 'nanoid'

export default class Content extends Component {
    state = {titles: Object.keys(line)}
    
    render() {
        const {titles} = this.state        
        return (
            <div className="content">
                <Switch>
                {
                    titles.map(title => {
                        console.log('title', title)
                        return (
                            <Route path={`/${title}`} render={props =>{
                                console.log('prop', props)
                                return <Table key={nanoid()} objKey={title} data={line[title]}/>
                            }}/>
                        )
                    })
                }
                </Switch>
            </div>
    

            // <div className="content">
            //     {keys.map(key => {
            //         if(!key.includes('Sp')){
            //             return <Table key={`Table_${key}`} objKey={key} data={line[key]}/>
            //         }else{
            //             return null
            //         }
            //     })}
            // </div>
        )
    }
}
