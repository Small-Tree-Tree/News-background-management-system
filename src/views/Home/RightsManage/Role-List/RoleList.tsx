/*
 * @Author: Small-Tree-Tree 913485079@qq.com
 * @Date: 2022-08-26 22:45:20
 * @LastEditors: Small-Tree-Tree 913485079@qq.com
 * @LastEditTime: 2022-09-03 14:10:23
 * @FilePath: \newssystem\src\views\Home\Role-List\RoleList.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from 'react'
import { Table, Popconfirm, Button, Modal, Tree } from 'antd';
import { UnorderedListOutlined, DeleteOutlined } from "@ant-design/icons"
import { Irights } from "../../../../Type/index"
import axios from 'axios';
export default function RoleList() {
  // 定义权限数据
  const [roleList, setRoleList] = useState<any>([])
  // 定义树形结构的数据
  const [treeData, setTreeData] = useState([])
  // 定义模态框的显示与隐藏
  const [visible, setVisible] = useState(false)
  // 定义当前选中的权限数据
  const [currentRights,setCurrentRights] = useState([])
  // 定义当前选中权限的id
  const [roleId,setRoleID] = useState(0)

  // 请求数据
  useEffect(() => {
    axios.get('http://localhost:8001/roles').then((res) => {
      setRoleList(res.data)
    })
    axios.get('http://localhost:8001/rights?_embed=children').then((res) => {
      setTreeData(res.data)
    })
  }, [])

  //　处理删除事件
  const handleDel = (item: Irights) => {
    return () => {

    }
  }

  // 处理模态框确认按钮
  const handleOk = () => {
    // 判断修改的是那个,更新到roleList中
    setRoleList(roleList.map((item:Irights) =>{
        if(item.id === roleId){
          return {...item,rights:currentRights}
        }else{
          return item
        }
    }))
    // 修改后端的数据
    axios.patch(`http://localhost:8001/roles/${roleId}`,{rights:currentRights})
    setVisible(false)
  }

  // 处理模态框取消按钮
  const handleCancel = () => {
    setVisible(false)
  }

  // 点击权限操作按钮触发事件
  const handleRole = (item:Irights) =>{
    // 显示模态框
    setVisible(true)    
    setCurrentRights(item.rights)
    setRoleID(item.id)
  }

  // 处理oncheck事件
  const handleChecked = (checkedKeysValue:any) =>{
    setCurrentRights(checkedKeysValue)
  }

  // 表头数据
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id'
    },
    {
      title: '角色名称',
      dataIndex: 'roleName'
    },
    {
      title: '操作',
      render: (item: Irights) => {
        return (
          <div>
            <Popconfirm
              title={`你确定要删除吗？`}
              onConfirm={handleDel(item)}
              okText="确定"
              cancelText="取消"
              disabled={item.roleName==='超级管理员'}
            >
              <Button danger type="primary" shape="circle" icon={<DeleteOutlined />} disabled={item.roleName==='超级管理员'}/>
            </Popconfirm>
            <span style={{ opacity: 0 }}>111</span>
            <Button type="primary" shape='circle' onClick={() => {handleRole(item)}} icon={<UnorderedListOutlined />}></Button>
          </div>
        )
      }
    },
  ];

  return (
    <div>
      {/* 使用rowKey方法给每个item赋予唯一的key值 */}
      <Table columns={columns} dataSource={roleList} rowKey={(item: any) => {
        // 将当前item.id当作key值
        return item.id
      }} />
      <Modal title="权限分配" visible={visible} onOk={handleOk} onCancel={handleCancel} okText="确认" cancelText="取消">
        <Tree
          checkable
          treeData={treeData}
          checkedKeys={currentRights}
          onCheck={handleChecked}
          checkStrictly
        />
      </Modal>
    </div>
  )
}
