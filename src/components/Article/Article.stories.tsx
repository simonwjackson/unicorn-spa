import React from 'react'
import { Meta, Story } from '@storybook/react'
import { Article, ArticleType } from './Article'
import article from '../../../cypress/fixtures/article.json'

export default {
   component: Article,
   title: 'Article',
} as Meta

const Template: Story<ArticleType> = (args) => <Article {...args} />

export const Default = Template.bind({})

Default.args = {
   initialHtml: '<p>hello</p>',
}

export const LargeArticle = Template.bind({})

LargeArticle.args = {
   initialHtml: article.html,
}
