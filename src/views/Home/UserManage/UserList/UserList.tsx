/*
 * @Author: Small-Tree-Tree 913485079@qq.com
 * @Date: 2022-08-28 12:59:41
 * @LastEditors: Small-Tree-Tree 913485079@qq.com
 * @LastEditTime: 2022-09-03 14:08:40
 * @FilePath: \newssystem\src\views\Home\UserList\userlist.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import React, { useState, useEffect } from 'react'
import { Table, Popconfirm, Button, Switch, Form, Input, Modal, Select } from 'antd';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { Irights, IUsers, IRegions, CollectionCreateFormProps } from "../../../../Type/index"
import axios from 'axios';
export default function UserList() {
  const { Option } = Select;
  // 定义添加用户的模态框显示和隐藏
  const [addState, setAddState] = useState(false)

  // 定义更新用户的模态框显示和隐藏
  const [updateState, setUpdateState] = useState(false)

  // 定义当前需要更新的用户信息
  const [updateInfo,setUpdateInfo] = useState<IUsers>()

  // 数据源
  const [data, setData] = useState([])

  // 区域数据
  const [regionData, setRegionData] = useState([])
  
  // 角色数据
  const [roleData, setRoleData] = useState([])

  // 处理删除事件
  const handleDel = (item: IUsers) => {
    return () => {
      setData(data.filter((current:IUsers) =>{
          return item.id !== current.id
      }))
      axios.delete(`http://localhost:8001/users/${item.id}`)
    }
  }

  // 处理更新事件
  const handleUpdate = (item:IUsers) =>{
    return () =>{
      setUpdateState(true)
      setUpdateInfo(item)
    }
  }

  // 展示添加的模态框
  const addUser = () => {
    // 显示模态框
    setAddState(true)
  }

  // 处理区域权限
  const checkRoleAuthority = (item:any) =>{
    return () =>{
      let currentUserInfo = JSON.parse(localStorage.getItem('token') as string)
      return item.roleName === currentUserInfo.roleId
    }
  }

  // 处理角色权限
  const checkRegionAuthority = () =>{
    
  }

  // 指定表头信息
  const columns = [
    {
      title: '区域',
      dataIndex: 'region',
      filters:[
        ...regionData.map((item:any) =>{
            return {
              text:item.title,
              value:item.value
            }
        }),{
          text:'全球',
          value:"全球"
        }
      ],
      render: (region: string) => {
        return <b>{region === '' ? '全球' : region}</b>
      },
      onFilter:(value:any,item:any) =>{
          if(item.region === ''){
            return value === '全球'
          }
          return value === item.region
      }
    },
    {
      title: '角色名称',
      dataIndex: 'role',
      render: (role: Irights) => {
        return (
          <span>{role.roleName}</span>
        )
      }
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '用户状态',
      dataIndex: 'roleState',
      render: (roleState: boolean) => {
        return <Switch checked={roleState} />
      }
    },
    {
      title: '操作',
      render: (item: IUsers) => {
        return (
          <div>
            <Popconfirm
              title={`你确定要删除 ${item.username} 吗？`}
              onConfirm={handleDel(item)}
              okText="确定"
              cancelText="取消"
            >
              <Button danger type="primary" shape="circle" icon={<DeleteOutlined />}/>
            </Popconfirm>
            <span style={{ opacity: 0 }}>111</span>
            <Button type='primary' shape='circle' icon={<EditOutlined />} onClick={handleUpdate(item)}></Button>
          </div>
        )
      }
    },
  ];

  // 展示模态框和表单，处理添加用户
  const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
    visible,
    onCreate,
    onCancel,
  }) => {
    const [form] = Form.useForm();
    const [isDisabled, setDisabled] = useState(false)
    return (
      <Modal
        visible={visible}
        title="添加用户"
        okText="添加"
        cancelText="取消"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then(values => {
              form.resetFields();
              onCreate(values);
            })
            .catch(info => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal2"
          initialValues={{ modifier: 'public' }}
        >
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: '用户名由3至6个字符组成', max: 6, min: 3, type: 'string' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            rules={[{ required: true, message: '密码由8~13为字符组成', max: 13, min: 8, type: 'string' }]}
          >
            <Input type={'password'}/>
          </Form.Item>
          <Form.Item
            name="roleId"
            label="角色"
            rules={[{ required: true, message: '请选择角色' }]}
          >
            <Select onChange={(value: number) => {      
              // 判断roleId是否是等于1，如果是的话就证明他是管理员        
              if (value === 1) {             
                setDisabled(true)
                // 清空区域的数据
                form.setFieldValue('region', '')
              } else {
                setDisabled(false)
              }
            }}>
              {
                roleData.map((item: Irights) => {
                  return <Option disable={checkRoleAuthority(item)} key={item.id} value={item.id}>{item.roleName}</Option>
                })
              }
            </Select>
          </Form.Item>
          <Form.Item
            name="region"
            label="区域"
            rules={isDisabled ? undefined : [{ required: true, message: '请选择区域' }]}
          >
            <Select disabled={isDisabled}>
              {
                regionData.map((item: IRegions) => {
                  return <Option disable={checkRegionAuthority} key={item.id} value={item.value}>{item.title}</Option>
                })
              }
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  // 展示模态框和表单，处理添加用户
  const CollectionUpdateForm: React.FC<CollectionCreateFormProps> = ({
    visible,
    onCreate,
    onCancel,
  }) => {
    const [form] = Form.useForm();
    const [isDisabled, setDisabled] = useState(false)
    useEffect(() =>{
      if(updateInfo?.roleId === 1){
        setDisabled(true)
      }
      form.setFieldsValue(updateInfo)
    },[form])
    return (
      <Modal
        forceRender
        visible={visible}
        title="更新用户"
        okText="更新"
        cancelText="取消"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then(values => {
              form.resetFields();
              onCreate(values);
            })
            .catch(info => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal1"
          initialValues={{ modifier: 'public' }}
        >
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: '用户名由3至6个字符组成', max: 6, min: 3, type: 'string' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            rules={[{ required: true, message: '密码由8~13为字符组成', max: 13, min: 8, type: 'string' }]}
          >
            <Input type={'password'}/>
          </Form.Item>
          <Form.Item
            name="roleId"
            label="角色"
            rules={[{ required: true, message: '请选择角色' }]}
          >
            <Select onChange={(value: number) => {      
              // 判断roleId是否是等于1，如果是的话就证明他是管理员        
              if (value === 1) {             
                setDisabled(true)
                // 清空区域的数据
                form.setFieldValue('region', '')
              } else {
                setDisabled(false)
              }

            }}>
              {
                roleData.map((item: Irights) => {
                  return <Option key={item.id} value={item.id}>{item.roleName}</Option>
                })
              }
            </Select>
          </Form.Item>
          <Form.Item
            name="region"
            label="区域"
            rules={isDisabled ? undefined : [{ required: true, message: '请选择区域' }]}
          >
            <Select disabled={isDisabled}>
              {
                regionData.map((item: IRegions) => {
                  return <Option key={item.id} value={item.value}>{item.title}</Option>
                })
              }
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  // 接收表单中所有的数据
  const onCreate1 = (values: any) => {
    axios.post('http://localhost:8001/users', {
      ...values,
      default: false,
      roleState: true
    }).then(() =>{
      axios.get('http://localhost:8001/users?_expand=role').then((res) =>{
        setData(res.data)
      })
    })
    setAddState(false);
  };

  // 接收表单中所有的数据
  const onCreate2 = (values: any) => {     
    axios.patch(`http://localhost:8001/users/${updateInfo?.id}`, {
      ...values
    }).then(() =>{
      axios.get(`http://localhost:8001/users?_expand=role`).then((res) =>{
        setData(res.data)
      })
    })    
    setUpdateState(false);
  };

  useEffect(() => {
    axios.get(`http://localhost:8001/users?_expand=role`).then((res) => {
      setData(res.data)
    })

    axios.get(`http://localhost:8001/regions`).then((res) => {
      setRegionData(res.data)
    })

    axios.get(`http://localhost:8001/roles`).then((res) => {
      setRoleData(res.data)
    })
  }, [])

  return (
    <div>
      <Button type='primary' style={{ marginBottom: '10px' }} onClick={addUser}>添加用户</Button>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 6 }} rowKey={(item: IUsers) => {
        return item.id
      }} />
      <CollectionCreateForm
        visible={addState}
        onCreate={onCreate1}
        onCancel={() => {
          setAddState(false);
        }}
      />
      <CollectionUpdateForm
        visible={updateState}
        onCreate={onCreate2}
        onCancel={() => {
          setUpdateState(false);
        }}
      />
    </div>
  )
}
