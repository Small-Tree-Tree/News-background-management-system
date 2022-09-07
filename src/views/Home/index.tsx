/*
 * @Author: Small-Tree-Tree 913485079@qq.com
 * @Date: 2022-08-24 13:02:31
 * @LastEditors: Small-Tree-Tree 913485079@qq.com
 * @LastEditTime: 2022-08-26 00:05:21
 * @FilePath: \newssystem\src\views\Home\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd';
import SideMenu from '../../components/SideMenu'
import TopNavigate from '../../components/TopNavigate'
export default function Home() {
  const { Content } = Layout;
  return (
    <div>
      <Layout style={{height:'100vh'}}>
        {/* 左边菜单栏 */}
        <SideMenu></SideMenu>
        {/* 右侧内容 */}
        <Layout className="site-layout" style={{height:'100%'}}>
          {/* 顶部导航栏 */}
          <TopNavigate></TopNavigate>
          <Content className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              backgroundColor:'white',
              overflow:'auto'
            }}
          >
            {/* 路由组件 */}
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}
