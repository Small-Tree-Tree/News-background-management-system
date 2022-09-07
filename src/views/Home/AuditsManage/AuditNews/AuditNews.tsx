/*
 * @Author: Small-Tree-Tree 913485079@qq.com
 * @Date: 2022-09-03 10:46:26
 * @LastEditors: Small-Tree-Tree 913485079@qq.com
 * @LastEditTime: 2022-09-04 00:51:25
 * @FilePath: \newssystem\src\views\Home\AuditNews\AuditNews.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from 'react'
import { Table, Button, notification } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function AuditNews() {
    const navigate = useNavigate()
    interface DataType {
        title: string
    }
    const columns: ColumnsType<DataType> = [
        {
            title: '新闻',
            dataIndex: 'title',
            ellipsis: true,
            width: '25%',
            render: (text, item: any) => <span style={{ color: '#1890FE' }} onClick={() => {
                navigate(`/home/news-manage/previews/${item.id}`)
            }}>{text}</span>,
        },
        {
            title: '作者',
            dataIndex: 'author',
            width: '25%',
            render: (author) => {
                return <span>{author}</span>
            }
        },
        {
            title: '新闻分类',
            dataIndex: 'category',
            width: '25%',
            render: (category) => {
                return <span>{category.title}</span>
            }
        },
        {
            title: '操作',
            width: '25%',
            render: (item) => {
                return (
                    <div>
                        <Button onClick={handleAudit(item, 1)} type='primary'>通过</Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button onClick={handleAudit(item, 0)} danger>驳回</Button>
                    </div>
                )
            }
        }
    ];

    const [dataSource, setDataSource] = useState([])
    const getAuditList = () => {
        axios.get('http://localhost:8001/news?auditState=1&_expand=category').then((res) => {
            setDataSource(res.data)
        })
    }
    useEffect(() => {
        getAuditList()
    }, [])

    const handleAudit = (item: any, type: number) => {
        return () => {
            if (type) {
                axios.patch(`http://localhost:8001/news/${item.id}`, { auditState: 2}).then(() => {
                    getAuditList()
                    // 审核通过
                    notification.info({
                        message: `审核通过`,
                        description: '请移至审核列表中查看!',
                        placement: 'topRight'
                    });
                })
            } else {
                axios.patch(`http://localhost:8001/news/${item.id}`, { auditState: 3 }).then(() => {
                    getAuditList()
                    // 驳回
                    notification.info({
                        message: `驳回成功`,
                        description: '请移至审核列表中查看!',
                        placement: 'topRight'
                    });
                })

            }
        }
    }
    return (
        <div>
            <Table columns={columns} dataSource={dataSource} rowKey={(item: any) => {
                return item.id
            }} />;
        </div>
    )
}
