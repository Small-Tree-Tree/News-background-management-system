/*
 * @Author: Small-Tree-Tree 913485079@qq.com
 * @Date: 2022-09-03 23:12:08
 * @LastEditors: Small-Tree-Tree 913485079@qq.com
 * @LastEditTime: 2022-09-04 01:00:08
 * @FilePath: \newssystem\src\components\Publish\Publish.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import {Table} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
export default function Publish(props:any) {
    const navigate = useNavigate()    
    interface DataType {
        title: string
    }
    const columns: ColumnsType<DataType> = [
        {
            title: '新闻标题',
            dataIndex: 'title',
            width:'25%',
            render: (text, item: any) => <span style={{ color: '#1890FE' }} onClick={() => {
                navigate(`/home/news-manage/previews/${item.id}`)
            }}>{text}</span>,
        },
        {
            title: '作者',
            dataIndex: 'author',
            width:'25%',
            render: (author) => {
                return <span>{author}</span>
            }
        },
        {
            title: '新闻分类',
            dataIndex: 'category',
            width:'25%',
            render: (category) => {
                return <span>{category.title}</span>
            }
        },
        {
            title: '操作',
            width:'25%',
            render: (item) => {
                return (
                    props.Button(item)
                )
            }
        }
    ];
    return (
            <Table columns={columns} dataSource={props.dataSource} rowKey={(item:any) =>{
                return item.id
            }} />
    )
}
