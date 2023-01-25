import { useEcharts } from '@/hooks/useEcharts'
import { Spin } from 'antd'
import React from 'react'
import { Chart, Contain } from './index.style'
import * as number from '@saber2pr/utils/lib/number'

export interface IncAgeChartProps {
  yearInSum: number
  config: AppConfig
}

export const IncAgeChart: React.FC<IncAgeChartProps> = ({
  yearInSum,
  config,
}) => {
  const [ref, loading] = useEcharts(
    (chart) => {
      const curYear = new Date().getFullYear()
      const years = []
      const values = []
      for (let i = 0; i < 10; i++) {
        years.push(`${curYear - config.birthYear + i}岁`)
        values.push(`${config.deposit + yearInSum * i}`)
      }

      const option = {
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: years,
        },
        yAxis: {
          name: `存款`,
          nameTextStyle: {
            padding: [0, 40, 0, 0],
          },
          type: 'value',
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
    [yearInSum],
  )

  return (
    <Contain>
      <Spin spinning={loading}>
        <Chart ref={ref} />
      </Spin>
    </Contain>
  )
}
