/*
 * @Author: Small-Tree-Tree 913485079@qq.com
 * @Date: 2022-08-25 17:24:40
 * @LastEditors: Small-Tree-Tree 913485079@qq.com
 * @LastEditTime: 2022-09-03 14:10:24
 * @FilePath: \newssystem\src\views\Home\Right-List\RightList.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from 'react'
import type { ColumnsType } from 'antd/es/table';
import { Table, Tag, Button,Popconfirm ,message,Switch,Popover} from 'antd';
import { IMenu } from '../../../../Type';
import axios from "axios"
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
export default function RightList() {

  interface DataType {
    key: string,
    align: string,
    render: Function
  }

  // 表格数据
  const [tableData, setTableData] = useState([])

  // 处理删除事件
  const handleDel = (item: IMenu) => {
    return () => {
      if (item.grade === 1) {
        // 一级
        let newArr = tableData.filter((data: IMenu) => {
          return data.id !== item.id
        })
        // 修改数据引起页面的变化
        setTableData(newArr)
        // 通知后端修改数据
        axios.delete(`http://localhost:8001/rights/${item.id}`)
        message.success('删除成功');
      } else {
        // 二级
        // 通过rightId找到父级，在通过父级去过滤出符合要求的数据
        let list: any = tableData.filter((data: IMenu) => {
          return item.rightId === data.id
        })
        // 在父级中筛选出不要的孩子
        list[0].children = list[0].children.filter((c: any) => {
          return c.id !== item.id
        })

        setTableData([...tableData])
        // 修改后端的数据
        axios.delete(`http://localhost:8001/children/${item.id}`)
        message.success('删除成功');
      }
    }
  }

  // 处理编辑事件
  const handleEdit = (item:IMenu) =>{
      return () =>{
        item.pagepermisson = item.pagepermisson === 1 ? 0: 1
        setTableData([...tableData])
        axios.patch(`http://localhost:8001/rights/${item.id}`,{pagepermisson:item.pagepermisson})
      }
  }

  // 表头
  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      // 通过dataIndex和数据源进行来连接
      dataIndex: 'id',
    },
    {
      title: '权限名称',
      // 通过dataIndex和数据源进行来连接
      dataIndex: 'title',
    },
    {
      title: '权限路径',
      // 通过dataIndex和数据源进行来连接
      dataIndex: 'key',
      render: (key) => {
        return (
          <Tag color="green">{key}</Tag>
        )
      }
    },
    {
      title: '操作',
      align: 'center',
      // 使用render属性可以去控制结构
      // 当没有配置dataIndex的时候会拿到整行的数据
      render: (item) => {
        return (
          <div>
            <Popconfirm
                title={`你确定要删除 ${item.title} 吗？`}
                onConfirm={handleDel(item)}
                okText="确定"
                cancelText="取消"
              >
              <Button danger type="primary" shape="circle" icon={<DeleteOutlined />}/>
            </Popconfirm>
            <span style={{ opacity: 0 }}>111</span>
            <Popover  content={<div style={{textAlign:'center'}}><Switch checked={item.pagepermisson} disabled={item.pagepermisson === undefined} onChange={handleEdit(item)} /></div>} title="配置权限" trigger="click">
              <Button type="primary" shape="circle" disabled={item.pagepermisson === undefined} icon={<EditOutlined/>}/>
            </Popover>
          </div>
        )
      }
    },
  ];
 
  useEffect(() => {
    axios.get('http://localhost:8001/rights?_embed=children').then((res) => {
      setTableData(res.data)
    })
  }, [])

  return (
    <div>
      <Table columns={columns}  dataSource={tableData} pagination={{pageSize:6}} />
    </div>
  )
}
