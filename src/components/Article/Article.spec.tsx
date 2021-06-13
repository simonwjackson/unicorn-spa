import * as React from 'react'
import { composeStories } from '@storybook/testing-react'
import { mount } from '@cypress/react'

import article from '../../../cypress/fixtures/article.json'
import * as stories from './Article.stories'

const { Default, LargeArticle } = composeStories(stories)

describe('<Article />', () => {
   // beforeEach(() => {})

   it('renders html string', () => {
      mount(<Default />)
      cy.contains(`hello`)
   })

   it('renders large html string', () => {
      mount(<LargeArticle initialHtml={article.html} />)
      cy.contains(`nomad`)
   })
})

// describe('<ArticleContainer />', () => {
//    beforeEach(() => {
//       cy.intercept('GET', '/api/article?id=13', { fixture: 'article.json' })
//    })

//    it('renders html string', () => {
//       mount(<ArticleContainer id="13" />)
//       cy.contains(`boo`)
//    })
// })
