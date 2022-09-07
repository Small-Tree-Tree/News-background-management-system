/*
 * @Author: Small-Tree-Tree 913485079@qq.com
 * @Date: 2022-08-24 12:38:04
 * @LastEditors: Small-Tree-Tree 913485079@qq.com
 * @LastEditTime: 2022-08-29 19:59:33
 * @FilePath: \newssystem\src\views\Login\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState, useEffect } from 'react'
import { Button, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './index.css'
export default function Login() {
  const [isLoading, setLoading] = useState(false)
  const navigate = useNavigate()
  // 表单验证成功后的回调
  const onFinish = (value: any) => {
    setLoading(true)
    axios.get(`http://localhost:8001/users?username=${value.username}&password=${value.password}&roleState=${true}&_expand=role`).then((res) => {      
    if (res.data.length === 0) {
        message.error('用户名或者密码错误，请重新输入！')
        setLoading(false)
      } else {
        setLoading(false)
        message.success('登录成功！')
        localStorage.setItem('token',JSON.stringify(res.data[0]))
        navigate('/') 
      }
    })
  }
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});
  useEffect(() => {
    forceUpdate({});
  }, []);

  return (
    <div className='login-wrapper'>
      <div className='login-box'>
        <h1 className='login-title'>新闻后台管理系统</h1>
        <Form form={form} name="horizontal_login" layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: '用户名由3~10位数组成', max: 10, min: 3 }]}
            wrapperCol={{ span: 20, offset: 2 }}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            wrapperCol={{ span: 20, offset: 2 }}
            rules={[{ required: true, message: '密码由3~13位数组成', max: 13, min: 3 }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="请输入密码"
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 5 }}>
            <Button ghost htmlType='submit' style={{ width: '300px' }} loading={isLoading}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
