/*
 * @Author: Small-Tree-Tree 913485079@qq.com
 * @Date: 2022-09-01 15:21:32
 * @LastEditors: Small-Tree-Tree 913485079@qq.com
 * @LastEditTime: 2022-09-04 00:38:30
 * @FilePath: \newssystem\src\views\Home\NewsManage\NewsPreview\NewsPrrview.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Descriptions, PageHeader,Tag } from 'antd';
import moment from 'moment';
import axios from 'axios';
import "./index.css"

export default function NewsPreview() {
    const navigate = useNavigate()
    const {id} = useParams()
    const [newsInfo,setNewInfo] = useState({
        author:"",
        createTime:0,
        title:'',
        view:0,
        star:0,
        region:'',
        publishTime:undefined,
        publishState:0,
        auditState:0,
        content:''
    })
    const auditType = ['未审核','审核中','审核通过','审核失败']
    const publishType = ['待发布','已发布','已下线']
    const Color = ['#61AFEF','#D46B08','#389E0D','#CF1322']
    useEffect(() =>{
        axios.get(`http://localhost:8001/news/${id}?_expand=category&_expand=role`).then((res) =>{
            setNewInfo(res.data)
        })
    },[id])
    return (
        <div>
            <PageHeader
                onBack={() => navigate(-1)}
                title="新闻预览"
            />
            <div className='DescriptionsBox'>
                <Descriptions title={'文章标题：'+ newsInfo.title} >
                    <Descriptions.Item label="创建者">{newsInfo.author}</Descriptions.Item>
                    <Descriptions.Item label="创建时间">{moment(newsInfo.createTime).format('YYYY-MM-DD HH:mm:ss')}</Descriptions.Item>
                    <Descriptions.Item label="发布时间">{newsInfo.publishTime === undefined ? '-' : newsInfo.publishTime}</Descriptions.Item>
                    <Descriptions.Item label="区域">{newsInfo.region}</Descriptions.Item>
                    <Descriptions.Item label="审核状态"><Tag color={Color[newsInfo.auditState]}>{auditType[newsInfo.auditState]}</Tag></Descriptions.Item>
                    <Descriptions.Item label="发布状态"><Tag color={Color[newsInfo.publishState+1]}>{publishType[newsInfo.publishState]}</Tag></Descriptions.Item>
                    <Descriptions.Item label="访问数量"><span style={{color:'#26C665'}}>{newsInfo.view}</span></Descriptions.Item>
                    <Descriptions.Item label="点赞数量"><span style={{color:'#26C665'}}>{newsInfo.star}</span></Descriptions.Item>
                    <Descriptions.Item label="评论数量"><span style={{color:'#26C665'}}>0</span></Descriptions.Item>
                </Descriptions>
                <div className='contentBox'>
                    <p dangerouslySetInnerHTML={{__html:newsInfo.content}}></p>
                </div>
            </div>
        </div>
    )
}
