/*
 * @Author: Small-Tree-Tree 913485079@qq.com
 * @Date: 2022-09-03 10:28:58
 * @LastEditors: Small-Tree-Tree 913485079@qq.com
 * @LastEditTime: 2022-09-04 00:23:54
 * @FilePath: \newssystem\src\views\Home\PublishManage\Published\Published.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import {Button} from 'antd'
import Publish from '../../../../components/Publish/Publish'
import usePublish from '../../../../components/usePublish'
export default function Published() {
  const {dataSource,handleSunset} = usePublish(1)
  return (
    <div>
        <Publish dataSource={dataSource} Button={(item:any) =><Button danger onClick={() =>{handleSunset(item.id)}}>下线</Button>}></Publish>
    </div>
  )
}
