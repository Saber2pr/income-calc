import { getArray } from './array'

export const calcConsumeStr = (item: CalcConfig['']) => {
  if (item) {
    let dataStr = ''
    if (item.data.length === 0) return '0'
    if (item.data.length === 1) {
      dataStr = `${item.data[0].value}`
    } else {
      dataStr = `(${getArray(item.data)
        .map((item) => Number(item.value))
        .join(' + ')})`
    }
    if (item.count === 1) return dataStr
    return `${item.count} * ${dataStr}`
  }
  return ''
}

export const parseConsumeData = (config: CalcConfig): ConsumeData => {
  const result: ConsumeData = {}
  for (const key in config) {
    result[key] = config[key].data
  }
  return result
}

export const parseMergeCalcConfig = (
  config: CalcConfig,
  data: ConsumeData,
): CalcConfig => {
  for (const key in data) {
    config[key].data = data[key]
  }
  return { ...config }
}

// getKeys(values).reduce(
//   (acc, key) => ({
//     ...acc,
//     [key]: getArray(values[key])
//       .filter((i) => !!i)
//       .reduce(
//         (acc, cur) => (cur.value ? acc + Number(cur.value) : acc),
//         0,
//       ),
//   }),
//   {},
// ),
