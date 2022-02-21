import { Form, Input, Modal } from 'antd'
import React, { useState } from 'react'

export interface PromptModalProps {
  title: string
  value?: string
  placeholder?: string
  onOk: (value: string) => void
  onCancel?: VoidFunction
  visible?: boolean
}

export const PromptModal: React.FC<PromptModalProps> = ({
  title,
  value,
  placeholder,
  visible,
  onCancel,
  onOk,
}) => {
  const [form] = Form.useForm()
  return (
    <Modal
      title={title}
      onOk={() => form.submit()}
      visible={visible}
      onCancel={onCancel}
      maskClosable={false}
    >
      <Form form={form} onFinish={(values) => onOk(values?.value)}>
        <Form.Item name="value" initialValue={value}>
          <Input placeholder={placeholder} allowClear />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export interface UsePromptModalOps {
  title: string
  value?: string
  placeholder?: string
  onOk: (value: string) => void
}

export const usePromptModal = (ops: UsePromptModalOps) => {
  const [visible, setVisible] = useState(false)
  return {
    modal: (
      <PromptModal
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={(value) => {
          ops.onOk && ops.onOk(value)
          setVisible(false)
        }}
        title={ops.title}
        value={ops.value}
        placeholder={ops.placeholder}
      />
    ),
    setVisible,
  }
}
