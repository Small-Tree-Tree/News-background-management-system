/*
 * @Author: Small-Tree-Tree 913485079@qq.com
 * @Date: 2022-08-24 09:48:47
 * @LastEditors: Small-Tree-Tree 913485079@qq.com
 * @LastEditTime: 2022-09-04 14:49:20
 * @FilePath: \newssystem\src\components\SideMenu\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from 'react'
import { Layout, Menu } from 'antd';
import axios from "axios"
import { useNavigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  UserOutlined,
  UnorderedListOutlined,
  UnlockOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
  SendOutlined
} from '@ant-design/icons';
import { IMenu } from '../../Type';
import "./index.css"

function SideMenu(props:any) {
  const { Sider } = Layout;
  
  // 接收菜单栏内容
  const [menu, setMenu] = useState([])
  const navigate = useNavigate()

  // 进行跳转
  const handleSelect = (props: any) => {
    navigate('/home' + props.key)
  }

  const icons = {
    '/mainshow': <UserOutlined />,
    '/user-manage': <UnorderedListOutlined />,
    '/right-manage': <UnlockOutlined />,
    '/news-manage': <InfoCircleOutlined />,
    '/audit-manage': <CheckCircleOutlined />,
    '/publish-manage': <SendOutlined />
  }

  useEffect(() => {
    axios.get('http://localhost:8001/rights?_embed=children').then((res) => {
      let arr = res.data.map((item: IMenu) => {
        if (item.children.length > 0) {
          let newChildren = item.children.map((c: any) => {
            return {
              id: c.id,
              key: c.key,
              label: c.title,
              rightid: c.rightId,
              garde: c.grade
            }
          })

          return {
            label: item.title,
            id: item.id,
            key: item.key,
            gard: item.grade,
            pagepermisson: item.pagepermisson,
            children: newChildren,
            icon: icons[item.key]
          }
        }
        return {
          label: item.title,
          id: item.id,
          key: item.key,
          gard: item.grade,
          pagepermisson: item.pagepermisson,
          children: null,
          icon: icons[item.key]
        }
      })

      // 取出当前用户的权限
      let Rights = JSON.parse(localStorage.getItem('token') as string)
      
      // 利用pagepermisson和登录用户的权限进行筛选
      // 先筛选出满足的一级路由
      let fArr = arr.filter((item: IMenu) => {
        return item.pagepermisson === 1 && Rights.role.rights.checked.includes(item.key)
      })

      // 筛选出满足的二级路由
      let cArr = fArr.filter((item: IMenu) => {                       
        if (item.children === null) {
          return item
        } else {
          item.children = item.children.filter((i: IMenu) => {
            return Rights.role.rights.checked.includes(i.key)
          })
          return item
        }
      })
      
      setMenu(cArr)
    })
  }, [])

  const { pathname } = useLocation()
  // 拿到父亲的路径展示孩子的
  let spread = '/' + pathname.split('/')[2]
  // 拿孩子的路径
  let select = pathname.split('/home')[1]

  return (
    <Sider trigger={null} collapsible collapsed={props.isCollapse} style={{ paddingTop: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div className='Title'>新闻后台管理系统</div>
        <div style={{ overflow: 'auto', flex: 1 }}>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[select]}
            items={menu}
            onSelect={handleSelect}
            defaultOpenKeys={[spread]}
          />
        </div>
      </div>
    </Sider>
  )
}

export default connect((state:any)=>{
  return {isCollapse:state.CollapseReducer.isCollapse}
})(SideMenu)