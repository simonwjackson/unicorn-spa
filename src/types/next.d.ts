/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetServerSidePropsContext, Redirect } from 'next'
import { ParsedUrlQuery } from 'querystring'

export type GetServerSidePropsResult<P> = {
   props?: P
   unstable_redirect?: Redirect
}

export type GetServerSideProps<
   P extends { [key: string]: any } = { [key: string]: any },
   Q extends ParsedUrlQuery = ParsedUrlQuery,
> = (context: GetServerSidePropsContext<Q>) => Promise<GetServerSidePropsResult<P>>
