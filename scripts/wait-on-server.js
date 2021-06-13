#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require('path')
const dotenv = require('dotenv')
const waitOn = require('wait-on')

dotenv.config({ path: resolve(process.cwd(), '.env.test.local') })

const { PORT } = process.env

const opts = {
   resources: [`tcp:localhost:${PORT}`],
}

const main = async () => {
   try {
      await waitOn(opts)
      process.exit()
   } catch (err) {
      console.error(err)
   }
}

main()
