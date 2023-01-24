import { useEcharts } from '@/hooks/useEcharts'
import { Spin } from 'antd'
import React from 'react'
import { Chart, Contain } from './index.style'
import * as number from '@saber2pr/utils/lib/number'
import { getKeys } from '@/utils'

export interface ConsMonthChartProps {
  data: CalcConfig
  monthOutSumCal: number
}

export const ConsMonthChart: React.FC<ConsMonthChartProps> = ({
  data,
  monthOutSumCal,
}) => {
  const [ref, loading] = useEcharts(
    (chart) => {
      const curMonth = new Date().getMonth()
      const xAxis = []
      const values = []
      const keys = getKeys(data)
      const incKey = keys[0]
      for (const name in data) {
        if (name === incKey) continue
        const item = data[name]
        const count = item.count
        item.data.forEach((sitem) => {
          if (sitem.disabled) return
          xAxis.push(sitem.name)
          values.push(+sitem.value * count)
        })
      }

      const option = {
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: xAxis,
        },
        yAxis: {
          name: `${curMonth + 1}月支出（合计：${monthOutSumCal}）`,
          type: 'value',
          nameTextStyle: {
            padding: [0, -50, 0, 0],
          },
          axisLabel: {
            formatter: (value) => number.parseUnit(value),
          },
        },
        series: [
          {
            data: values,
            type: 'line',
          },
        ],
      }
      chart.setOption(option)
    },
    [data],
  )

  return (
    <Contain>
      <Spin spinning={loading}>
        <Chart ref={ref} />
      </Spin>
    </Contain>
  )
}
