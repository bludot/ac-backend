export interface IACData {
  readonly power: number
  readonly temp: number
  readonly mode: number
  readonly fan: number
  readonly powerful: number
  readonly quiet: number
  readonly swingh: number
  readonly swingv: number
}

export interface IRoomConditions {
  readonly tempC: number
  readonly tempF: number
  readonly humidity: number
}
