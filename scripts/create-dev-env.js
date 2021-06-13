/* eslint-disable @typescript-eslint/no-var-requires */
const dotenv = require('dotenv')
const { resolve } = require('path')
const { mergeRight } = require('ramda')
const fs = require('fs')
const stringify = require('dotenv-stringify')

// sync
const { closeSync, openSync, utimesSync } = require('fs')

const touch = (path) => {
   const time = new Date()
   try {
      utimesSync(path, time, time)
   } catch (err) {
      closeSync(openSync(path, 'w'))
   }
}

const devEnvFile = '.env.local'
touch(devEnvFile)
const devEnv = dotenv.config({ path: resolve(process.cwd(), devEnvFile) })

if (devEnv.error) {
   throw devEnv.error
}

fs.writeFileSync(
   devEnvFile,
   stringify(
      mergeRight(
         {
            PORT: '31348',
            NODE_ENV: 'development',
            HOST: 'localhost',
            DATABASE_URL: 'file:./dev.db',
         },
         devEnv.parsed,
      ),
   ),
)
