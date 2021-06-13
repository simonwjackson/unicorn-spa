import seed from '../db/seed'
import teardown from '../db/teardown'

export const plugin: Cypress.PluginConfig = (on, config) => {
   on('task', {
      'db:seed': () => {
         return seed()
      },
      'db:teardown': () => {
         return teardown()
      },
   })

   return config
}

export default plugin
