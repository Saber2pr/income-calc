import { Affix, Divider, Input, Typography } from 'antd'
import React, { useMemo, useRef } from 'react'

import { getKeys, isMobAgent } from '@/utils'
import {
  calcConsumeStr,
  parseConsumeData,
  parseMergeCalcConfig,
} from '@/utils/calcConsume'
import { number } from '@saber2pr/utils'

import { Consume } from '../consume'
import { Line, LineContent, LineLabel } from '../consume/index.style'
import { IncYearChart } from '../inc-year-chart'
import { Aside, Background, Contain, Content } from './index.style'
import { ConsMonthChart } from '../cons-month-chart'

const { Paragraph, Text } = Typography

export interface CalcFormProps {
  config: AppConfig
  onChange: (config: AppConfig) => void
}

// 消费
export const CalcForm: React.FC<CalcFormProps> = ({
  config: AppConfig,
  onChange,
}) => {
  const config = AppConfig.data
  // const { modal, setVisible } = usePromptModal({
  //   title: '输入名称',
  //   onOk(value) {
  //     setConfig({ ...config, [value]: [] })
  //   },
  // })

  const isMob = useMemo(() => isMobAgent(window.navigator.userAgent), [])

  const calcStrIn = useMemo(() => {
    const keys = getKeys(config)
    const incomeStr = calcConsumeStr(config[keys[0]])
    return incomeStr
  }, [config])

  const calcStrOut = useMemo(() => {
    const keys = getKeys(config)
    let consumeStr = keys
      .slice(1)
      .map((key) => calcConsumeStr(config[key]))
      .join(' + ')
    if (/\+/.test(consumeStr)) {
      consumeStr = `(${consumeStr})`
    }
    return consumeStr
  }, [config])

  const calcValue = useMemo(
    () => eval(`${calcStrIn} - ${calcStrOut}`),
    [calcStrIn, calcStrOut],
  )

  const calcBirthStr = useMemo(
    () =>
      `${AppConfig.deposit} + (30 - ${
        new Date().getFullYear() - AppConfig.birthYear
      }) * ${calcValue * 12}`,
    [AppConfig, calcValue],
  )

  const monthOutSumCal = useMemo(() => eval(calcStrOut), [calcStrOut])

  return (
    <Contain isMob={isMob}>
      <Content isMob={isMob}>
        <Affix>
          <Background>
            <Paragraph>
              月净收入计算公式：{calcStrIn} - {calcStrOut} = {calcValue}￥/月
            </Paragraph>
            <Paragraph>
              年净收入计算公式：{`${calcValue} * 12`} = {calcValue * 12}￥/年
              <Text type="secondary">
                （{number.parseUnit(calcValue * 12)}￥/年）
              </Text>
            </Paragraph>
            <Paragraph>
              月消费计算公式：{calcStrOut} = {eval(calcStrOut)}￥/月
            </Paragraph>
            <Paragraph>
              到30岁积累计算公式：{calcBirthStr} = {eval(calcBirthStr)}￥
              <Text type="secondary">
                （{number.parseUnit(eval(calcBirthStr))}￥）
              </Text>
            </Paragraph>
            <Divider />
          </Background>
        </Affix>
        <Line margin="0 0 24px 0">
          <LineLabel>存款：</LineLabel>
          <LineContent>
            <Input
              value={AppConfig.deposit}
              onChange={(event) =>
                onChange({
                  ...AppConfig,
                  deposit: Number(event.target.value),
                })
              }
              placeholder="输入存款"
              type="number"
              addonAfter="￥"
            />
          </LineContent>
        </Line>
        <Consume
          data={parseConsumeData(config)}
          onChange={(values: ConsumeData) => {
            onChange({
              ...AppConfig,
              data: parseMergeCalcConfig(config, values),
            })
          }}
        />
        {/* <Button
        type="dashed"
        onClick={() => setVisible(true)}
        block
        icon={<PlusOutlined />}
      >
        添加
      </Button>
      {modal} */}
      </Content>
      {isMob ? (
        <>
          <IncYearChart
            curVal={AppConfig.deposit}
            monthInc={calcValue}
            yearInSum={calcValue * 12}
          />
          <ConsMonthChart
            data={AppConfig.data}
            monthOutSumCal={monthOutSumCal}
          />
        </>
      ) : (
        <Aside>
          <Affix offsetTop={0}>
            <div>
              <IncYearChart
                curVal={AppConfig.deposit}
                monthInc={calcValue}
                yearInSum={calcValue * 12}
              />
              <ConsMonthChart
                data={AppConfig.data}
                monthOutSumCal={monthOutSumCal}
              />
            </div>
          </Affix>
        </Aside>
      )}
    </Contain>
  )
}
