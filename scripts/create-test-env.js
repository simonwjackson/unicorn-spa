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

const testEnvFile = '.env.test.local'
touch(testEnvFile)
const testEnv = dotenv.config({ path: resolve(process.cwd(), testEnvFile) })

if (testEnv.error) {
   throw testEnv.error
}

fs.writeFileSync(
   testEnvFile,
   stringify(
      mergeRight(
         {
            PORT: '31349',
            NODE_ENV: 'development',
            HOST: 'localhost',
            DATABASE_URL: 'file:./test.db',
         },
         testEnv.parsed,
      ),
   ),
)
