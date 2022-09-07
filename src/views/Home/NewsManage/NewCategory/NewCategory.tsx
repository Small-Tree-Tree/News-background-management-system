import type { InputRef } from 'antd';
import { Form, Input, Table, Button, Popconfirm } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { DeleteOutlined } from '@ant-design/icons';
import React, { useContext, useEffect, useRef, useState } from 'react';
import "./index.css"
import axios from 'axios';
export default function NewCategory() {
    const EditableContext = React.createContext<FormInstance<any> | null>(null);

    interface Item {
        key: string;
        name: string;
        age: string;
        address: string;
    }

    interface EditableRowProps {
        index: number;
    }

    const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
        const [form] = Form.useForm();
        return (
            <Form form={form} component={false}>
                <EditableContext.Provider value={form}>
                    <tr {...props} />
                </EditableContext.Provider>
            </Form>
        );
    };

    interface EditableCellProps {
        title: React.ReactNode;
        editable: boolean;
        children: React.ReactNode;
        dataIndex: keyof Item;
        record: Item;
        handleSave: (record: Item) => void;
    }

    const EditableCell: React.FC<EditableCellProps> = ({
        title,
        editable,
        children,
        dataIndex,
        record,
        handleSave,
        ...restProps
    }) => {
        const [editing, setEditing] = useState(false);
        const inputRef = useRef<InputRef>(null);
        const form = useContext(EditableContext)!;

        useEffect(() => {
            if (editing) {
                inputRef.current!.focus();
            }
        }, [editing]);

        const toggleEdit = () => {
            setEditing(!editing);
            form.setFieldsValue({ [dataIndex]: record[dataIndex] });
        };

        const save = async () => {
            try {
                const values = await form.validateFields();

                toggleEdit();
                handleSave({ ...record, ...values });
            } catch (errInfo) {
                console.log('Save failed:', errInfo);
            }
        };

        let childNode = children;

        if (editable) {
            childNode = editing ? (
                <Form.Item
                    style={{ margin: 0 }}
                    name={dataIndex}
                    rules={[
                        {
                            required: true,
                            message: `${title} is required.`,
                        },
                    ]}
                >
                    <Input ref={inputRef} onPressEnter={save} onBlur={save} />
                </Form.Item>
            ) : (
                <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
                    {children}
                </div>
            );
        }

        return <td {...restProps}>{childNode}</td>;
    };

    type EditableTableProps = Parameters<typeof Table>[0];

    interface DataType {
        value: string;
        title: string;
        id: number
    }

    type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

    const [dataSource, setDataSource] = useState<DataType[]>([]);

    useEffect(() => {
        axios.get('http://localhost:8001/categories').then((res) => {
            setDataSource(res.data)
        })
    }, [])

    // 处理保存的回调函数
    const handleSave = (row: DataType) => {
        setDataSource(dataSource.map((item) => {
            if (item.id === row.id) {
                return {
                    id: item.id,
                    title: row.title,
                    value: row.title
                }
            }
            return item
        }))
        axios.patch(`http://localhost:8001/categories/${row.id}`, {
            title: row.title,
            value: row.value
        })
    };

    // 处理删除的回调函数
    const handleDel = (item: DataType) => { 
        return () => {
            axios.delete(`http://localhost:8001/categories/${item.id}`).then(() =>{
                axios.get(`http://localhost:8001/categories`).then((res) =>{
                    setDataSource(res.data)
                }) 
            })
        }
    }

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: '33%'
        },
        {
            title: '栏目名称',
            dataIndex: 'title',
            width: '33%',
            onCell: (record: DataType) => ({
                record,
                editable: true,
                dataIndex: 'title',
                title: '栏目名称',
                handleSave,
            }),
        },
        {
            title: '操作',
            dataIndex: '',
            width: '33%',
            render: (item: DataType) => {
                return (
                    <Popconfirm title={`确定要删除 ${item.title} 栏目吗?`} okText="确定" cancelText="取消" onConfirm={handleDel(item)}>
                        <Button shape='circle' danger icon={<DeleteOutlined />}></Button>
                    </Popconfirm>
                )
            }
        }
    ]

    return (
        <div>
            <Table
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource}
                columns={columns as ColumnTypes}
                rowKey={(item: any) => {
                    return item.id
                }}
            />
        </div>
    );
}
