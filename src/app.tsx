import 'normalize.css'

import { Button, Divider, Empty, Input, message, Modal, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

import Ptbk from '@saber2pr/ptbk'

import { getConfig, saveConfig } from './api'
import { Container } from './app.style'
import { CalcForm } from './components/calc-form'
import { useAsync } from './hooks'
import { usePromptModal } from './components/prompt-modal'

export const App = () => {
  const [AppConfig, setConfig] = useState<AppConfig>()
  const [pwd, setPwd] = useState<string>('')
  const [isPass, setIsPass] = useState(false)

  useEffect(() => {
    setPwd(localStorage.getItem('pwd') || '')
  }, [])

  useEffect(() => {
    if (isPass) {
      window.encode = (obj, input) => JSON.stringify(Ptbk.encode(obj, input))
      console.log(AppConfig)
      localStorage.setItem('pwd', pwd)
    }
  }, [isPass])

  const { loading } = useAsync(
    async () => {
      if (pwd) {
        try {
          const res = await getConfig()
          const appConfig = Ptbk.decode(res, pwd)
          setConfig(appConfig)
          setIsPass(true)
        } catch (error) {
          console.log(error)
          message.error('密码错误')
          localStorage.removeItem('pwd')
          setPwd('')
        }
      }
    },
    [pwd],
    {
      onError(error) {
        message.error(error?.message)
      },
    },
  )

  const { modal, setVisible } = usePromptModal({
    title: '输入密码',
    onOk(value) {
      saveConfig(AppConfig, value)
    },
  })

  return (
    <Container>
      {isPass ? (
        <>
          <Spin spinning={loading}>
            {AppConfig ? (
              <CalcForm config={AppConfig} onChange={setConfig} />
            ) : (
              <Empty />
            )}
          </Spin>
          <Divider />
          <Button
            type="primary"
            onClick={() => {
              setVisible(true)
            }}
          >
            保存
          </Button>
          {modal}
        </>
      ) : (
        <Modal centered visible title="输入密码" closable={false}>
          <Input onPressEnter={(e) => setPwd(e.target['value'])} />
        </Modal>
      )}
    </Container>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
