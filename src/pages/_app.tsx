/* eslint-disable @typescript-eslint/ban-ts-comment */
import 'tailwindcss/tailwind.css'
import './Article.css'

import React, { useEffect } from 'react'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { AppProps } from 'next/app'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'
import { Provider } from 'next-auth/client'

const client = new ApolloClient({
   uri: '/api/graphql',
   cache: new InMemoryCache(),
})

type AuthType = (props: JustChildren) => React.ReactNode

export const Auth: AuthType = ({ children }) => {
   const [session, loading] = useSession()
   const hasUser = !!session?.user
   const router = useRouter()

   useEffect(() => {
      if (!loading && !hasUser) {
         router.push('/api/auth/signin')
      }
   }, [hasUser, loading])
   if (loading || !hasUser) return <div>Waiting for session...</div>
   return children
}

function App({ Component, pageProps }: AppProps): JSX.Element {
   return (
      <Provider session={pageProps.session}>
         <ApolloProvider client={client}>
            {/* @ts-ignore */}
            {Component?.auth !== false ? (
               <>
                  {/* @ts-ignore */}
                  <Auth>
                     <Component {...pageProps} />
                  </Auth>
               </>
            ) : (
               <Component {...pageProps} />
            )}
         </ApolloProvider>
      </Provider>
   )
}

export default App
