/*
 * @Author: Small-Tree-Tree 913485079@qq.com
 * @Date: 2022-08-30 22:19:08
 * @LastEditors: Small-Tree-Tree 913485079@qq.com
 * @LastEditTime: 2022-09-03 08:56:46
 * @FilePath: \newssystem\src\views\Home\Write-News\WriteNews.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from 'react'
import { Steps, Button, Form, Input, Select, message, notification, PageHeader } from 'antd';
import NewsDraft from '../../../../components/NewsDraft';
import axios from "axios"
import { Icategory } from "../../../../Type"
import { useNavigate, useParams } from 'react-router-dom';
import "./index.css"
export default function WriteNews() {
    const { id } = useParams()
    const { Step } = Steps;
    const { Option } = Select;
    const navigate = useNavigate()
    // 定义当前进度条的状态
    const [current, setCurrent] = useState(0)

    // 定义分类的数据
    const [category, setCategory] = useState([])

    interface ItitleCategory {
        NewsTitle: string,
        NewsCategory: number
    }
    // 存放标题和分类信息
    const [titleCategory, setTitleCategory] = useState<ItitleCategory>({
        NewsTitle: '',
        NewsCategory: 0
    })

    // draft的内容
    const [draft, setDraft] = useState("")

    // 获取当前draft已有的内容
    const [content,setContent] = useState('')

    // ref表单实例
    const [form] = Form.useForm()

    // 上一步
    const preStep = () => {
        if (current !== 0) {
            setCurrent(current - 1)
        }
    }

    // 下一步
    const nextStep = () => {
        if (current === 0) {
            // 进行校验
            form.validateFields().then((res) => {
                setTitleCategory(res)
                setCurrent(current + 1)
            }).catch(() => {
                message.error('内容不能为空')
            })
        }
        if (current === 1) {
            if (draft === '' || draft === '<p></p>\n' || draft === undefined) {
                message.error('内容不能为空')
            } else {
                setCurrent(current + 1)
            }
        }
    }

    // 获取draft中输入的内容
    const getDraftData = (value: any) => {
        setDraft(value)
    }

    // 处理保存草稿箱和提交审核
    const handleSave = (type: number) => {
        /*
             auditState 
                0 : 草稿箱
                1 : 提交审核
                2 : 审核通过
                3 : 审核失败

            publishState、
                0 : 未发布
                1 : 待发布
                2 : 发布上线
                3 : 发布下线

         */
        return () => {
            axios.patch(`http://localhost:8001/news/${id}`, {
                "title": titleCategory.NewsTitle,
                "categoryId": titleCategory.NewsCategory,
                "content": draft,
                "auditState": type,
                "publishState": 0,
                "createTime": Date.now(),
            }).then(() => {
                if (type === 0) {
                    notification['info']({
                        message: '草稿箱',
                        description: '可移至草稿箱，查看编辑的内容！'
                    });
                } else {
                    notification['success']({
                        message: '审核',
                        description: '提交审核成功，等待审核通过！'
                    });
                }
            })
            navigate('/home/news-manage/draft')
        }
    }

    // 获取数据
    useEffect(() => {
        axios.get('http://localhost:8001/categories').then((res) => {
            setCategory(res.data)
        })

        axios.get(`http://localhost:8001/news/${id}?_expand=category`).then((res) => {
            setContent(res.data.content)
            form.setFieldsValue({
                NewsTitle: res.data.title,
                NewsCategory: res.data.category.id
            })
        })
    }, [id, form])

   
    return (
        <div>
            <PageHeader
                className="site-page-header"
                onBack={() => navigate(-1)}
                title="更新新闻"
            />
            <Steps current={current} >
                <Step title="基本信息" description="新闻标题、新闻分类" />
                <Step title="新闻内容" description="新闻主体内容" />
                <Step title="新闻提交" description="保存草稿箱或提交审核" />
            </Steps>
            {
                <div className={current === 0 ? 'new-title-box' : 'hidden'}>
                    <Form
                        form={form}
                        name="basic"
                        wrapperCol={{ span: 24 }}
                        initialValues={{ remember: true }}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="新闻标题"
                            name="NewsTitle"
                            rules={[{ required: true, message: '新闻标题不能为空' }]}
                        >
                            <Input placeholder='请输入新闻标题' />
                        </Form.Item>

                        <Form.Item
                            label="新闻分类"
                            name="NewsCategory"
                            rules={[{ required: true, message: '请选择新闻分类' }]}
                        >
                            <Select
                                placeholder="选择新闻分类"
                                allowClear
                            >
                                {
                                    category.map((item: Icategory) => {
                                        return <Option key={item.id} value={item.id}>{item.value}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>

                    </Form>
                </div>
            }
            {
                <div className={current === 1 ? 'new-title-box' : 'hidden'}>
                    <NewsDraft getDraftData={getDraftData} content={content}/>
                </div>
            }
            {
                <div className={current === 2 ? 'new-title-box' : 'hidden'}></div>
            }

            {current !== 0 ? <Button onClick={preStep}>上一步</Button> : ''}
            {<span style={{ opacity: 0 }}>111</span>}
            {current < 2 ? <Button onClick={nextStep}>下一步</Button> : ''}
            {current === 2 ? <Button onClick={handleSave(0)}>保存至草稿箱</Button> : ''}
            {<span style={{ opacity: 0 }}>111</span>}
            {current === 2 ? <Button danger onClick={handleSave(1)}>提交审核</Button> : ''}
        </div>
    )
}
