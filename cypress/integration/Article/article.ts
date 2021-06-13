import { Given } from 'cypress-cucumber-preprocessor/steps'

const url = '/article/abc123'

before(() => {
   cy.task('db:teardown')
   cy.task('db:seed')
})

Given('I open an article', () => {
   cy.visit(url)
})
