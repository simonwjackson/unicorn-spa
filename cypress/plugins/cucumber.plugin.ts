const cucumber = require('cypress-cucumber-preprocessor').default
const browserify = require('@cypress/browserify-preprocessor')
const resolve = require('resolve')

export const plugin: Cypress.PluginConfig = (on, config) => {
   const options = {
      ...browserify.defaultOptions,
      typescript: resolve.sync('typescript', { baseDir: config.projectRoot }),
   }

   on('file:preprocessor', cucumber(options))

   return config
}

export default plugin
