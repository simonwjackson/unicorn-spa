import { PrismaClient } from '@prisma/client'

export default async (req, res) => {
   const prisma = new PrismaClient()
   // ?query={"include":{"platforms":{"select":{"name":true,%20"files":true}}}}
   const { query } = req.query

   const whereGame = {
      name: 'Zelda Wind Waker',
      released: '2004',
   }
   const wherePlatform = {
      name: 'GameCube',
      released: '2001',
   }
   const whereFile = {
      path: '/d/e/f/g.rom',
   }

   const dataPlatform = {
      ...wherePlatform,
   }
   const dataFile = {
      ...whereFile,
   }

   const dataGame = {
      ...whereGame,
      note: 'hello goodbye',
      platform: {
         connectOrCreate: {
            where: {
               Platform_name_released_unique_constraint: wherePlatform,
            },
            create: dataPlatform,
         },
      },
   }

   const platformConnectOrCreate = {
      connectOrCreate: {
         where: {
            Platform_name_released_unique_constraint: {
               name: 'Xbox',
               released: '1888',
            },
         },
         create: {
            name: 'Xbox',
            released: '1888',
         },
      },
   }

   const gamesConnectOrCreate = {
      connectOrCreate: {
         where: {
            Game_name_released_unique_constraint: {
               name: 'Zelda Wind Waker',
               released: '2003',
            },
         },
         create: {
            name: 'Zelda Wind Waker',
            released: '2003',
            platforms: platformConnectOrCreate,
         },
      },
   }

   try {
      await prisma.file.upsert({
         where: {
            ...whereFile,
         },
         update: dataFile,
         create: {
            ...dataFile,
            platforms: platformConnectOrCreate,
            games: gamesConnectOrCreate,
         },
      })
   } catch (e) {
      console.error(e)
   }
   const games = await prisma.game.findMany(JSON.parse(query))

   return res.status(200).json(games)
}
