export default class ApiError extends Error {
  status: number
  headers: Readonly<Record<string, string>>
  body: any

  constructor(message: string, status: number, headers: Record<string, string>, body: any) {
    super(message)
    this.status = status
    this.headers = Object.freeze(headers)
    this.body = body
  }
}
