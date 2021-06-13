import process from 'process'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import { curry } from 'ramda'

const prisma = new PrismaClient()
const getNodeEnv = (process: any) => process?.env?.NODE_ENV
const env = getNodeEnv(process)
const getSession = (env: string) => (env === 'production' ? {} : { jwt: true })

const getProviders = curry((env, process) => {
   switch (env) {
      case 'production':
         return [
            Providers.Google({
               clientId: process?.env?.GOOGLE_CLIENT_ID,
               clientSecret: process?.env?.GOOGLE_CLIENT_SECRET,
            }),
         ]
      case 'development':
      default:
         return [
            Providers.Credentials({
               // The name to display on the sign in form (e.g. 'Sign in with...')
               name: 'email',
               // The credentials is used to generate a suitable form on the sign in page.
               // You can specify whatever fields you are expecting to be submitted.
               // e.g. domain, username, password, 2FA token, etc.
               credentials: {
                  email: { label: 'Email', type: 'text' },
               },
               async authorize(credentials, req) {
                  // TODO: Get this from a seeded test DB
                  const user = { id: 1, name: 'Simon W. Jackson', email: 'e2e@atomicnotes.app' }

                  // If no error and we have user data, return it
                  if (user) {
                     return user
                  }
                  // Return null if user data could not be retrieved
                  return null
               },
            }),
         ]
   }
})

export const auth = NextAuth({
   providers: getProviders(env, process),
   session: getSession(env),
   adapter: PrismaAdapter(prisma),
   callbacks: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async signIn(user, account, profile) {
         // TODO: Allow other users to login
         if (['e2e@atomicnotes.app', 'simon.jackson@gmail.com'].includes(user?.email || '')) {
            return true
         }
         return false
         // Or you can return a URL to redirect to:
         // return '/unauthorized'
      },
   },
})

export default auth
