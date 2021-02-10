import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import Clipboard from 'react-clipboard.js'
import { nanoid } from 'nanoid'
import './index.css'
import AddUnit from './AddUnit'
import AddList from './AddList'

class AddNew extends Component {

    state = {
        datas: [],
        results: [],
        errorIds: [],
        errorLineNos: [],
        finalResult: {}
    }

    /** 設定表單完成 */
    submitForm = () => {
        const {name, row, column} = this
        if(!name.value || !row.value || !column.value)
            return

        this.setState(state => state.result = {[name.value]: 1})
        this.props.history.push({pathname: '/addNew/newTable', state: {name: name.value, row: row.value*1, column: column.value*1}})
    }

    /** 選取格子後的提交 */
    submitChoose = () => {
        const {value} = this.lineName        
        const {datas, results} = this.state

        if(!value || !datas.length)
            return

        const newResult = [...results, {id: nanoid(), lineNo: value, datas: datas.sort((a, b) => a.split(',')[0]*1 - b.split(',')[0]*1 )}]
        this.setState({
            datas: [], 
            results: newResult,
            errorLineNos: this.checkResult(newResult)
        }, ()=> this.lineName.value = value*1 +1)
    }

    /** 
     * 檢查是否有重複的lineNo
     * 回傳重複的 result id
     */
    checkResult = (newResult) => {
        const duplicateLineNos = []
        const lineNoArr = newResult.map(result => result.lineNo)
        newResult.filter((result, index) => lineNoArr.indexOf(result.lineNo) !== index).map(result => !duplicateLineNos.includes(result.lineNo) && duplicateLineNos.push(result.lineNo)) 
        return duplicateLineNos
    }

    confirmResult = () => {
        const {results, errorIds} = this.state 
        errorIds.length = 0
        if(!this.checkResult()){
            const lineNoArr = results.map(result => result.lineNo)
            results.filter((result, index) => lineNoArr.indexOf(result.lineNo) !== index).map(result => errorIds.push(result.id))
            this.setState({errorIds: errorIds})
            return
        }

        console.log('results', results)
        this.setState({finalResult: {
            name: this.name.value,
            results: results
        }})
    }

    /** 每一格點擊的事件 */
    unitClick = (columnIndex, rowIndex) => {
        return () => {
            this.setState(state => {
                const _join = [columnIndex, rowIndex].join()
                return state.datas.includes(_join)? state.datas.splice(state.datas.indexOf(_join), 1): state.datas.push(_join)
            })
        }
    }

    /** 
     * 移除指定的線
     * 並視情況清除重複的提示
    */
    removeItem = (id) => {
        return ()=>{
            const {results, errorLineNos} = this.state
            const lineNo = results.find(result => result.id === id).lineNo
            const filterNos = results.filter(result => result.lineNo === lineNo && result.id !== id)
            this.setState({
                results: results.filter(result => result.id !== id),        // 清除該list
                errorLineNos: filterNos.length <= 1? errorLineNos.filter(_lineNo => _lineNo !== lineNo): errorLineNos
            })
        }
    }

    getResult = () => {
        const {innerHTML: name} = this.formName
        const {results} = this.state
        return `${name}': {${results?.map(result => `\n\t${result.lineNo}: [${result.datas.map(data => `[${data}]`)}]`)}\n}`
    }

    render() {
        const {results, datas, errorLineNos} = this.state

        return (
            <div>
                {/* 顯示表格的尺寸 */}
                <div id="add-new">
                    <span className='input-span'>命名: <input type="text" style={{width: '150px'}} placeholder='線的名稱' ref={c => this.name = c}/></span>
                    <span className='input-span'><input type="number" ref={c => this.row = c}/>列</span>
                    <span className='input-span'><input type="number" ref={c => this.column = c}/>行</span>
                    <button onClick={this.submitForm}>送出</button>
                </div>
                <hr/>

                {/* 顯示可以點選的格子 */}
                <Route path='/addNew/newTable' render={props =>{
                    const {name, row, column} = props.location.state
                    return (
                    <div>
                        <h2 ref={c => this.formName = c}>{name}</h2>
                        <ul>
                            {Array(column).fill(1).map((_, columnIndex) =>
                                <li key={nanoid()}>{Array(row).fill(1).map((_, rowIndex) =>
                                    <AddUnit key={nanoid()} active={datas.includes([columnIndex, rowIndex].join())} clickEvent={this.unitClick(columnIndex, rowIndex)}/>
                                )}</li>
                            )}
                        </ul>
                        <span className='input-span'>第<input type="number" ref={c => this.lineName = c}/>線</span>
                        <button onClick={this.submitChoose}>送出</button>
                    </div>
                    )
                }}/>
                <hr/>

                {/* 顯示每一條線的結果 */}
                <h2>最終結果:</h2>
                <ul style={{width: '500px', position: 'relative'}}>
                    {results.map(result => <AddList key={nanoid()} result={result} removeEvent={this.removeItem} isError={errorLineNos.includes(result.lineNo)}/>)}
                    {/* <li><button id="confirm" onClick={this.confirmResult}> 確認 </button></li> */}
                    <li>
                    <Clipboard option-text={this.getResult}>
                    複製結果
                    </Clipboard>
                    </li>
                </ul>
                <hr/>

                {/* 顯示最終結果 */}
                {/* <Clipboard option-text={this.getResult}>
                    複製結果
                </Clipboard> */}
            </div>
        )
    }
}

export default withRouter(AddNew)