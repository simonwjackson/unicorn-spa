import { resolve } from 'path'
import dotenv from 'dotenv'

export const plugin: Cypress.PluginConfig = (on, config) => {
   dotenv.config({ path: resolve(process.cwd(), '.env.test.local') })
   config.baseUrl = process.env.CYPRESS_BASE_URL || `http://${process.env.HOST}:${process.env.PORT}`

   return config
}

export default plugin
