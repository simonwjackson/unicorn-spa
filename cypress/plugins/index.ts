// ***********************************************************
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

import coverage from '@cypress/code-coverage/task'
import terminalLogs from 'cypress-terminal-report/src/installLogsPrinter'

import env from './env.plugin'
import db from './db.plugin'
import next from './next.plugin'
import storybook from './storybook.plugin'
import cucumber from './cucumber.plugin'

export const plugin: Cypress.PluginConfig = (on, config) => {
   env(on, config)
   db(on, config)
   terminalLogs(on)
   cucumber(on, config)
   coverage(on, config)
   next(on, config)
   storybook(on, config)

   return config
}

export default plugin
