import type { ECharts } from 'echarts'
import React, { DependencyList, useEffect, useRef, useState } from 'react'

const useEchartsLib = () => {
  const [lib, setLib] = useState<typeof import('echarts')>(null)
  useEffect(() => {
    import('echarts').then((echarts) => setLib(echarts))
  }, [])
  return lib
}

type UseEchartsResult = [React.MutableRefObject<HTMLDivElement>, boolean]

export function useEcharts(
  callback: (chart: ECharts) => any,
  deps?: DependencyList,
): UseEchartsResult
export function useEcharts(
  options: object,
  deps?: DependencyList,
): UseEchartsResult

export function useEcharts(
  options: ((chart: ECharts) => any | Promise<any>) | object,
  deps: DependencyList = [],
): UseEchartsResult {
  const ref = useRef<HTMLDivElement>()
  const [loading, setLoading] = useState(false)

  const echarts = useEchartsLib()

  useEffect(() => {
    if (options === null) {
      return
    }
    setLoading(true)
    let chart: ECharts = null
    if (echarts) {
      chart = echarts.init(ref.current)
      if (typeof options === 'function') {
        Promise.resolve(options(chart)).then(() => setLoading(false))
      } else {
        // @ts-ignore
        chart.setOption(options)
        setLoading(false)
      }
    }
    const handle = () => chart && chart.resize()
    window.addEventListener('resize', handle)
    return () => {
      if (chart) {
        chart.dispose()
        window.removeEventListener('resize', handle)
      }
    }
  }, [echarts, ...deps])

  return [ref, loading]
}
