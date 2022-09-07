/*
 * @Author: Small-Tree-Tree 913485079@qq.com
 * @Date: 2022-08-24 09:50:35
 * @LastEditors: Small-Tree-Tree 913485079@qq.com
 * @LastEditTime: 2022-09-04 14:00:14
 * @FilePath: \newssystem\src\router\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { lazy, Suspense } from 'react'
import { Navigate } from "react-router-dom"
import { Spin } from 'antd';
const Login = lazy(() => import('../views/Login'))
const Home = lazy(() => import('../views/Home'))
const MainShow = lazy(() => import('../views/Home/MainPage/MainShow'))
const LossPage = lazy(() => import('../views/LossPage'))
const RightList = lazy(() => import('../views/Home/RightsManage/Right-List/RightList'))
const RoleList = lazy(() => import('../views/Home/RightsManage/Role-List/RoleList'))
const UserList = lazy(() => import('../views/Home/UserManage/UserList/UserList'))
const WriteNews = lazy(() => import("../views/Home/NewsManage/Write-News/WriteNews"))
const NewsDraft = lazy(() => import("../views/Home/NewsManage/News-Draft/NewsDraft"))
const NewsPrrview = lazy(() => import("../views/Home/NewsManage/NewsPreview/NewsPrrview"))
const UpdateNews = lazy(() => import("../views/Home/NewsManage/UpdateNews/UpdateNews"))
const AuditList = lazy(() => import("../views/Home/AuditsManage/AuditList/AuditList"))
const Published = lazy(() => import('../views/Home/PublishManage/Published/Published'))
const AuditNews = lazy(() => import('../views/Home/AuditsManage/AuditNews/AuditNews'))
const NewsCategory = lazy(() => import('../views/Home/NewsManage/NewCategory/NewCategory'))
const UnPublished = lazy(() => import('../views/Home/PublishManage/unPublished/unPublished'))
const Sunset = lazy(() => import('../views/Home/PublishManage/Sunset/Sunset'))

// 限制路由组件类型
interface RouterType {
    path: string,
    element: any,
    name?: string,
    children?: Array<RouterType>
}

export const router: Array<RouterType> = [
    {
        path: '/login',
        element: (
            <Suspense fallback={<Spin size="large" />}>
                <Login />
            </Suspense>
        )
    },
    // 先进行重定向
    // {
    //     path: '/home',
    //     element: (localStorage.getItem('token') ? <Navigate to='/home/mainshow' /> : <Navigate to = '/login'/>)
    // },
    // 再渲染Home组件
    {
        path: '/home',
        element: <Home />,
        children: [
            {
                path: 'mainshow',
                element: (
                    <Suspense fallback={<Spin size="large" />}>
                        <MainShow />
                    </Suspense>
                )
            },
            {
                path: 'right-manage/right/list',
                element: (
                    <Suspense fallback={<Spin size="large" />}>
                        <RightList />
                    </Suspense>
                )
            },
            {
                path: 'right-manage/role/list',
                element: (
                    <Suspense fallback={<Spin size="large" />}>
                        <RoleList />
                    </Suspense>
                )
            },
            {
                path: 'user-manage/list',
                element: (
                    <Suspense fallback={<Spin size="large" />}>
                        <UserList />
                    </Suspense>
                )
            },
            {
                path: 'news-manage/add',
                element: (
                    <Suspense fallback={<Spin size="large" />}>
                        <WriteNews />
                    </Suspense>
                )
            },
            {
                path: 'news-manage/draft',
                element: (
                    <Suspense fallback={<Spin size="large" />}>
                        <NewsDraft />
                    </Suspense>
                )
            },
            {
                path: 'news-manage/previews/:id',
                element: (
                    <Suspense fallback={<Spin size="large" />}>
                        <NewsPrrview />
                    </Suspense>
                )
            },
            {
                path: 'news-manage/update/:id',
                element: (
                    <Suspense fallback={<Spin size="large" />}>
                        <UpdateNews />
                    </Suspense>
                )
            },
            {
                path: 'audit-manage/list',
                element: (
                    <Suspense fallback={<Spin size="large" />}>
                        <AuditList />
                    </Suspense>
                )
            },
            {
                path: 'publish-manage/published',
                element: (
                    <Suspense fallback={<Spin size="large" />}>
                        <Published />
                    </Suspense>
                )
            },
            {
                path: 'audit-manage/audit',
                element: (
                    <Suspense fallback={<Spin size="large" />}>
                        <AuditNews />
                    </Suspense>
                )
            },
            {
                path: 'news-manage/category',
                element: (
                    <Suspense fallback={<Spin size="large" />}>
                        <NewsCategory />
                    </Suspense>
                )
            },
            {
                path: 'publish-manage/unpublished',
                element: (
                    <Suspense fallback={<Spin size="large" />}>
                        <UnPublished />
                    </Suspense>
                )
            },
            {
                path: 'publish-manage/sunset',
                element: (
                    <Suspense fallback={<Spin size="large" />}>
                        <Sunset />
                    </Suspense>
                )
            },
            {
                path: '*',
                element: (
                    <Suspense fallback={<Spin size="large" />}>
                        <LossPage />
                    </Suspense>
                )
            }
        ]
    },
    {
        path: '/',
        element: (
            <Suspense fallback={<Spin size="large" />}>
                <Navigate to={localStorage.getItem('token') ? '/home/mainshow' : '/login'} />
            </Suspense>
        )
    }
]

