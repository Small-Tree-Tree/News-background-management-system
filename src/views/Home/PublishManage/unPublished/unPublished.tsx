/*
 * @Author: Small-Tree-Tree 913485079@qq.com
 * @Date: 2022-09-04 00:16:19
 * @LastEditors: Small-Tree-Tree 913485079@qq.com
 * @LastEditTime: 2022-09-04 00:34:28
 * @FilePath: \newssystem\src\views\Home\PublishManage\unPublished\unPublished.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Button } from 'antd'
import React from 'react'
import Publish from '../../../../components/Publish/Publish'
import usePublish from '../../../../components/usePublish'
export default function UnPublished() {
    const {dataSource,handlePublish} = usePublish(0)
    return (
        <Publish dataSource={dataSource} Button={(item:any)=><Button danger onClick={() =>{
            handlePublish(item.id)
        }}>发布</Button>}></Publish>
    )
}
