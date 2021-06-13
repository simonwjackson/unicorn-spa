import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { signOut, useSession } from 'next-auth/client'
// import { DocumentsQuery } from '../../generated/DocumentsQuery'

// const DOCUMENTS_QUERY = gql`
//    query DocumentsQuery {
//       documents {
//          id
//       }
//    }
// `

export const Home = (): JSX.Element => {
   // const { loading, error, data } = useQuery<DocumentsQuery>(DOCUMENTS_QUERY)
   const [session, loadingAuth] = useSession()

   if (/*loading || */ loadingAuth) return <p>Loading.. :(</p>
   // if (error) return <p>Error :(</p>

   return (
      <div>
         {session && (
            <>
               Signed in as {session?.user?.email} <br />
               <button onClick={() => signOut()}>Sign out</button>
               <button
                  type="button"
                  onClick={() => {
                     throw new Error('Sentry Frontend Error')
                  }}>
                  Throw error
               </button>
            </>
         )}
         Home
         {/* <ul>
            {data?.documents?.map((doc) => (
               <li key={doc.id}>{doc.id}</li>
            ))}
         </ul> */}
      </div>
   )
}
export default Home
