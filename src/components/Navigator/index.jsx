import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import 'element-theme-default'
import './index.css'
import line from '../../LineData'
import { Layout, Menu } from 'element-react'

class Navigator extends Component {    

    state = {
        titleGroup: [
            {
                title: '顯示'
            },
            {
                title: '新增', data: {title: '新增線圖', id: 'addNew'}
            }
        ]
    }

    componentDidMount(){
        this.sortData()
    }

    sortData = ()=>{
        const [...groups] = this.state.titleGroup, datas = Object.keys(line)
        const displayGroup = groups.find(group => group.title === '顯示')
        displayGroup.datas = {
            '3x': datas.filter(data => /3x/.test(data)).map((data, index) => ({lineName: data, id: `3x_${index}`})),
            '4x': datas.filter(data => /4x/.test(data)).map((data, index) => ({lineName: data, id: `4x_${index}`})),
            '其他': datas.filter(data => /Sp/.test(data)).map((data, index) => ({lineName: data, id: `sp_${index}`}))
        }
        this.setState({})
    }

    tagSelect = (target) => {
        switch(target){
            case 'addNew':
                this.addNew(target)
                break
            default:
                this.showLine(target)
                break;
        }
    }

    showLine = (target) => {
        const {datas} = this.state.titleGroup[0]
        const flatData = Object.values(datas).reduce((pre, curr) => [...pre, ...curr], [])
        const data = flatData.find(_data => _data.id === target)
        const {history} = this.props
        history.push({pathname: `/${data.lineName}`, state: {objKey: data.lineName, data: line[data.lineName]}})
    }

    addNew = (target) => {
        this.props.history.push({pathname: `/${target}`})
    }

    render() {
        const [...groups] = this.state.titleGroup
        return (
            <Layout.Col span={4}>
                <Menu mode="vertical" className="el-menu-vertical-demo navigator" onSelect={this.tagSelect} theme="dark">
                {
                    groups.map(group =>
                        <Menu.ItemGroup title={group.title} key={group.title}>
                            {
                                !group.datas && !group.data? null: 
                                group.title === '顯示'? 
                                    Object.keys(group.datas).map(_key =>
                                        <Menu.SubMenu key={_key} index={_key} title={_key}>
                                            {group.datas[_key].map(data =>
                                                <Menu.Item key={data.id} index={data.id}><i className="el-icon-setting"/>{data.lineName}</Menu.Item>    
                                            )}
                                        </Menu.SubMenu>    
                                    )
                                : group.title === '新增'?
                                <Menu.Item index={group.data.id}>{group.data.title}</Menu.Item>             
                                : null
                            }
                        </Menu.ItemGroup>
                    )
                }
                </Menu>
            </Layout.Col>

        )
    }
}

export default withRouter(Navigator)