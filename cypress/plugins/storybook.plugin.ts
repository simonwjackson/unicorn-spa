import { setGlobalConfig } from '@storybook/testing-react'
import * as sbPreview from '../../.storybook/preview'

export const plugin: Cypress.PluginConfig = (on, config) => {
   if (config.testingType === 'component') {
      // @ts-ignore
      setGlobalConfig(sbPreview)
   }

   return config
}

export default plugin
