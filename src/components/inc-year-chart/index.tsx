import { useEcharts } from '@/hooks/useEcharts'
import { Spin } from 'antd'
import React from 'react'
import { Chart, Contain } from './index.style'
import * as number from '@saber2pr/utils/lib/number'

export interface IncYearChartProps {
  curVal: number
  monthInc: number
  yearInSum: number
}

export const IncYearChart: React.FC<IncYearChartProps> = ({
  curVal,
  monthInc,
  yearInSum,
}) => {
  const [ref, loading] = useEcharts(
    (chart) => {
      const curYear = new Date().getFullYear()
      const curMonth = new Date().getMonth()
      const months = []
      const values = []
      for (let i = curMonth; i < 12; i++) {
        months.push(`${i + 1}月`)
        values.push(curVal + i * monthInc)
      }

      const option = {
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: months,
        },
        yAxis: {
          name: `${curYear}年度存款（合计：${yearInSum}）`,
          nameTextStyle: {
            padding: [0, -108, 0, 0],
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
    [monthInc, curVal],
  )

  return (
    <Contain>
      <Spin spinning={loading}>
        <Chart ref={ref} />
      </Spin>
    </Contain>
  )
}
