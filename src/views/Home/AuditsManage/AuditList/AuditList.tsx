import React, { useEffect, useState } from 'react'
import { Table, Tag ,Button,notification} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function AuditList() {
  interface DataType {
    key: string;
    name: string;
  }
  const navigate = useNavigate()
  const User = JSON.parse(localStorage.getItem('token') as string)
  const [dataSource,setDataSource] = useState([])
  const auditType = ['未审核','审核中','审核通过','审核失败']
  // const publishType = ['未发布','待发布','已发布','已下架']
  const controlType = ['','撤销','发布','修改']
  const Color = ['blue','orange','green','red']
  const columns: ColumnsType<DataType> = [
    {
      title: '新闻标题',
      width:'20%',
      ellipsis:true,
      render: (item) =>{
        return <span style={{color:"#1890FE",cursor:'pointer'}} onClick={() =>{
          navigate(`/home/news-manage/previews/${item.id}`)
        }}>{item.title}</span>
      },
    },
    {
      title: '作者',
      dataIndex: 'author',
      width:'20%',
      render: text => <p>{text}</p>,
    },
    {
      title: '新闻分类',
      dataIndex: 'category',
      width:'20%',
      render: item => <p>{item.value}</p>,
    },
    {
      title: '审核状态',
      width:'20%',
      dataIndex: 'auditState',
      render: type => {
        return (
          <Tag color={Color[type]}>{auditType[type]}</Tag>
        )
      },
    },
    {
      title: '操作',
      width:'20%',
      render: item =>{
        return (
          <Button onClick={handleEvent(item)}>{controlType[item.auditState]}</Button>
        )
      } ,
    },
  ];

  // 处理更新/发布/撤销的回调函数事件
  const handleEvent = (item:any) =>{
    return () =>{
      if(item.auditState === 1){
        // 审核中,可以进行撤销
        axios.patch(`http://localhost:8001/news/${item.id}`,{auditState:0}).then(() =>{
          notification.info({
            message: `通知`,
            description:'撤销成功! 请移至草稿箱中查看!',
            placement:'topRight'
          });
          getAuditList()
        })
      }else if(item.auditState === 2){
        // 审核通过,可以进行发布
        axios.patch(`http://localhost:8001/news/${item.id}`,{publishState:1}).then(() =>{
          notification.info({
            message: `通知`,
            description:'发布成功! 请移至发布管理中查看!',
            placement:'topRight'
          });
          getAuditList()
        })
      }else{
        // 审核失败,可以进行重新修改
        axios.patch(`http://localhost:8001/news/${item.id}`,{auditState:0}).then(() =>{
          navigate('/home/news-manage/draft')
        })
      }
    }  
  }

  const getAuditList = () =>{
    axios.get(`http://localhost:8001/news?author=${User.username}&auditState_ne=0&publishState_lte=1&_expand=category`).then((res) =>{
      setDataSource(res.data)
    })
  }
  useEffect(() =>{
    getAuditList()
  },[])

  return (
    <div>
      <Table columns={columns} dataSource={dataSource} pagination={{pageSize:6}} rowKey={(item:any) =>{
        return item.id
      }}/>
    </div>
  )
}
