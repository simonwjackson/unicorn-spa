/* eslint-disable @typescript-eslint/no-namespace */
// add new command to the existing Cypress interface
declare global {
   namespace Cypress {
      interface Chainable<Subject = any> {
         login(email: string): Chainable<any>
         setSelection: (from: number, to: number) => Chainable<Subject>
         onlyText: (text: string) => Chainable<Subject>
      }
   }
}

export type SetSelectionType = (subject: any, from: number, to: number) => void

export const setSelection: SetSelectionType = (subject, from, to) => {
   cy.wrap(subject)
      .trigger('mousedown')
      .then(($el) => {
         const el = $el[0]
         const textNode = el.childNodes[0]
         const range = document.createRange()
         const sel = document.getSelection()

         range.setStart(textNode, from) // Start at first character
         range.setEnd(textNode, to) // End at fifth character

         if (sel) {
            sel.removeAllRanges()
            sel.addRange(range)
         }
      })
      .trigger('mouseup')

   // TODO: Is this needed?
   cy.document().trigger('selectionchange')
}

export type OnlyText = (subject: any, text: string) => void

export const onlyText: OnlyText = (subject, text) => {
   cy.wrap(subject)
      .contains(text)
      .should((elem) => {
         expect(elem.text()).to.equal(text)
      })
}

Cypress.Commands.add(
   'setSelection',
   {
      prevSubject: true,
   },
   setSelection,
)

Cypress.Commands.add(
   'onlyText',
   {
      prevSubject: true,
   },
   onlyText,
)

Cypress.Commands.add('login', () => {
   const email = 'e2e@atomicnotes.app'

   // TODO: This login works, but feels fragile
   cy.getCookie('next-auth.session-token').then((c) => {
      if (c === null) {
         const log = Cypress.log({
            displayName: 'LOGIN',
            message: [`🔐 Authenticating | ${email}`],
            autoEnd: false,
         })

         log.snapshot('before')
         cy.visit('/api/auth/signin')
         cy.get('input[name=email]').type(email)
         cy.get('form').submit()

         log.snapshot('after')
         log.end()
      }
      Cypress.Cookies.preserveOnce('next-auth.session-token')
   })
})
