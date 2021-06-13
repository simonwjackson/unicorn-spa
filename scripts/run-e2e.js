#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require('path')
const { spawn } = require('child_process')
const dotenv = require('dotenv')

dotenv.config({ path: resolve(process.cwd(), '.env.test.local') })

const { PORT } = process.env

const web = spawn('start-test', ['dev:test:run:app', PORT, 'test:run'])

web.stdout.on('data', (data) => {
   console.log(`${data}`)
})

web.stderr.on('data', (data) => {
   console.log(`${data}`)
})

web.on('error', (error) => {
   console.log(`error: ${error.message}`)
})

web.on('close', (code) => {
   console.log(`child process exited with code ${code}`)
})
