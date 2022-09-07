/*
 * @Author: Small-Tree-Tree 913485079@qq.com
 * @Date: 2022-08-24 13:09:40
 * @LastEditors: Small-Tree-Tree 913485079@qq.com
 * @LastEditTime: 2022-09-05 19:54:05
 * @FilePath: \newssystem\src\views\Home\MainPage\MainShow.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Avatar, List, Drawer } from 'antd';
import { EditOutlined, EllipsisOutlined, UnorderedListOutlined } from '@ant-design/icons';
import axios from 'axios';
import * as echarts from 'echarts';
import _ from "lodash"
import { useNavigate } from 'react-router-dom';
import "./MainPage.css"
export default function Mainshow() {
  const navigate = useNavigate()
  const { Meta } = Card;
  const User = JSON.parse(localStorage.getItem('token') as string)
  const [oftenView, setOftenView] = useState([])
  const [oftenStar, setOftenStar] = useState([])
  const [Newdata,setNewData] = useState([])
  const [visible, setVisible] = useState(false)
  // 初始化bar
  const initBar = (data: object) => {
    var myChart = echarts.init(document.getElementById('NewsBar') as HTMLElement);
    var option;
    const yArr = []
    for (const key in data) {
      yArr.push(data[key].length)
    }
    option = {
      title: {
        text: '新闻分类',
        left: '20px'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: Object.keys(data),
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          minInterval: 1
        },
      ],
      series: [
        {
          name: '数量',
          type: 'bar',
          barWidth: '60%',
          data: yArr
        }
      ]
    };
    option && myChart.setOption(option);
  }

  // 初始化pie
  const initPie = (data:object) => {
    var myChart = echarts.init(document.getElementById('NewPie') as HTMLElement);
    var option;
    let Arr = []
    for (const key in data) {
      let obj = {name:key,value:data[key].length}
      Arr.push(obj)
    }
    
    option = {
      title: {
        text: '个人新闻分类图示',
        left: 'center',
        textStyle:{
          fontSize:28
        }
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '新闻分类',
          type: 'pie',
          radius: '50%',
          data: Arr,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    option && myChart.setOption(option);
  }

  useEffect(() => {
    axios.get('http://localhost:8001/news?publishState=1&_expand=category&_sort=view&_order=desc&_limit=7').then((res) => {
      setOftenView(res.data)
    })
    axios.get('http://localhost:8001/news?publishState=1&_expand=category&_sort=star&_order=desc&_limit=7').then((res) => {
      setOftenStar(res.data)
    })
    axios.get('http://localhost:8001/news?publishState=1&_expand=category').then((res) => {
      setNewData(res.data)
      initBar(_.groupBy(res.data, (item: any) => {
        return item.category.value
      }))
    })
  }, [])

  // 预览新闻
  const handlePreview = (id: number) => {
    return () => {
      navigate(`/home/news-manage/previews/${id}`)
    }
  }

  // 关闭抽屉
  const onClose = () => {
    setVisible(false)
  }

  // 展示抽屉
  const showPie = () => {
    /*
      因为异步更新所以导致dom还没有被渲染出来就初始化Dom就会报错 
     */
    setVisible(true)
    setTimeout(() => {
      initPie(_.groupBy(Newdata, (item: any) => {
        return item.category.value
      }))
    }, 0);
  }

  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="用户最常浏览" bordered={true}>
            <List
              dataSource={oftenView}
              renderItem={(item: any) => (
                <List.Item >
                  <div className='ListBox'>
                    <span onClick={handlePreview(item.id)} className='NewsTitle'>{item.title}</span>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="用户点赞最多" bordered={true}>
            <List
              dataSource={oftenStar}
              renderItem={(item: any) => (
                <List.Item>
                  <div className='ListBox'>
                    <span onClick={handlePreview(item.id)} className='NewsTitle'>{item.title}</span>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            style={{ width: 300 }}
            cover={
              <img
                alt="example"
                src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202002%2F17%2F20200217091609_yqdai.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664948103&t=bf287b06898531596dd61a3a1f2df097"
              />
            }
            actions={[
              <UnorderedListOutlined key='show' onClick={showPie} />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={User.username}
              description={User.role.roleName}
            />
          </Card>
        </Col>
      </Row>
      <div id='NewsBar' style={{ width: '1000px', height: '400px', marginTop: '40px' }}></div>
      <Drawer width={570} title="个人新闻分类情况" placement="right" onClose={onClose} visible={visible}>
        <div id='NewPie' style={{ width: '550px', height: '400px', margin: '40px auto' }}></div>
      </Drawer>
    </div>
  )
}
