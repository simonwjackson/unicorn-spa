/* eslint-disable @typescript-eslint/no-var-requires */
const next = require('next')
const { createServer } = require('http')
const { parse } = require('url')
const conf = require('./next.config')

const getNodeEnv = (process) => process?.env?.NODE_ENV

const buildNextAuthUrl = (process) => {
   if (process?.env?.NEXTAUTH_URL) {
      return process?.env.NEXTAUTH_URL
   }

   switch (getNodeEnv(process)) {
      case 'production':
         // TODO: This should be https
         // TODO: Refactor PORT retrieval
         return `http://${process.env.HOST}:${process.env.DOKKU_PROXY_PORT || process.env.PORT}`
      case 'development':
      default:
         return `http://${process.env.HOST}:${process.env.PORT}`
   }
}

// TODO: Is this the best place to mutate process.env?
process.env.NEXTAUTH_URL = buildNextAuthUrl(process)

const main = ({ isProduction, port = 31348, cb = () => {} }) => {
   const dev = !isProduction
   const app = next({
      dev,
      dir: __dirname + '/',
      conf,
   })

   const handle = app.getRequestHandler()

   app.prepare().then(() => {
      createServer((req, res) => {
         // Be sure to pass `true` as the second argument to `url.parse`.
         // This tells it to parse the query portion of the URL.
         const parsedUrl = parse(req.url, true)
         const { pathname, query } = parsedUrl

         if (pathname === '/a') {
            app.render(req, res, '/a', query)
         } else if (pathname === '/b') {
            app.render(req, res, '/b', query)
         } else {
            handle(req, res, parsedUrl)
         }
      }).listen(port, '0.0.0.0', (err) => {
         if (err) throw err
         console.log(`> Ready on port: ${port}`)
         if (typeof cb === 'function') cb()
      })
   })
}

module.exports = main

if (require.main === module) {
   const dev = getNodeEnv(process) === 'development'
   const options = { isProduction: false, port: process.env.PORT || 31348 }
   dev ? module.exports(options) : module.exports({ ...options, isProduction: true })
}
