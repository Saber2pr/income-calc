import Ptbk from '@saber2pr/ptbk'

export const saveConfig = (config: AppConfig, input: string) => {
  const str = JSON.stringify(config, null, 2)
  const encodeData = Ptbk.encode(config, input)
  console.log(str, encodeData)
  window.open(
    `https://github.com/Saber2pr/income-calc/new/master/public?filename=/public/config-${Date.now()}&value=${encodeURIComponent(
      JSON.stringify(encodeData),
    )}`,
    '_blank',
  )
  return
}
