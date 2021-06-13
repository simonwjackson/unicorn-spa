import React, { FC } from 'react'
import { mount } from '@cypress/react'
import { useSelectedText } from 'hooks/useSelectedText'

const Demo: FC = () => {
   const [text, select] = useSelectedText()

   return (
      <>
         <div className="App" onMouseUpCapture={select}>
            <p>
               Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae obcaecati alias
               delectus dicta nisi, tempore neque. Cum repellendus accusamus, nostrum nulla ex ab in
               possimus sapiente eius vitae fugit numquam?
            </p>
            <p>
               Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae obcaecati alias
               delectus dicta nisi, tempore neque. Cum repellendus accusamus, nostrum nulla ex ab in
               possimus sapiente eius vitae fugit numquam?
            </p>
         </div>
         <div>
            hook: <span id="results">{text}</span>
         </div>
      </>
   )
}

describe('useSelectedText', () => {
   beforeEach(() => mount(<Demo />))

   it('can capture selected text', () => {
      cy.get('.App > :nth-child(2)').setSelection(0, 12)
      cy.get('#results').onlyText('Lorem, ipsum')
   })

   it('can snap to word boundaries when selecting text', () => {
      cy.get('.App > :nth-child(2)').setSelection(15, 29)
      cy.get('#results').onlyText('dolor sit amet consectetur')
   })
})
