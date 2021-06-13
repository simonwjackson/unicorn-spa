import { ApolloServer } from 'apollo-server-micro'
import { withSentry } from '@sentry/nextjs'
import schema from '../../../schema'
import { createContext } from '../../../schema/context'

const server = new ApolloServer({
   schema,
   context: createContext,
   tracing: true,
})

export const config = {
   api: {
      bodyParser: false,
   },
}

const graphql = server.createHandler({
   path: '/api/graphql',
})

export default withSentry(graphql)
