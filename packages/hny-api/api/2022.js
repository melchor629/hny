import app from './_2022/app.js'

export default async function handler(req, res) {
  await app.ready()
  app.server.emit('request', req, res)
}
