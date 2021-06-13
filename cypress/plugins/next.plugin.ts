const next = require('@cypress/react/plugins/next')

export const plugin: Cypress.PluginConfig = (on, config) => {
   if (config.testingType === 'component') {
      next(on, config)
   }

   return config
}

export default plugin
