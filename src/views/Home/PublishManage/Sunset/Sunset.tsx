import React from 'react'
import {Button} from 'antd'
import Publish from '../../../../components/Publish/Publish'
import usePublish from '../../../../components/usePublish'
export default function Published() {
  const {dataSource,handleDel,handlePublish} = usePublish(2)
  return (
    <div>
        <Publish dataSource={dataSource} Button={(item:any) =>{
          return (
            <div>
              <Button danger onClick={() =>{handleDel(item.id)}}>删除</Button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Button onClick={() =>{handlePublish(item.id)}}>恢复上线</Button>
            </div>
          )}}></Publish>
    </div>
  )
}
