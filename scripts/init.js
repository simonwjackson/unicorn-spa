/* eslint-disable @typescript-eslint/no-var-requires */
const concurrently = require('concurrently')

// TODO: move env creation to dev:pre:env
// Split into 2 files {dev|test}-env-create
// Without this, remote (desktop) tests will not run correct
const main = async () => {
   try {
      await concurrently(['npm:init:*'], {
         restartTries: 1,
      })
   } catch (e) {
      console.log(e)
   }
}
main().catch(console.error)
