import { useState } from 'react'

function snapSelectionToWord() {
   const sel = window.getSelection()

   if (sel && sel.focusNode && sel.anchorNode && !sel.isCollapsed) {
      // Detect if selection is backwards
      const range = document.createRange()
      range.setStart(sel.anchorNode, sel.anchorOffset)
      range.setEnd(sel.focusNode, sel.focusOffset)
      const backwards = range.collapsed
      range.detach()

      // modify() works on the focus of the selection
      const endNode = sel.focusNode,
         endOffset = sel.focusOffset
      sel.collapse(sel.anchorNode, sel.anchorOffset)

      let direction = []
      if (backwards) {
         direction = ['backward', 'forward']
      } else {
         direction = ['forward', 'backward']
      }

      sel.modify('move', direction[0], 'character')
      sel.modify('move', direction[1], 'word')
      sel.extend(endNode, endOffset)
      sel.modify('extend', direction[1], 'character')
      sel.modify('extend', direction[0], 'word')
   }
}

const surroundSelection = () => {
   const span = document.createElement('span')

   span.className = 'marked'

   const sel = window.getSelection()

   if (sel && sel.rangeCount) {
      const range = sel.getRangeAt(0).cloneRange()
      range.surroundContents(span)
      sel.removeAllRanges()
      sel.addRange(range)
   }
}

function clearSelection() {
   const selection = window.getSelection()
   return selection && selection.removeAllRanges()
}

export const useSelectedText = (): [string, () => void] => {
   const [text, setText] = useState('')
   const select = () => {
      snapSelectionToWord()
      surroundSelection()
      const selected = window.getSelection() as Selection
      setText(selected.toString())
      clearSelection()
   }

   return [text, select]
}

export default useSelectedText
