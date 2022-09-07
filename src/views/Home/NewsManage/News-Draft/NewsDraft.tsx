/*
 * @Author: Small-Tree-Tree 913485079@qq.com
 * @Date: 2022-09-01 14:08:22
 * @LastEditors: Small-Tree-Tree 913485079@qq.com
 * @LastEditTime: 2022-09-03 11:27:48
 * @FilePath: \newssystem\src\views\Home\News-Draft\NewsDraft.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from 'react'
import { Table, Button, Popconfirm } from 'antd';
import { DeleteOutlined, CheckOutlined, EditOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import {INewsInfo} from "../../../../Type/index"
import { useNavigate } from 'react-router-dom';
export default function NewsDraft() {
    interface DataType {
        key: string;
        title: string;
    }

    let userName = JSON.parse(localStorage.getItem('token') as string).username
    const [draftData, setDraftData] = useState([])
    const navigate = useNavigate()
    const columns: ColumnsType<DataType> = [
        {
            title: 'ID',
            dataIndex: 'id',
            width:'20%',
            render: (id) => {
                return <b>{id}</b>
            }
        },
        {
            title: '新闻标题',
            ellipsis:true,
            width:'20%',
            render: (item) => {
                return (
                    <span onClick={() => {
                        navigate(`/home/news-manage/previews/${item.id}`)
                    }} style={{ color: '#1890FE', cursor: 'pointer' }}>{item.title}</span>
                )
            }
        },
        {
            title: '作者',
            width:'20%',
            dataIndex: 'author'
        },
        {
            title: '新闻分类',
            width:'20%',
            dataIndex: 'category',
            render: (category) => {
                return <span>{category?.title}</span>
            }
        },
        {
            title: '操作',
            width:'20%',
            render: (item) => {
                return (
                    <div>
                        <Popconfirm title="确定删除该新闻？" okText="删除" cancelText="取消" onConfirm={handleDelete(item.id)}>
                            <Button danger shape='circle' icon={<DeleteOutlined />}></Button>
                        </Popconfirm>&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button onClick={handleEdit(item)} shape='circle' icon={<EditOutlined />}></Button>&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button shape='circle' onClick={handleCheck(item)} icon={<CheckOutlined />}></Button>
                    </div>
                )
            }
        },
    ];

    useEffect(() => {
        axios.get(`http://localhost:8001/news?auditState=0&author=${userName}&_expand=category`).then((res) => {
            setDraftData(res.data)
        })
    }, [userName])

    // 处理删除的回调函数
    let handleDelete = (id: number) => {
        return () => {
            setDraftData(draftData.filter((item: any) => {
                return item.id !== id
            }))
            axios.delete(`http://localhost:8001/news/${id}`)
        }
    }

    // 处理编辑的回调函数
    let handleEdit = (item:INewsInfo) =>{
        return () =>{
            navigate(`/home/news-manage/update/${item.id}`)
        }
    }

    // 处理发送审核的回调函数
    let handleCheck = (item:INewsInfo) =>{
        return () =>{
            axios.patch(`http://localhost:8001/news/${item.id}`,{
                auditState:1
            }).then(() =>{
                navigate('/home/audit-manage/list')
            })
        }
    }

    return (
        <div>
            <Table columns={columns} dataSource={draftData} rowKey={(item: any) => {
                return item.id
            }} />
        </div>
    )
}
