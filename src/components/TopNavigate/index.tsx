/*
 * @Author: Small-Tree-Tree 913485079@qq.com
 * @Date: 2022-08-24 09:48:52
 * @LastEditors: Small-Tree-Tree 913485079@qq.com
 * @LastEditTime: 2022-09-04 14:52:52
 * @FilePath: \newssystem\src\components\TopNavigate\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import React from 'react'
import { Layout, Dropdown, Menu, Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';
import {connect} from "react-redux"
import {CollapseAction} from "../../redux/action/CollapseAction"
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined
} from '@ant-design/icons';
const { Header } = Layout;

function TopNavigate(props:any) {
  const navigate = useNavigate()
  // 处理退出登录事件
  const handleLoginOut = () => {
    navigate('/login')
    // 清除token
    localStorage.removeItem('token')
  }

  const {role:{roleName},username} = JSON.parse(localStorage.getItem('token') as string)

  return (
    <div>
      <Header className="site-layout-background" style={{ padding: '0 20px' }}>
        { props.isCollapse ? <MenuUnfoldOutlined style={{ color: 'white' }} onClick={() => { props.changeCollpase() }} /> : <MenuFoldOutlined style={{ color: 'white' }} onClick={() => { props.changeCollpase() }} />}
        <div style={{ float: 'right' }}>
          <span style={{color:'white',margin:'0 10px'}}>欢迎 {username} 回来！</span>
          <Dropdown overlay={<Menu
            items={[
              {
                key: '1',
                label: (
                  <span>{roleName}</span>
                ),
              },
              {
                key: '2',
                danger: true,
                label: (<span onClick={handleLoginOut}>退出登录</span>),
              },
            ]}
          />}>
            <Avatar size='small' icon={<UserOutlined />} />
          </Dropdown>
        </div>
      </Header>
    </div>
  )
}

export default connect((state:any)=>{
  return {isCollapse:state.CollapseReducer.isCollapse}
},{
  changeCollpase:CollapseAction
})(TopNavigate)