import { makeSchema, objectType, queryType } from '@nexus/schema'
import path from 'path'

export const Game = objectType({
   name: 'Game',
   definition(t) {
      t.id('id')
      t.string('name')
      t.string('released')
      t.string('note')
   },
})

export const Query = queryType({
   definition(t) {
      t.list.field('games', {
         type: 'Game',
         // @ts-ignore
         resolve: () => {
            return [
               {
                  id: '1',
                  name: 'React',
                  note: 'hi',
               },
               {
                  id: '2',
                  name: 'Vue',
               },
               {
                  id: '3',
                  name: 'Angular',
               },
               {
                  id: '4',
                  name: 'Svelte',
               },
            ]
         },
      })
   },
})

export const schema = makeSchema({
   nonNullDefaults: {
      input: true,
      output: true,
   },
   types: { Query, Game },
   outputs: {
      typegen: path.join(process.cwd(), 'nexus-typegen.ts'),
      schema: path.join(process.cwd(), 'generated/schema.graphql'),
   },
   typegenAutoConfig: {
      contextType: 'Context.Context',
      sources: [
         {
            source: '@prisma/client',
            alias: 'prisma',
         },
         {
            source: require.resolve('../schema/context'),
            alias: 'Context',
         },
      ],
   },
})

export default schema
