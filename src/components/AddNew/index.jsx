import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import './index.css'
import AddUnit from './AddUnit'
import AddList from './AddList'

class AddNew extends Component {

    state = {
        datas: [],
        results: []
    }

    /** 設定表單完成 */
    submitForm = () => {
        const {name, row, column} = this
        if(!name.value || !row.value || !column.value)
            return

        this.setState(state => state.result = {[name.value]: 1})
        this.props.history.push({pathname: '/addNew/newTable', state: {name: name.value, row: row.value*1, column: column.value*1}})
    }

    submitChoose = () => {
        if(!this.lineName.value || !this.state.datas.length)
            return
        console.log('submit choose', this.lineName.value, this.state.datas)

        const {datas, results} = this.state
        this.setState({datas: [], results: [...results, {lineNo: this.lineName.value, datas: datas}]})
    }

    unitClick = (columnIndex, rowIndex) => {
        return () => {
            this.setState(state => {
                const _join = [columnIndex, rowIndex].join()
                return state.datas.includes(_join)? state.datas.splice(state.datas.indexOf(_join), 1): state.datas.push(_join)
            })
        }
    }

    render() {
        const {results, datas} = this.state
        console.log('render', datas, results)
        return (
            <div>
                <div id="add-new">
                    <span className='input-span'>命名: <input type="text" style={{width: '150px'}} placeholder='線的名稱' ref={c => this.name = c}/></span>
                    <span className='input-span'><input type="number" ref={c => this.row = c}/>列</span>
                    <span className='input-span'><input type="number" ref={c => this.column = c}/>行</span>
                    <button onClick={this.submitForm}>送出</button>
                </div>
                <hr/>

                <Route path='/addNew/newTable' render={props =>{
                    const {name, row, column} = props.location.state
                    return (
                    <div>
                        <h2>{name}</h2>
                        <ul>
                            {Array(column).fill(1).map((_, columnIndex) =>
                                <li>{Array(row).fill(1).map((_, rowIndex) =>
                                    <AddUnit active={datas.includes([columnIndex, rowIndex].join())} clickEvent={this.unitClick(columnIndex, rowIndex)}/>
                                )}</li>
                            )}
                        </ul>
                        <span className='input-span'>第<input type="number" ref={c => this.lineName = c}/>線</span>
                        <button onClick={this.submitChoose}>送出</button>
                    </div>
                    )
                }}/>
                <hr/>

                <h2>Result:</h2>
                <ul style={{width: '500px', position: 'relative'}}>
                    {/* <AddList/> */}
                    {results.map(result => <AddList result={result}/>)}
                </ul>
            </div>
        )
    }
}

export default withRouter(AddNew)