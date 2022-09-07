/*
 * @Author: Small-Tree-Tree 913485079@qq.com
 * @Date: 2022-09-03 23:38:45
 * @LastEditors: Small-Tree-Tree 913485079@qq.com
 * @LastEditTime: 2022-09-04 10:53:13
 * @FilePath: \newssystem\src\components\usePublish.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import {notification} from 'antd'
export default function usePublish(state: number) {
    const [dataSource, setDatasource] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:8001/news?publishState=${state}&_expand=category`).then((res) => {
            setDatasource(res.data)
        })
    }, [state])

    const handlePublish = (id: number) => {
        axios.patch(`http://localhost:8001/news/${id}`, { publishState: 1, publishTime: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss') }).then(() => {
            notification.info({
                message: `通知 `,
                description:'发布成功,请移至已发布区域',
                placement:'topRight',
              });
            axios.get(`http://localhost:8001/news?publishState=${state}&_expand=category`).then((res) => {
                setDatasource(res.data)
            })
        })
    }

    const handleSunset = (id: number) => {
        axios.patch(`http://localhost:8001/news/${id}`, { publishState: 2 }).then(() => {
            notification.info({
                message: `通知 `,
                description:'下线成功,请移至已下线区域',
                placement:'topRight',
              });
            axios.get(`http://localhost:8001/news?publishState=${state}&_expand=category`).then((res) => {
                setDatasource(res.data)
            })
        })
    }

    const handleDel = (id: number) => {
        axios.delete(`http://localhost:8001/news/${id}`).then(() => {
            notification.info({
                message: `通知 `,
                description:'删除成功',
                placement:'topRight',
              });
            axios.get(`http://localhost:8001/news?publishState=${state}&_expand=category`).then((res) => {
                setDatasource(res.data)
            })
        })
    }

    return {
        dataSource,
        handlePublish,
        handleSunset,
        handleDel
    }
}
