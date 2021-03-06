const path = require('path')

module.exports = {
   stories: [
      '../src/components/**/*.stories.mdx',
      '../src/components/**/*.stories.@(js|jsx|ts|tsx)',
   ],
   addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
   typescript: {
      check: false,
      checkOptions: {},
      reactDocgen: 'react-docgen-typescript',
      reactDocgenTypescriptOptions: {
         shouldExtractLiteralValuesFromEnum: true,
         propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
      },
   },
   webpackFinal: async (config) => {
      config.module.rules.push({
         test: /\,css&/,
         use: [
            {
               loader: 'postcss-loader',
               options: {
                  ident: 'postcss',
                  plugins: [require('tailwindcss'), require('autoprefixer')],
               },
            },
         ],
         include: path.resolve(__dirname, '../'),
      })
      return config
   },
}
