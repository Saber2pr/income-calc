import { Button, Form, Input, Space, Typography } from 'antd'
import React, { useEffect } from 'react'

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { getArray } from '@saber2pr/utils/lib/array'
import { getKeys } from '@/utils'
import { Line, LineContent, LineLabel } from './index.style'

const { Text } = Typography

export interface ConsumeProps {
  data: ConsumeData
  onChange: (values: any) => void
}

export const Consume: React.FC<ConsumeProps> = ({ data, onChange }) => {
  const [form] = Form.useForm()

  return (
    <Form
      form={form}
      initialValues={data}
      onValuesChange={(_, values: ConsumeProps['data']) => {
        onChange(values)
      }}
    >
      {getKeys(data).map((name) => (
        <Line key={name}>
          <LineLabel>{name}:</LineLabel>
          <LineContent>
            <Form.List name={name}>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{ display: 'flex', width: '100%' }}
                      align="baseline"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, 'name']}
                        rules={[{ required: true }]}
                      >
                        <Input placeholder="输入名称" type="text" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'value']}
                        rules={[{ required: true }]}
                      >
                        <Input placeholder="输入数值" type="number" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add({ name: '名称', value: 0 })}
                      block
                      icon={<PlusOutlined />}
                    >
                      添加
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </LineContent>
        </Line>
      ))}
    </Form>
  )
}
