import createFastifyApp from './_2022/app.js'

export default async function handler(req, res) {
  const app = await createFastifyApp()
  await app.ready()
  app.server.emit('request', req, res)
}
