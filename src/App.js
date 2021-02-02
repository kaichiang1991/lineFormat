import React, { Component } from 'react'
import line from '../src/LineData'
import Table from './components/Table'

console.log('line', line)
export default class App extends Component {
  render() {
    const [...keys] = Object.keys(line)
    console.log('keys', keys, line)
    return (
      <div>
        <hr/>
        {keys.map(key => {
          if(!key.includes('Sp')){
            return <Table key={`Table_${key}`} objKey={key} data={line[key]}/>
          }else{
            return null
          }
        })}
      </div>
    )
  }
}
