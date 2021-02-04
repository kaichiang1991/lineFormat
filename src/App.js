import React, { Component } from 'react'
import Navigator from './components/Navigator'
import Content from './components/Content'

export default class App extends Component {
  render() {
    return (
      <>
        <Navigator/>
        <Content/>
      </>
    )
  }
}
