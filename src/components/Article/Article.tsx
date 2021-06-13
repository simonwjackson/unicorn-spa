import { curry } from 'ramda'
import React, { FC, LegacyRef, useState, useRef, useEffect } from 'react'
import { useSelectedText } from '../../hooks/useSelectedText'

export type ArticleType = {
   containerRef?: LegacyRef<HTMLElement>
   initialHtml: string
   onSelect?: (text: string) => void
}

export const Article: FC<ArticleType> = (props) => {
   const [text, select] = useSelectedText()

   useEffect(() => {
      if (text && text.trim().length > 0 && props.onSelect) {
         props.onSelect(text)
      }
   }, [text])

   return (
      <article
         id="main-article"
         ref={props.containerRef}
         onMouseUpCapture={() => {
            select()
         }}
         dangerouslySetInnerHTML={{
            __html: props.initialHtml,
         }}
      />
   )
}

export default Article

export type useGetArticleType = (id: string) => string

export const useGetArticle: useGetArticleType = (id) => {
   const [html, setHtml] = useState('')

   useEffect(() => {
      const fetchData = async () => {
         return await fetch(
            '/api/article?' +
               new URLSearchParams({
                  id,
               }),
         )
            .then((response) => response.json())
            .catch((err) => console.log(err))
      }

      fetchData().then((data) => setHtml(data.html))
   }, [id])

   return html
}

export type ArticleResponse = {
   id: string
   html: string
}

export type PostArticleChangeType = (id: string, html: string) => Promise<ResponseType>

export const postArticleChange: PostArticleChangeType = curry((id, html) => {
   return fetch('/api/article', {
      method: 'POST',
      body: JSON.stringify({
         id,
         html,
      }),
      headers: {
         'Content-type': 'application/json; charset=UTF-8',
      },
   })
      .then((response) => response.json())
      .catch((err) => console.log(err))
})

export type ArticleContainerType = {
   id: string
}

export const ArticleContainer: FC<ArticleContainerType> = (props) => {
   const html = useGetArticle(props.id)
   const containerRef = useRef<HTMLInputElement>(null)

   return (
      <Article
         onSelect={() => {
            containerRef?.current?.innerHTML &&
               postArticleChange(props.id, containerRef.current.innerHTML).then(console.log)
         }}
         containerRef={containerRef}
         initialHtml={html}
      />
   )
}
