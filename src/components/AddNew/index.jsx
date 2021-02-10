import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import Clipboard from 'react-clipboard.js'
import { nanoid } from 'nanoid'
import './index.css'
import AddUnit from './AddUnit'
import AddList from './AddList'
import { Input } from 'element-react'

class AddNew extends Component {

    state = {
        lineNo: 1,
        datas: [],
        results: [],
        errorIds: [],
        errorLineNos: [],
        finalResult: {}
    }

    /** 設定表單完成 */
    submitForm = () => {
        const {name, row, column} = this
        const {value: _name} = name.refs.input, {value: _row} = row.refs.input, {value: _column} = column.refs.input
        if(!_name || !_row || !_column)
            return

        this.props.history.push({pathname: '/addNew/newTable', state: {name: _name, row: _row*1, column: _column*1}})
    }

    changeLineNo = event => {
        this.setState({lineNo: event})
    }

    /** 選取格子後的提交 */
    submitChoose = () => {
        const {lineNo, datas, results} = this.state

        if(!lineNo || !datas.length)
            return

        const newResult = [...results, {id: nanoid(), lineNo: lineNo*1, datas: datas.sort((a, b) => a.split(',')[0]*1 - b.split(',')[0]*1 )}]
        this.setState({
            lineNo: lineNo*1 +1,
            datas: [], 
            results: newResult,
            errorLineNos: this.checkResult(newResult)
        })
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

    /** 取得要複製的結果字串 */
    getResult = () => {
        const {results} = this.state
        if(!results.length){
            alert('資料為空')
            return null
        }

        if(this.checkResult(results).length){   // 檢查是否有重複
            alert('資料不正確')
            return null
        }

        const {innerHTML: name} = this.formName
        return `'${name}': {${results?.map(result => `\n\t${result.lineNo}: [${result.datas.map(data => `[${data}]`)}]`)}\n}`
    }

    copySuccess = () => {
        alert('資料已成功複製')   
    }

    render() {
        const {lineNo, results, datas, errorLineNos} = this.state

        return (
            <div>
                {/* 顯示表格的尺寸 */}
                <div id="add-new">
                    <div>
                        <span className='input-span'>命名: <Input type="text" id="line-no" placeholder='線的名稱' ref={c => this.name = c}/></span>
                    </div>
                    <div>
                        <span className='input-span'><Input type="number" ref={c => this.row = c}/>列</span>
                        <span className='input-span'><Input type="number" ref={c => this.column = c}/>行</span>
                    </div>
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
                        <span className='input-span'>第<Input type="number" value={lineNo} onChange={this.changeLineNo}/>線</span>
                        <button className='submit-btn' onClick={this.submitChoose}>送出</button>
                    </div>
                    )
                }}/>
                <hr/>

                {/* 顯示每一條線的結果 */}
                <h2>最終結果:</h2>
                <ul style={{width: '500px', position: 'relative'}}>
                    {results.map(result => <AddList key={nanoid()} result={result} removeEvent={this.removeItem} isError={errorLineNos.includes(result.lineNo)}/>)}
                    <li>
                    <Clipboard button-id="confirm" option-text={this.getResult} onSuccess={this.copySuccess}>
                    複製結果
                    </Clipboard>
                    </li>
                </ul>
            </div>
        )
    }
}

export default withRouter(AddNew)