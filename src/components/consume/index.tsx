import { Button, Checkbox, Form, Input, Space, Typography } from 'antd'
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

  const updateCheck = (lineName, name, checked: boolean) => {
    const target = data[lineName]
    target[name].disabled = !checked
    onChange({ ...data })
  }

  return (
    <Form
      form={form}
      initialValues={data}
      onValuesChange={(_, values: ConsumeProps['data']) => {
        onChange(values)
      }}
    >
      {getKeys(data).map((lineName) => (
        <Line key={lineName}>
          <LineLabel>{lineName}:</LineLabel>
          <LineContent>
            <Form.List name={lineName}>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => {
                    const item = form.getFieldValue([lineName, name])
                    return (
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
                          <Input
                            disabled={item.disabled}
                            placeholder="输入名称"
                            type="text"
                          />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'value']}
                          rules={[{ required: true }]}
                        >
                          <Input
                            disabled={item.disabled}
                            placeholder="输入数值"
                            type="number"
                          />
                        </Form.Item>
                        <Checkbox
                          checked={!item.disabled}
                          style={{ marginRight: 24 }}
                          onChange={(event) =>
                            updateCheck(lineName, name, event.target.checked)
                          }
                        />
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    )
                  })}
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
