type ConsumeData = Record<string, Array<{ name: string; value: number }>>
type CalcConfig = Record<string, { count: number; data: ConsumeData[''] }>
type AppConfig = {
  pwd: string
  birthYear: number
  deposit: number
  data: CalcConfig
}

interface Window {
  encode(obj: any, input: string): string
}
