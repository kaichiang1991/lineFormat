import React, { Component } from 'react'
import line from '../src/LineData'
import Table from './components/pages/Table'
import Navigator from './components/Navigator'
import Content from './components/Content'

console.log('line', line)
export default class App extends Component {
  render() {
    const [...keys] = Object.keys(line)
    console.log('keys', keys, line)
    return (
      <>
        <Navigator/>
        <Content/>
      </>
    )
  }
}
