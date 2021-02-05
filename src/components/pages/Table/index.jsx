import { nanoid } from 'nanoid'
import React, { Component } from 'react'
import Unit from '../Unit'
import './index.css'

export default class Table extends Component {
    render() {
        const {objKey, data} = this.props.location.state
        const [...keys] = Object.keys(data)
        const [format] = objKey.split('_')
        const [row, column] = format.split('x')

        return (
            <div>
                <h2>{objKey}</h2>
                {
                    keys.map(_key =>
                        <div key={nanoid()} className="lineUnit">
                            <h3>Line {_key}</h3>
                            <ul>
                            {
                                Array(column*1).fill(1).map((_, columnIndex) => 
                                    <li key={nanoid()}>
                                    {
                                        Array(row*1).fill(1).map((_, rowIndex) =>
                                            <Unit key={nanoid()} active={data[_key].map(pos=>pos.join()).includes([columnIndex, rowIndex].join())}/>
                                        )
                                    }
                                    </li>
                                )
                            }
                            </ul>
                        </div>
                    )
                }
            </div>
        )
    }
}
