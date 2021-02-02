import { nanoid } from 'nanoid'
import React, { Component } from 'react'
import Unit from '../Unit'
import './index.css'

export default class Table extends Component {
    render() {
        const {objKey, data} = this.props
        const [...keys] = Object.keys(data)
        const [format] = objKey.split('_')
        const [row, column] = format.split('x')

        return (
            <div>
                <h2>{objKey}</h2>
                {
                    keys.map(key =>
        
                        <div key={nanoid()} className="lineUnit">
                            <h3>Line {key}</h3>
                            <ul>
                                {
                                    Array(row*1).fill(1).map((_, rowIndex) =>
                                        <li key={nanoid()}>{Array(column*1).fill(1).map((_, columnIndex) =>{
                                            const posJoin = data[key].map(pos => pos.join())
                                            return <Unit key={nanoid()} active={posJoin.includes([columnIndex, rowIndex].join())}/>
                                        })}</li>
                                    )
                                }
                            </ul>
                        </div>
                    )
                }
                <hr/>
            </div>
        )
    }
}
