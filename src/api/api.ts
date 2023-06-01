import { message } from 'antd';
import { getEnv } from './../utils/getEnv';
import Ptbk from '@saber2pr/ptbk'
import axios from 'axios';

const isDev = getEnv() === 'development'

export const saveConfig = (config: AppConfig, input: string) => {
  const str = JSON.stringify(config, null, 2)
  if(config.pwd !== input) {
    message.error('密码错误')
    return
  }
  const encodeData = Ptbk.encode(config, input)
  console.log(str, encodeData)
  window.open(
    `https://github.com/Saber2pr/income-calc/new/master?filename=public/config-${Date.now()}&value=${encodeURIComponent(
      JSON.stringify(encodeData),
    )}`,
    '_blank',
  )
  return
}

export const getConfig = async () => {
  const res = await axios.get<AppConfig>(isDev ? './public/config': 'https://saber2pr.top/income-calc/public/config')
  return res.data
}